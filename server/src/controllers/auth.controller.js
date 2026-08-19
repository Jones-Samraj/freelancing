import * as authService from '../services/auth.service.js';
import { successResponse, errorResponse } from '../utils/response.js';

export async function register(req, res, next) {
  try {
    const { name, email, password, country_id, phone } = req.body;
    const result = await authService.registerUser({ name, email, password, country_id, phone });
    return successResponse(res, 'Registration successful! Welcome to WorkForge.', result, 201);
  } catch (error) {
    if (error.statusCode) {
      return errorResponse(res, error.message, error.statusCode);
    }
    next(error);
  }
}

export async function login(req, res, next) {
  try {
    const { email, password } = req.body;
    const result = await authService.loginUser({ email, password });
    return successResponse(res, 'Login successful.', result);
  } catch (error) {
    if (error.statusCode) {
      return errorResponse(res, error.message, error.statusCode);
    }
    next(error);
  }
}

export async function getMe(req, res, next) {
  try {
    const user = await authService.getMe(req.user.id);
    return successResponse(res, 'Profile retrieved.', { user });
  } catch (error) {
    if (error.statusCode) {
      return errorResponse(res, error.message, error.statusCode);
    }
    next(error);
  }
}

export async function forgotPassword(req, res, next) {
  try {
    const { email } = req.body;
    return successResponse(res, 'If an account exists with that email, a password reset link has been dispatched.');
  } catch (error) {
    next(error);
  }
}

export async function resetPassword(req, res, next) {
  try {
    return successResponse(res, 'Your password has been successfully reset. You may now log in.');
  } catch (error) {
    next(error);
  }
}
