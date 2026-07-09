import jwt from 'jsonwebtoken';
import rateLimit from 'express-rate-limit';
import AdminUser from '../models/AdminUser.js';
import asyncHandler from '../utils/asyncHandler.js';
import { ok } from '../utils/apiResponse.js';

export const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 20,
  standardHeaders: true,
  legacyHeaders: false,
  message: { success: false, message: 'Too many login attempts. Try again later.' }
});

const signToken = (admin) => jwt.sign(
  { id: admin._id, role: admin.role },
  process.env.JWT_SECRET,
  { expiresIn: process.env.JWT_EXPIRES_IN || '7d' }
);

export const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const admin = await AdminUser.findOne({ email: String(email || '').toLowerCase() }).select('+password');
  if (!admin || !admin.isActive || !(await admin.comparePassword(password || ''))) {
    const error = new Error('Invalid email or password');
    error.statusCode = 401;
    throw error;
  }
  admin.lastLogin = new Date();
  await admin.save();
  const token = signToken(admin);
  const safeAdmin = admin.toObject();
  delete safeAdmin.password;
  ok(res, { token, admin: safeAdmin }, 'Login successful');
});

export const me = asyncHandler(async (req, res) => {
  ok(res, req.admin, 'Authenticated admin');
});

export const logout = asyncHandler(async (_req, res) => {
  ok(res, null, 'Logged out');
});
