import asyncHandler from '../utils/asyncHandler.js';
import { ok } from '../utils/apiResponse.js';

export const list = (Model, publicFilter = {}, options = {}) => asyncHandler(async (req, res) => {
  const adminAll = req.admin && req.query.all === 'true';
  const filter = adminAll ? {} : { ...publicFilter };
  if (options.searchFields?.length && req.query.search) {
    const rx = new RegExp(req.query.search, 'i');
    filter.$or = options.searchFields.map((field) => ({ [field]: rx }));
  }
  const query = Model.find(filter);
  if (options.populate) query.populate(options.populate);
  const items = await query.sort(options.sort || { order: 1, createdAt: -1 });
  ok(res, items);
});

export const getBySlug = (Model, publicFilter = {}, populate = null) => asyncHandler(async (req, res) => {
  const filter = req.admin && req.query.preview === 'true'
    ? { slug: req.params.slug }
    : { slug: req.params.slug, ...publicFilter };
  const query = Model.findOne(filter);
  if (populate) query.populate(populate);
  const item = await query;
  if (!item) {
    const error = new Error('Content not found');
    error.statusCode = 404;
    throw error;
  }
  ok(res, item);
});

export const getById = (Model) => asyncHandler(async (req, res) => {
  const item = await Model.findById(req.params.id);
  if (!item) {
    const error = new Error('Content not found');
    error.statusCode = 404;
    throw error;
  }
  ok(res, item);
});

export const create = (Model) => asyncHandler(async (req, res) => {
  const item = await Model.create(req.body);
  ok(res, item, 'Created successfully', 201);
});

export const update = (Model) => asyncHandler(async (req, res) => {
  const item = await Model.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });
  if (!item) {
    const error = new Error('Content not found');
    error.statusCode = 404;
    throw error;
  }
  ok(res, item, 'Updated successfully');
});

export const remove = (Model) => asyncHandler(async (req, res) => {
  const item = await Model.findByIdAndDelete(req.params.id);
  if (!item) {
    const error = new Error('Content not found');
    error.statusCode = 404;
    throw error;
  }
  ok(res, item, 'Deleted successfully');
});

export const patchStatus = (Model, field = 'status') => asyncHandler(async (req, res) => {
  const item = await Model.findByIdAndUpdate(
    req.params.id,
    { [field]: req.body[field] },
    { new: true, runValidators: true }
  );
  if (!item) {
    const error = new Error('Content not found');
    error.statusCode = 404;
    throw error;
  }
  ok(res, item, 'Status updated');
});

export const reorder = (Model) => asyncHandler(async (req, res) => {
  const updates = Array.isArray(req.body.items) ? req.body.items : [];
  await Promise.all(updates.map(({ id, order }) => Model.findByIdAndUpdate(id, { order })));
  const items = await Model.find({}).sort({ order: 1 });
  ok(res, items, 'Order updated');
});
