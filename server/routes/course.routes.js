import { Router } from 'express';
import Course from '../models/Course.js';
import { create, getBySlug, list, patchStatus, remove, update } from '../controllers/crudFactory.js';
import { optionalAuth, protect } from '../middleware/auth.middleware.js';

const router = Router();
const publicFilter = { status: 'published', isVisible: true };

router.get('/', optionalAuth, list(Course, publicFilter, { populate: 'instructor', searchFields: ['title', 'category'] }));
router.get('/:slug', optionalAuth, getBySlug(Course, publicFilter, 'instructor'));
router.post('/', protect, create(Course));
router.put('/:id', protect, update(Course));
router.delete('/:id', protect, remove(Course));
router.patch('/:id/status', protect, patchStatus(Course));

export default router;
