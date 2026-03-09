import express from 'express';
import cors from 'cors';
import passport from 'passport';
import env from './config/env.js';
import { connectDb } from './config/db.js';
import { configurePassport } from './config/passport.js';
import authRoutes from './routes/authRoutes.js';
import userRoutes from './routes/userRoutes.js';
import workoutRoutes from './routes/workoutRoutes.js';
import adminRoutes from './routes/adminRoutes.js';
import { initReminderJob } from './services/notificationService.js';

const app = express();
app.use(cors({ origin: env.frontendUrl, credentials: true }));
app.use(express.json());
app.use(passport.initialize());

configurePassport();

app.get('/api/health', (_req, res) => res.json({ status: 'ok' }));
app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);
app.use('/api/workouts', workoutRoutes);
app.use('/api/admin', adminRoutes);

const start = async () => {
  await connectDb();
  initReminderJob();
  app.listen(env.port, () => {
    console.log(`API running on port ${env.port}`);
  });
};

start();
