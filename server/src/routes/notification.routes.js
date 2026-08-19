import { Router } from 'express';
import * as notifController from '../controllers/notification.controller.js';
import { requireAuth } from '../middleware/auth.middleware.js';

const router = Router();

router.get('/', requireAuth, notifController.getNotifications);
router.put('/:id/read', requireAuth, notifController.markAsRead);
router.put('/read-all', requireAuth, notifController.markAllAsRead);

export default router;
