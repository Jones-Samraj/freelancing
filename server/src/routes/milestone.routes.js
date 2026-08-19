import { Router } from 'express';
import * as milestoneController from '../controllers/milestone.controller.js';
import { requireAuth } from '../middleware/auth.middleware.js';
import { requireAdmin } from '../middleware/role.middleware.js';

const router = Router();

// Admin submits milestone for client approval
router.post('/:id/submit', requireAuth, requireAdmin, milestoneController.submitMilestone);

// Client approves milestone (triggers payment and completion logic)
router.post('/:id/approve', requireAuth, milestoneController.approveMilestone);

// Tasks management within milestone
router.post('/:id/tasks', requireAuth, requireAdmin, milestoneController.createTask);
router.put('/tasks/:taskId', requireAuth, milestoneController.updateTask);

export default router;
