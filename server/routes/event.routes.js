import { Router } from 'express';
import Event from '../models/Event.js';
import { create, getBySlug, list, remove, update } from '../controllers/crudFactory.js';
import { optionalAuth, protect } from '../middleware/auth.middleware.js';

const router = Router();
const publicFilter = { isVisible: true, status: { $ne: 'draft' } };

router.get('/', optionalAuth, list(Event, publicFilter, { searchFields: ['title', 'location'] }));
router.get('/:slug', optionalAuth, getBySlug(Event, publicFilter));
router.post('/', protect, create(Event));
router.put('/:id', protect, update(Event));
router.delete('/:id', protect, remove(Event));

export default router;
