import * as userService from '../services/user.service.js';
import { successResponse, errorResponse } from '../utils/response.js';

export async function getProfile(req, res, next) {
  try {
    const profile = await userService.getUserProfile(req.user.id);
    return successResponse(res, 'User profile fetched', { profile });
  } catch (error) {
    if (error.statusCode) return errorResponse(res, error.message, error.statusCode);
    next(error);
  }
}

export async function updateProfile(req, res, next) {
  try {
    const avatarPath = req.file ? req.file.filename : null;
    const updated = await userService.updateUserProfile(req.user.id, req.body, avatarPath);
    return successResponse(res, 'Profile updated successfully', { user: updated });
  } catch (error) {
    if (error.statusCode) return errorResponse(res, error.message, error.statusCode);
    next(error);
  }
}

export async function changePassword(req, res, next) {
  try {
    const { currentPassword, newPassword } = req.body;
    await userService.changeUserPassword(req.user.id, currentPassword, newPassword);
    return successResponse(res, 'Password changed successfully.');
  } catch (error) {
    if (error.statusCode) return errorResponse(res, error.message, error.statusCode);
    next(error);
  }
}

export async function getCountries(req, res, next) {
  try {
    const countries = await userService.getAllCountries();
    return successResponse(res, 'Countries fetched', { countries });
  } catch (error) {
    next(error);
  }
}
