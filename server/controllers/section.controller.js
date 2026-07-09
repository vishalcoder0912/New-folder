import PageSection from '../models/PageSection.js';
import asyncHandler from '../utils/asyncHandler.js';
import { ok } from '../utils/apiResponse.js';

export const getSectionsByPage = asyncHandler(async (req, res) => {
  const filter = { pageName: req.params.pageName.toLowerCase() };
  if (!(req.admin && req.query.all === 'true')) filter.isVisible = true;
  const sections = await PageSection.find(filter).sort({ order: 1 });
  ok(res, sections);
});

export const createSection = asyncHandler(async (req, res) => {
  const section = await PageSection.create(req.body);
  ok(res, section, 'Section created', 201);
});

export const updateSection = asyncHandler(async (req, res) => {
  const section = await PageSection.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });
  if (!section) {
    const error = new Error('Section not found');
    error.statusCode = 404;
    throw error;
  }
  ok(res, section, 'Section updated');
});

export const deleteSection = asyncHandler(async (req, res) => {
  const section = await PageSection.findByIdAndDelete(req.params.id);
  if (!section) {
    const error = new Error('Section not found');
    error.statusCode = 404;
    throw error;
  }
  ok(res, section, 'Section deleted');
});

export const reorderSections = asyncHandler(async (req, res) => {
  const updates = Array.isArray(req.body.items) ? req.body.items : [];
  await Promise.all(updates.map(({ id, order }) => PageSection.findByIdAndUpdate(id, { order })));
  ok(res, null, 'Sections reordered');
});

export const toggleVisibility = asyncHandler(async (req, res) => {
  const section = await PageSection.findById(req.params.id);
  if (!section) {
    const error = new Error('Section not found');
    error.statusCode = 404;
    throw error;
  }
  section.isVisible = typeof req.body.isVisible === 'boolean' ? req.body.isVisible : !section.isVisible;
  await section.save();
  ok(res, section, 'Visibility updated');
});
