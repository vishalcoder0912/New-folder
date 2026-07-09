import WebsiteSetting from '../models/WebsiteSetting.js';
import asyncHandler from '../utils/asyncHandler.js';
import { ok } from '../utils/apiResponse.js';

export const getSettings = asyncHandler(async (_req, res) => {
  let settings = await WebsiteSetting.findOne({});
  if (!settings) settings = await WebsiteSetting.create({});
  ok(res, settings);
});

export const updateSettings = asyncHandler(async (req, res) => {
  const settings = await WebsiteSetting.findOneAndUpdate({}, req.body, {
    new: true,
    upsert: true,
    runValidators: true
  });
  ok(res, settings, 'Settings updated');
});
