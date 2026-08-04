import express from 'express';
import { createProductReview, getProductReviews } from '../controllers/reviewController.js';
import { protect } from '../middlewares/authMiddleware.js';

// mergeParams allows access to :productId defined in parent router
const router = express.Router({ mergeParams: true });

router
  .route('/')
  .get(getProductReviews)
  .post(protect, createProductReview);

export default router;