import { Router } from 'express';
import { createLead, deleteLead, exportLeadsCsv, getLead, listLeads, updateLeadStatus } from '../controllers/lead.controller.js';
import { protect } from '../middleware/auth.middleware.js';

const router = Router();

router.post('/', createLead);
router.get('/', protect, listLeads);
router.get('/export/csv', protect, exportLeadsCsv);
router.get('/:id', protect, getLead);
router.patch('/:id/status', protect, updateLeadStatus);
router.delete('/:id', protect, deleteLead);

export default router;
