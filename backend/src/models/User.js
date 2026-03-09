import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    password: { type: String },
    googleId: { type: String },
    fitnessGoal: { type: String, enum: ['fat_loss', 'muscle_gain', 'endurance'], required: true },
    fitnessLevel: { type: String, enum: ['beginner', 'intermediate', 'advanced'], required: true },
    level: { type: Number, default: 1 },
    xp: { type: Number, default: 0 },
    streak: { type: Number, default: 0 },
    lastWorkoutDate: { type: Date }
  },
  { timestamps: true }
);

export default mongoose.model('User', userSchema);
