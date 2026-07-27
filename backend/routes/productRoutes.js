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

const router = express.Router();

// Public catalog routes
router.get('/', getProducts);
router.get('/:id', getProductById);

// Protected vendor/admin routes
router.post(
  '/',
  protect,
  authorize('vendor', 'admin'),
  upload.array('imageFiles', 5), // <--- Added upload middleware
  createProductValidation,
  createProduct
);

router.put(
  '/:id',
  protect,
  authorize('vendor', 'admin'),
  upload.array('imageFiles', 5), // <--- Added upload middleware
  updateProductValidation,
  updateProduct
);

router.delete('/:id', protect, authorize('vendor', 'admin'), deleteProduct);

export default router;