import express from 'express';
import { completeWorkout, getTodayWorkout, getWorkoutHistory } from '../controllers/workoutController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/today', protect, getTodayWorkout);
router.post('/:workoutId/complete', protect, completeWorkout);
router.get('/history', protect, getWorkoutHistory);

export default router;
