import Workout from '../models/Workout.js';

export const addWorkout = async (req, res) => {
  const workout = await Workout.create(req.body);
  return res.status(201).json(workout);
};

export const updateWorkout = async (req, res) => {
  const workout = await Workout.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!workout) return res.status(404).json({ message: 'Workout not found' });
  return res.json(workout);
};

export const deleteWorkout = async (req, res) => {
  const workout = await Workout.findByIdAndDelete(req.params.id);
  if (!workout) return res.status(404).json({ message: 'Workout not found' });
  return res.json({ message: 'Workout deleted' });
};
