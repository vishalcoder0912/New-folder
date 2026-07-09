import { Router } from 'express';
import Blog from '../models/Blog.js';
import { create, getBySlug, list, remove, update } from '../controllers/crudFactory.js';
import { optionalAuth, protect } from '../middleware/auth.middleware.js';

const router = Router();
const publicFilter = { status: 'published', isVisible: true };

router.get('/', optionalAuth, list(Blog, publicFilter, { searchFields: ['title', 'category', 'author'] }));
router.get('/:slug', optionalAuth, getBySlug(Blog, publicFilter));
router.post('/', protect, create(Blog));
router.put('/:id', protect, update(Blog));
router.delete('/:id', protect, remove(Blog));

export default router;
