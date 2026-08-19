import { Router } from 'express';
import * as paymentController from '../controllers/payment.controller.js';
import { requireAuth } from '../middleware/auth.middleware.js';
import { requireAdmin } from '../middleware/role.middleware.js';

const router = Router();

router.get('/', requireAuth, paymentController.getPayments);
router.get('/stats', requireAuth, requireAdmin, paymentController.getPaymentStats);

export default router;
