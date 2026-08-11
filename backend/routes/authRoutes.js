
// import express from 'express';
// import { 
//   register, 
//   login, 
//   getMe, 
//   checkEmailExists, 
//   verifyOTP, 
//   resendOTP,
//   forgotPassword, 
//   resetPassword, 
//   changePassword 
// } from '../controllers/authController.js';
// import { protect } from '../middlewares/authMiddleware.js';
// import { registerValidation, loginValidation } from '../validators/authValidator.js';

// const router = express.Router();

// router.post('/check-email', checkEmailExists);
// router.post('/register', registerValidation, register);
// router.post('/verify-otp', verifyOTP);
// router.post('/resend-otp', resendOTP);
// router.post('/login', loginValidation, login);
// router.post('/forgot-password', forgotPassword);
// router.put('/reset-password/:resettoken', resetPassword);
// router.put('/change-password', protect, changePassword);
// router.get('/me', protect, getMe);

// export default router;


import express from 'express';
import { 
  register, 
  login, 
  getMe, 
  checkEmailExists, 
  verifyOTP, 
  resendOTP,
  forgotPassword, 
  resetPassword, 
  changePassword 
} from '../controllers/authController.js';
import { protect } from '../middlewares/authMiddleware.js';
import { registerValidation, loginValidation } from '../validators/authValidator.js';

const router = express.Router();

router.post('/check-email', checkEmailExists);
router.post('/register', registerValidation, register);
router.post('/verify-otp', verifyOTP);
router.post('/resend-otp', resendOTP);
router.post('/login', loginValidation, login);
router.post('/forgot-password', forgotPassword);
router.put('/reset-password/:resettoken', resetPassword);
router.put('/change-password', protect, changePassword);
router.get('/me', protect, getMe);

export default router;