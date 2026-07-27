import express from 'express';
import { updateProfile, getAddress } from '../controllers/userController.js';
import { protect } from '../middlewares/authMiddleware.js';
import { updateProfileValidation } from '../validators/authValidator.js';

const router = express.Router();

router.use(protect); // All user routes require authentication

router.put('/profile', updateProfileValidation, updateProfile);
router.get('/address', getAddress);

export default router;