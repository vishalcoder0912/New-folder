import { Router } from 'express';
import { getSettings, updateSettings } from '../controllers/settings.controller.js';
import { protect } from '../middleware/auth.middleware.js';

const router = Router();

router.get('/', getSettings);
router.put('/', protect, updateSettings);

export default router;
