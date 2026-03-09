import express from 'express';
import multer from 'multer';
import { addWorkout, deleteWorkout, updateWorkout } from '../controllers/adminController.js';
import { adminOnly, protect } from '../middleware/authMiddleware.js';

const router = express.Router();
const upload = multer({ dest: 'uploads/' });

router.post('/workouts', protect, adminOnly, addWorkout);
router.put('/workouts/:id', protect, adminOnly, updateWorkout);
router.delete('/workouts/:id', protect, adminOnly, deleteWorkout);
router.post('/videos', protect, adminOnly, upload.single('video'), (req, res) => {
  res.status(201).json({ file: req.file });
});

export default router;
