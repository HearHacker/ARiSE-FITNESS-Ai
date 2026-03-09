import mongoose from 'mongoose';

const progressSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    date: { type: Date, required: true },
    workoutId: { type: mongoose.Schema.Types.ObjectId, ref: 'Workout' },
    xpEarned: { type: Number, default: 0 },
    completed: { type: Boolean, default: false }
  },
  { timestamps: true }
);

export default mongoose.model('Progress', progressSchema);
