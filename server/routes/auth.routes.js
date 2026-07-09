import { Router } from 'express';
import { authLimiter, login, logout, me } from '../controllers/auth.controller.js';
import { protect } from '../middleware/auth.middleware.js';

const router = Router();

router.post('/login', authLimiter, login);
router.get('/me', protect, me);
router.post('/logout', protect, logout);

export default router;
