import { validationResult } from 'express-validator';
import { errorResponse } from '../utils/response.js';

export function validate(req, res, next) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const formattedErrors = errors.array().map(err => ({
      field: err.path || err.param,
      message: err.msg,
      value: err.value
    }));
    return errorResponse(res, 'Validation error. Please check your inputs.', 422, formattedErrors);
  }
  next();
}
