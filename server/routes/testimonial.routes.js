import { Router } from 'express';
import Testimonial from '../models/Testimonial.js';
import { create, list, remove, update } from '../controllers/crudFactory.js';
import { optionalAuth, protect } from '../middleware/auth.middleware.js';

const router = Router();

router.get('/', optionalAuth, list(Testimonial, { status: 'active' }, { searchFields: ['studentName', 'courseName'] }));
router.post('/', protect, create(Testimonial));
router.put('/:id', protect, update(Testimonial));
router.delete('/:id', protect, remove(Testimonial));

export default router;
