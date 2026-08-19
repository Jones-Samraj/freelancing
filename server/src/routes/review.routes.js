import { Router } from 'express';
import * as reviewController from '../controllers/review.controller.js';
import { requireAuth } from '../middleware/auth.middleware.js';

const router = Router();

// Public: Get all reviews (e.g. for homepage testimonials/social proof)
router.get('/', reviewController.getReviews);

// Client-only: Submit review for a completed project
router.post('/', requireAuth, reviewController.createReview);

export default router;
