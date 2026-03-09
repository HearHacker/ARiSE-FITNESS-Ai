import User from '../models/User.js';

export const getMe = async (req, res) => {
  const user = await User.findById(req.user._id).select('-password');
  return res.json(user);
};

export const updateProfile = async (req, res) => {
  const { name, fitnessGoal, fitnessLevel } = req.body;
  const user = await User.findByIdAndUpdate(
    req.user._id,
    { name, fitnessGoal, fitnessLevel },
    { new: true, runValidators: true }
  ).select('-password');

  return res.json(user);
};
