import { Router } from 'express';
import { deleteMedia, listMedia, uploadMedia } from '../controllers/media.controller.js';
import { protect } from '../middleware/auth.middleware.js';
import { uploadImage } from '../middleware/upload.middleware.js';

const router = Router();

router.post('/upload', protect, uploadImage.single('image'), uploadMedia);
router.get('/', protect, listMedia);
router.delete('/:id', protect, deleteMedia);

export default router;
