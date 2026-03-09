import cron from 'node-cron';
import nodemailer from 'nodemailer';
import env from '../config/env.js';
import User from '../models/User.js';

const transporter = env.smtpHost
  ? nodemailer.createTransport({
      host: env.smtpHost,
      port: env.smtpPort,
      secure: env.smtpPort === 465,
      auth: { user: env.smtpUser, pass: env.smtpPass }
    })
  : null;

export const initReminderJob = () => {
  cron.schedule(env.reminderCron, async () => {
    if (!transporter) return;
    const users = await User.find().select('email name');
    await Promise.all(
      users.map((u) =>
        transporter.sendMail({
          from: env.smtpUser,
          to: u.email,
          subject: 'Your daily ARiSE workout awaits',
          text: `Hi ${u.name}, complete today’s workout and keep your streak alive!`
        })
      )
    );
  });
};
