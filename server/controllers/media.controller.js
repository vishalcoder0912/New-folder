import Media from '../models/Media.js';
import asyncHandler from '../utils/asyncHandler.js';
import { ok } from '../utils/apiResponse.js';
import { deleteFromImageKit, uploadToImageKit } from '../services/imagekit.service.js';

export const uploadMedia = asyncHandler(async (req, res) => {
  if (!req.file) {
    const error = new Error('Image file is required');
    error.statusCode = 422;
    throw error;
  }
  const result = await uploadToImageKit(req.file);
  const media = await Media.create({
    title: req.body.title || req.file.originalname,
    url: result.url,
    fileId: result.fileId,
    fileName: result.name,
    mimeType: req.file.mimetype,
    size: req.file.size,
    width: result.width,
    height: result.height,
    uploadedBy: req.admin?._id
  });
  ok(res, media, 'Image uploaded', 201);
});

export const listMedia = asyncHandler(async (_req, res) => {
  const media = await Media.find({}).sort({ createdAt: -1 });
  ok(res, media);
});

export const deleteMedia = asyncHandler(async (req, res) => {
  const media = await Media.findByIdAndDelete(req.params.id);
  if (!media) {
    const error = new Error('Media item not found');
    error.statusCode = 404;
    throw error;
  }
  await deleteFromImageKit(media.fileId);
  ok(res, media, 'Media deleted');
});
