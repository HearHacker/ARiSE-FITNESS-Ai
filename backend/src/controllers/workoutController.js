import Workout from '../models/Workout.js';
import Progress from '../models/Progress.js';
import User from '../models/User.js';
import { calculateLevel, evaluateAchievements, updateStreak } from '../services/gamificationService.js';
import { generateWorkoutPlan } from '../services/aiWorkoutService.js';

export const getTodayWorkout = async (req, res) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  let workout = await Workout.findOne({ user: req.user._id, scheduledFor: { $gte: today } });
  if (!workout) {
    const exercises = await generateWorkoutPlan(req.user);
    workout = await Workout.create({
      title: 'Daily Quest Workout',
      user: req.user._id,
      level: req.user.fitnessLevel,
      goal: req.user.fitnessGoal,
      exercises,
      scheduledFor: new Date()
    });
  }

  return res.json(workout);
};

export const completeWorkout = async (req, res) => {
  const { workoutId } = req.params;
  const workout = await Workout.findOne({ _id: workoutId, user: req.user._id });
  if (!workout) return res.status(404).json({ message: 'Workout not found' });

  if (!workout.completed) {
    workout.completed = true;
    await workout.save();

    const user = await User.findById(req.user._id);
    user.xp += 100;
    user.level = calculateLevel(user.xp);
    updateStreak(user);
    await user.save();

    await Progress.create({ user: user._id, date: new Date(), workoutId, xpEarned: 100, completed: true });
    await evaluateAchievements(user);
  }

  return res.json({ message: 'Workout completed', xpEarned: 100 });
};

export const getWorkoutHistory = async (req, res) => {
  const history = await Progress.find({ user: req.user._id }).sort({ date: -1 }).limit(14);
  return res.json(history);
};
