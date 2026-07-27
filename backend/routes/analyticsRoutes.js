import express from 'express';
import { getVendorAnalytics } from '../controllers/analyticsController.js';
import { protect, authorize } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.get('/vendor', protect, authorize('vendor'), getVendorAnalytics);

export default router;