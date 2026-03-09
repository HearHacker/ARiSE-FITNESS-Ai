import mongoose from 'mongoose';

const exerciseSchema = new mongoose.Schema({
  name: { type: String, required: true },
  sets: { type: Number, required: true },
  reps: { type: Number, required: true },
  durationSeconds: { type: Number, default: 60 },
  videoUrl: { type: String }
});

const workoutSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    level: { type: String, enum: ['beginner', 'intermediate', 'advanced'], required: true },
    goal: { type: String, enum: ['fat_loss', 'muscle_gain', 'endurance'], required: true },
    exercises: [exerciseSchema],
    completed: { type: Boolean, default: false },
    scheduledFor: { type: Date, default: Date.now }
  },
  { timestamps: true }
);

export default mongoose.model('Workout', workoutSchema);
