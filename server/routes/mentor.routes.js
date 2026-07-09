import { Router } from 'express';
import Mentor from '../models/Mentor.js';
import { create, list, remove, update } from '../controllers/crudFactory.js';
import { optionalAuth, protect } from '../middleware/auth.middleware.js';

const router = Router();

router.get('/', optionalAuth, list(Mentor, { isActive: true }, { searchFields: ['name', 'designation'] }));
router.post('/', protect, create(Mentor));
router.put('/:id', protect, update(Mentor));
router.delete('/:id', protect, remove(Mentor));

export default router;
