import express from 'express';
import passport from 'passport';
import { body } from 'express-validator';
import { googleSuccess, login, register } from '../controllers/authController.js';

const router = express.Router();

router.post(
  '/register',
  [
    body('name').notEmpty(),
    body('email').isEmail(),
    body('password').isLength({ min: 6 }),
    body('fitnessGoal').isIn(['fat_loss', 'muscle_gain', 'endurance']),
    body('fitnessLevel').isIn(['beginner', 'intermediate', 'advanced'])
  ],
  register
);
router.post('/login', login);
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
router.get('/google/callback', passport.authenticate('google', { session: false }), googleSuccess);

export default router;
