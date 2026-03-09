import jwt from 'jsonwebtoken';
import env from '../config/env.js';
import User from '../models/User.js';

export const protect = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader?.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, env.jwtSecret);
    req.user = await User.findById(decoded.userId).select('-password');
    if (!req.user) {
      return res.status(401).json({ message: 'Invalid token' });
    }
    return next();
  } catch {
    return res.status(401).json({ message: 'Token expired or invalid' });
  }
};

export const adminOnly = (req, res, next) => {
  if (req.user?.email !== process.env.ADMIN_EMAIL) {
    return res.status(403).json({ message: 'Admin only route' });
  }
  return next();
};
