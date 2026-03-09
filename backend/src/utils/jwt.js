import jwt from 'jsonwebtoken';
import env from '../config/env.js';

export const signToken = (user) =>
  jwt.sign({ userId: user._id, email: user.email }, env.jwtSecret, { expiresIn: env.jwtExpiry });
