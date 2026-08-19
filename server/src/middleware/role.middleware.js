import { errorResponse } from '../utils/response.js';

export function requireAdmin(req, res, next) {
  if (!req.user) {
    return errorResponse(res, 'Authentication required.', 401);
  }

  if (req.user.role !== 'admin') {
    return errorResponse(res, 'Access denied. Administrative privileges required.', 403);
  }

  next();
}

export function requireRole(allowedRoles = []) {
  return (req, res, next) => {
    if (!req.user) {
      return errorResponse(res, 'Authentication required.', 401);
    }

    if (!allowedRoles.includes(req.user.role)) {
      return errorResponse(res, 'Access forbidden: Insufficient permissions.', 403);
    }

    next();
  };
}
