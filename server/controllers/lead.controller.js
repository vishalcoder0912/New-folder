import Lead from '../models/Lead.js';
import asyncHandler from '../utils/asyncHandler.js';
import { ok } from '../utils/apiResponse.js';

export const createLead = asyncHandler(async (req, res) => {
  const lead = await Lead.create(req.body);
  ok(res, lead, 'Thanks. We will contact you soon.', 201);
});

export const listLeads = asyncHandler(async (req, res) => {
  const filter = {};
  if (req.query.status) filter.status = req.query.status;
  if (req.query.course) filter.interestedCourse = new RegExp(req.query.course, 'i');
  if (req.query.search) {
    const rx = new RegExp(req.query.search, 'i');
    filter.$or = [{ name: rx }, { email: rx }, { phone: rx }, { interestedCourse: rx }];
  }
  const leads = await Lead.find(filter).sort({ createdAt: -1 });
  ok(res, leads);
});

export const getLead = asyncHandler(async (req, res) => {
  const lead = await Lead.findById(req.params.id);
  if (!lead) {
    const error = new Error('Lead not found');
    error.statusCode = 404;
    throw error;
  }
  ok(res, lead);
});

export const updateLeadStatus = asyncHandler(async (req, res) => {
  const lead = await Lead.findByIdAndUpdate(req.params.id, { status: req.body.status }, {
    new: true,
    runValidators: true
  });
  if (!lead) {
    const error = new Error('Lead not found');
    error.statusCode = 404;
    throw error;
  }
  ok(res, lead, 'Lead status updated');
});

export const deleteLead = asyncHandler(async (req, res) => {
  const lead = await Lead.findByIdAndDelete(req.params.id);
  if (!lead) {
    const error = new Error('Lead not found');
    error.statusCode = 404;
    throw error;
  }
  ok(res, lead, 'Lead deleted');
});

export const exportLeadsCsv = asyncHandler(async (_req, res) => {
  const leads = await Lead.find({}).sort({ createdAt: -1 });
  const headers = ['Name', 'Email', 'Phone', 'Interested Course', 'Status', 'Source Page', 'Message', 'Created At'];
  const escape = (value = '') => `"${String(value).replace(/"/g, '""')}"`;
  const rows = leads.map((lead) => [
    lead.name,
    lead.email,
    lead.phone,
    lead.interestedCourse,
    lead.status,
    lead.sourcePage,
    lead.message,
    lead.createdAt.toISOString()
  ].map(escape).join(','));
  res.header('Content-Type', 'text/csv');
  res.attachment('leads.csv');
  res.send([headers.join(','), ...rows].join('\n'));
});
