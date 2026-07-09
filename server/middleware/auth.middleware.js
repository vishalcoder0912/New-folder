import jwt from 'jsonwebtoken';
import AdminUser from '../models/AdminUser.js';

const readToken = (req) => {
  const header = req.headers.authorization || '';
  if (header.startsWith('Bearer ')) return header.slice(7);
  return null;
};

export const protect = async (req, _res, next) => {
  const token = readToken(req);
  if (!token) {
    const error = new Error('Authentication required');
    error.statusCode = 401;
    return next(error);
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const admin = await AdminUser.findById(decoded.id).select('-password');
    if (!admin || !admin.isActive) {
      const error = new Error('Invalid admin session');
      error.statusCode = 401;
      return next(error);
    }
    req.admin = admin;
    return next();
  } catch (_error) {
    const error = new Error('Invalid or expired token');
    error.statusCode = 401;
    return next(error);
  }
};

export const optionalAuth = async (req, _res, next) => {
  const token = readToken(req);
  if (!token) return next();
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.admin = await AdminUser.findById(decoded.id).select('-password');
  } catch (_error) {
    req.admin = null;
  }
  return next();
};

export const requireRole = (...roles) => (req, _res, next) => {
  if (!req.admin || !roles.includes(req.admin.role)) {
    const error = new Error('You do not have permission to perform this action');
    error.statusCode = 403;
    return next(error);
  }
  return next();
};
