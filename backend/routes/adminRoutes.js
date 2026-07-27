import express from 'express';
import {
  getUsers,
  getVendorStores,
  updateVendorStatus,
  getPendingProducts,
  updateProductApproval,
} from '../controllers/adminController.js';
import { protect, authorize } from '../middlewares/authMiddleware.js';

const router = express.Router();

// Restrict all admin endpoints strictly to admins
router.use(protect, authorize('admin'));

router.get('/users', getUsers);
router.get('/vendors', getVendorStores);
router.put('/vendors/:id/status', updateVendorStatus);

// Product approval routes
router.get('/products/pending', getPendingProducts);
router.put('/products/:id/approval', updateProductApproval);

export default router;