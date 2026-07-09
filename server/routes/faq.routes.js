import { Router } from 'express';
import FAQ from '../models/FAQ.js';
import { create, list, remove, reorder, update } from '../controllers/crudFactory.js';
import { optionalAuth, protect } from '../middleware/auth.middleware.js';

const router = Router();

router.get('/', optionalAuth, list(FAQ, { isVisible: true }, { searchFields: ['question'] }));
router.post('/', protect, create(FAQ));
router.put('/:id', protect, update(FAQ));
router.delete('/:id', protect, remove(FAQ));
router.patch('/reorder', protect, reorder(FAQ));

export default router;
