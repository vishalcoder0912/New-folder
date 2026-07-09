import { Router } from 'express';
import { createSection, deleteSection, getSectionsByPage, reorderSections, toggleVisibility, updateSection } from '../controllers/section.controller.js';
import { optionalAuth, protect } from '../middleware/auth.middleware.js';

const router = Router();

router.get('/:pageName', optionalAuth, getSectionsByPage);
router.post('/', protect, createSection);
router.put('/:id', protect, updateSection);
router.delete('/:id', protect, deleteSection);
router.patch('/reorder', protect, reorderSections);
router.patch('/:id/toggle-visibility', protect, toggleVisibility);

export default router;
