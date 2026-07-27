import express from 'express';
import {
  createStore,
  getMyStore,
  updateStore,
  getVendorProfile,
  updateStoreSetup,
} from '../controllers/vendorController.js';
import { protect, authorize } from '../middlewares/authMiddleware.js';
import {
  storeSetupValidation,
  updateStoreValidation,
} from '../validators/storeValidator.js';

const router = express.Router();

// All vendor endpoints require authentication
router.use(protect);

// Allowed for customers wanting to upgrade to vendor OR existing vendors
router.post('/store', authorize('vendor', 'customer'), storeSetupValidation, createStore);

// Strictly restricted to vendors and admins
router.get('/profile', authorize('vendor', 'admin'), getVendorProfile);

// 📍 REMOVED storeSetupValidation here to prevent middleware 400 blocks
router.put('/store-setup', authorize('vendor', 'admin'), updateStoreSetup);

router.get('/store/me', authorize('vendor', 'admin'), getMyStore);
router.put('/store', authorize('vendor', 'admin'), updateStoreValidation, updateStore);

export default router;