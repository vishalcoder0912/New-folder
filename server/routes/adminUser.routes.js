import { Router } from 'express';
import { createAdminUser, deleteAdminUser, listAdminUsers, updateAdminUser } from '../controllers/adminUser.controller.js';
import { protect, requireRole } from '../middleware/auth.middleware.js';

const router = Router();

router.use(protect, requireRole('superAdmin'));
router.get('/', listAdminUsers);
router.post('/', createAdminUser);
router.put('/:id', updateAdminUser);
router.delete('/:id', deleteAdminUser);

export default router;
