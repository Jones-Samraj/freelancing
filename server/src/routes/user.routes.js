import { Router } from 'express';
import * as userController from '../controllers/user.controller.js';
import { requireAuth } from '../middleware/auth.middleware.js';
import { uploadAvatar } from '../middleware/upload.middleware.js';
import { validate } from '../middleware/validation.middleware.js';
import { updateProfileValidation, changePasswordValidation } from '../validations/user.validation.js';

const router = Router();

router.get('/profile', requireAuth, userController.getProfile);
router.put('/profile', requireAuth, uploadAvatar.single('avatar'), updateProfileValidation, validate, userController.updateProfile);
router.put('/change-password', requireAuth, changePasswordValidation, validate, userController.changePassword);
router.get('/countries', userController.getCountries);

export default router;
