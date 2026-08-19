import { Router } from 'express';
import * as projectController from '../controllers/project.controller.js';
import { requireAuth } from '../middleware/auth.middleware.js';
import { requireAdmin } from '../middleware/role.middleware.js';
import { uploadProjectFile } from '../middleware/upload.middleware.js';
import { validate } from '../middleware/validation.middleware.js';
import { createProjectValidation, updateProjectStatusValidation } from '../validations/project.validation.js';

const router = Router();

// Public showcase search
router.get('/public', projectController.getPublicProjects);

// User / Authenticated routes
router.post('/', requireAuth, uploadProjectFile.array('files', 10), createProjectValidation, validate, projectController.createProject);
router.get('/', requireAuth, projectController.getProjects);
router.get('/:id', requireAuth, projectController.getProjectById);
router.post('/:id/files', requireAuth, uploadProjectFile.single('file'), projectController.uploadFile);

// Admin-only project status update
router.put('/:id/status', requireAuth, requireAdmin, updateProjectStatusValidation, validate, projectController.updateProjectStatus);

export default router;
