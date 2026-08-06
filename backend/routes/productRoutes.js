
import express from 'express';
import {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} from '../controllers/productController.js';
import { protect, authorize } from '../middlewares/authMiddleware.js';
import { upload } from '../middlewares/uploadMiddleware.js';
import { createProductValidation, updateProductValidation } from '../validators/productValidator.js';
import reviewRouter from './reviewRoutes.js'; // <--- Import Review Router

const router = express.Router();

// Forward /:productId/reviews to reviewRouter
router.use('/:productId/reviews', reviewRouter); // <--- Mount Nested Reviews Endpoint

// Public catalog routes
router.get('/', getProducts);
router.get('/:id', getProductById);

// Protected vendor/admin routes
router.post(
  '/',
  protect,
  authorize('vendor', 'admin'),
  upload.array('imageFiles', 5),
  createProductValidation,
  createProduct
);

router.put(
  '/:id',
  protect,
  authorize('vendor', 'admin'),
  upload.array('imageFiles', 5),
  updateProductValidation,
  updateProduct
);

router.delete('/:id', protect, authorize('vendor', 'admin'), deleteProduct);

export default router;