import { Router } from 'express';
import * as reviewController from '../controllers/review.controller';

const router = Router();

// Public routes for homepage and admin management (Bypassed auth for Next.js SSR mock mode)
router.get('/', reviewController.getAllReviews);
router.post('/', reviewController.createReview);
router.put('/:id', reviewController.updateReview);
router.delete('/:id', reviewController.deleteReview);

export default router;
