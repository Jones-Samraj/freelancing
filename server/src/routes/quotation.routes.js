import { Router } from 'express';
import * as quotationController from '../controllers/quotation.controller.js';
import { requireAuth } from '../middleware/auth.middleware.js';
import { requireAdmin } from '../middleware/role.middleware.js';
import { validate } from '../middleware/validation.middleware.js';
import { createQuotationValidation, respondQuotationValidation } from '../validations/quotation.validation.js';

const router = Router();

// User & Admin: List & Details
router.get('/', requireAuth, quotationController.getQuotations);
router.get('/:id', requireAuth, quotationController.getQuotationById);

// Admin-only: Create Quotation
router.post('/', requireAuth, requireAdmin, createQuotationValidation, validate, quotationController.createQuotation);

// Client-only: Accept or Reject Quotation
router.post('/:id/respond', requireAuth, respondQuotationValidation, validate, quotationController.respondToQuotation);

export default router;
