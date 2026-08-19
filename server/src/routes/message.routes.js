import { Router } from 'express';
import * as messageController from '../controllers/message.controller.js';
import { requireAuth } from '../middleware/auth.middleware.js';
import { uploadMessageAttachment } from '../middleware/upload.middleware.js';

const router = Router();

router.get('/project/:projectId', requireAuth, messageController.getProjectMessages);
router.post('/project/:projectId', requireAuth, uploadMessageAttachment.single('attachment'), messageController.sendMessage);

export default router;
