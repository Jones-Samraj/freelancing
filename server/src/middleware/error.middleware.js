import { errorResponse } from '../utils/response.js';
import { env } from '../config/env.js';

export function notFoundHandler(req, res, next) {
  return errorResponse(res, `Endpoint not found - ${req.originalUrl}`, 404);
}

export function globalErrorHandler(err, req, res, next) {
  console.error('[Unhandled Error]:', err);

  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';

  return res.status(statusCode).json({
    success: false,
    message,
    ...(env.NODE_ENV === 'development' && { stack: err.stack })
  });
}
