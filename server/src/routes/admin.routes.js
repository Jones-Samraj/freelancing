import { Router } from 'express';
import * as adminController from '../controllers/admin.controller.js';
import { requireAuth } from '../middleware/auth.middleware.js';
import { requireAdmin } from '../middleware/role.middleware.js';

const router = Router();

// Public: Contact form submission
router.post('/contact', adminController.submitContactMessage);

// Protected Admin Routes (requireAuth + requireAdmin)
router.use(requireAuth, requireAdmin);

// Dashboard Statistics & Analytics
router.get('/dashboard', adminController.getDashboardStats);

// User Management
router.get('/users', adminController.getAllUsers);
router.get('/users/:id', adminController.getUserDetails);
router.put('/users/:id/status', adminController.updateUserStatus);

// Categories Management
router.get('/categories', adminController.getCategories);
router.post('/categories', adminController.createCategory);
router.put('/categories/:id', adminController.updateCategory);
router.delete('/categories/:id', adminController.deleteCategory);

// Skills Management
router.get('/skills', adminController.getSkills);
router.post('/skills', adminController.createSkill);
router.put('/skills/:id', adminController.updateSkill);
router.delete('/skills/:id', adminController.deleteSkill);

// Countries Management
router.get('/countries', adminController.getCountries);
router.post('/countries', adminController.createCountry);
router.put('/countries/:id', adminController.updateCountry);

// Contact Messages
router.get('/contact-messages', adminController.getContactMessages);
router.put('/contact-messages/:id/status', adminController.updateContactMessageStatus);

export default router;
