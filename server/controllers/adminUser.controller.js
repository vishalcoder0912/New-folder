import AdminUser from '../models/AdminUser.js';
import asyncHandler from '../utils/asyncHandler.js';
import { ok } from '../utils/apiResponse.js';

export const listAdminUsers = asyncHandler(async (_req, res) => {
  const users = await AdminUser.find({}).select('-password').sort({ createdAt: -1 });
  ok(res, users);
});

export const createAdminUser = asyncHandler(async (req, res) => {
  const user = await AdminUser.create(req.body);
  const safe = user.toObject();
  delete safe.password;
  ok(res, safe, 'Admin user created', 201);
});

export const updateAdminUser = asyncHandler(async (req, res) => {
  const user = await AdminUser.findById(req.params.id).select('+password');
  if (!user) {
    const error = new Error('Admin user not found');
    error.statusCode = 404;
    throw error;
  }
  const payload = { ...req.body };
  if (!payload.password) delete payload.password;
  Object.assign(user, payload);
  await user.save();
  const safe = user.toObject();
  delete safe.password;
  ok(res, safe, 'Admin user updated');
});

export const deleteAdminUser = asyncHandler(async (req, res) => {
  if (String(req.admin._id) === String(req.params.id)) {
    const error = new Error('You cannot delete your own account');
    error.statusCode = 400;
    throw error;
  }
  const user = await AdminUser.findByIdAndDelete(req.params.id);
  if (!user) {
    const error = new Error('Admin user not found');
    error.statusCode = 404;
    throw error;
  }
  ok(res, null, 'Admin user deleted');
});
