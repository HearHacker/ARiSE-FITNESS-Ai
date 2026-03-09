import OpenAI from 'openai';
import env from '../config/env.js';

const fallbackByGoal = {
  fat_loss: ['Jump Squats', 'Burpees', 'Mountain Climbers', 'Plank'],
  muscle_gain: ['Bench Press', 'Deadlift', 'Squat', 'Overhead Press'],
  endurance: ['Jog in Place', 'Cycling Intervals', 'Lunges', 'Push-ups']
};

export const generateWorkoutPlan = async ({ fitnessGoal, fitnessLevel }) => {
  if (!env.openAiApiKey) {
    return fallbackByGoal[fitnessGoal].map((name) => ({ name, sets: 3, reps: fitnessLevel === 'advanced' ? 15 : 10 }));
  }

  const client = new OpenAI({ apiKey: env.openAiApiKey });
  const response = await client.chat.completions.create({
    model: 'gpt-4o-mini',
    messages: [
      {
        role: 'user',
        content: `Generate a JSON array of 4 exercises with keys name, sets, reps for a ${fitnessLevel} athlete focused on ${fitnessGoal}.`
      }
    ],
    response_format: { type: 'json_object' }
  });

  const parsed = JSON.parse(response.choices[0].message.content);
  return parsed.exercises || [];
};
