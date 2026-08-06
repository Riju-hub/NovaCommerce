
import express from 'express';
import { 
  createProductReview, 
  getProductReviews, 
  deleteReview 
} from '../controllers/reviewController.js';
import { protect } from '../middlewares/authMiddleware.js';

// mergeParams allows access to :productId defined in parent router
const router = express.Router({ mergeParams: true });

router
  .route('/')
  .get(getProductReviews)
  .post(protect, createProductReview);

// Route for deleting a specific review
router
  .route('/:reviewId')
  .delete(protect, deleteReview);

export default router;