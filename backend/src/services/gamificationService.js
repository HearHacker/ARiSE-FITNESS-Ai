import Achievement from '../models/Achievement.js';

const LEVEL_XP = 500;

export const calculateLevel = (xp) => Math.floor(xp / LEVEL_XP) + 1;

export const updateStreak = (user, workoutDate = new Date()) => {
  if (!user.lastWorkoutDate) {
    user.streak = 1;
  } else {
    const dayDiff = Math.floor((workoutDate - user.lastWorkoutDate) / (1000 * 60 * 60 * 24));
    if (dayDiff === 1) user.streak += 1;
    else if (dayDiff > 1) user.streak = 1;
  }
  user.lastWorkoutDate = workoutDate;
};

export const evaluateAchievements = async (user) => {
  const candidates = [];
  if (user.level >= 5) {
    candidates.push({ code: 'LVL_5', title: 'Rising Warrior', description: 'Reach level 5.' });
  }
  if (user.streak >= 7) {
    candidates.push({ code: 'STREAK_7', title: 'Unbroken', description: 'Hit a 7 day streak.' });
  }

  for (const candidate of candidates) {
    const exists = await Achievement.findOne({ user: user._id, code: candidate.code });
    if (!exists) {
      await Achievement.create({ user: user._id, ...candidate });
    }
  }
};
