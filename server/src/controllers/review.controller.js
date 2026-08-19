import * as reviewService from '../services/review.service.js';
import { successResponse, errorResponse } from '../utils/response.js';

export async function createReview(req, res, next) {
  try {
    const { project_id, rating, comment } = req.body;
    if (!project_id || !rating || !comment) {
      return errorResponse(res, 'Project ID, rating (1-5), and comment are required.', 400);
    }
    const review = await reviewService.createReview(req.user.id, { project_id, rating, comment });
    return successResponse(res, 'Review submitted successfully! Thank you.', { review }, 201);
  } catch (error) {
    if (error.statusCode) return errorResponse(res, error.message, error.statusCode);
    next(error);
  }
}

export async function getReviews(req, res, next) {
  try {
    const { limit = 50 } = req.query;
    const reviews = await reviewService.getAllReviews({ limit });
    return successResponse(res, 'Reviews retrieved.', { reviews });
  } catch (error) {
    next(error);
  }
}
