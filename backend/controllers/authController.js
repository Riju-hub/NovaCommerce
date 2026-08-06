
// // import crypto from 'crypto';
// // import User from '../models/User.js';
// // import { sendTokenResponse } from '../utils/generateToken.js';
// // import sendEmail from '../utils/sendEmail.js';
// // import { 
// //   getWelcomeTemplate, 
// //   getOtpTemplate, 
// //   getPasswordResetTemplate, 
// //   getPasswordChangedTemplate 
// // } from '../utils/emailTemplates.js';

// // // @desc    Check if email exists in real-time
// // // @route   POST /api/auth/check-email
// // export const checkEmailExists = async (req, res, next) => {
// //   try {
// //     const { email } = req.body;
// //     const user = await User.findOne({ email });

// //     res.status(200).json({
// //       success: true,
// //       exists: !!user,
// //       message: user ? 'Email is already registered' : 'Email is available',
// //     });
// //   } catch (error) {
// //     next(error);
// //   }
// // };

// // // @desc    Register User & Send OTP
// // // @route   POST /api/auth/register
// // export const register = async (req, res, next) => {
// //   try {
// //     const { name, email, password, role } = req.body;

// //     const userExists = await User.findOne({ email });
// //     if (userExists) {
// //       return res.status(400).json({ success: false, message: 'User already exists with this email' });
// //     }

// //     const user = new User({
// //       name,
// //       email,
// //       password,
// //       role: role || 'customer',
// //       isVerified: false,
// //     });

// //     const otp = user.generateOTP();
// //     await user.save();

// //     try {
// //       await sendEmail({
// //         email: user.email,
// //         subject: 'Verify Your Email OTP - Nova Ecommerce',
// //         message: `Your verification code is: ${otp}`,
// //         html: getOtpTemplate(otp),
// //       });

// //       res.status(201).json({
// //         success: true,
// //         message: 'Account created! Please verify your email using the OTP sent.',
// //         email: user.email,
// //       });
// //     } catch (emailErr) {
// //       user.otpCode = undefined;
// //       user.otpExpire = undefined;
// //       await user.save({ validateBeforeSave: false });
// //       return res.status(500).json({ success: false, message: 'Verification email could not be sent' });
// //     }
// //   } catch (error) {
// //     next(error);
// //   }
// // };

// // // @desc    Verify OTP Code
// // // @route   POST /api/auth/verify-otp
// // export const verifyOTP = async (req, res, next) => {
// //   try {
// //     const { email, otp } = req.body;

// //     const hashedOtp = crypto.createHash('sha256').update(otp).digest('hex');

// //     const user = await User.findOne({
// //       email,
// //       otpCode: hashedOtp,
// //       otpExpire: { $gt: Date.now() },
// //     });

// //     if (!user) {
// //       return res.status(400).json({ success: false, message: 'Invalid or expired OTP code' });
// //     }

// //     user.isVerified = true;
// //     user.otpCode = undefined;
// //     user.otpExpire = undefined;
// //     await user.save();

// //     // Send Welcome Email
// //     try {
// //       await sendEmail({
// //         email: user.email,
// //         subject: 'Welcome to Nova Ecommerce! 🎉',
// //         message: `Welcome ${user.name}! We are excited to have you join us.`,
// //         html: getWelcomeTemplate(user.name),
// //       });
// //     } catch (err) {
// //       console.error('Welcome email failed:', err.message);
// //     }

// //     sendTokenResponse(user, 200, res);
// //   } catch (error) {
// //     next(error);
// //   }
// // };

// // // @desc    Login user
// // // @route   POST /api/auth/login
// // export const login = async (req, res, next) => {
// //   try {
// //     const { email, password } = req.body;

// //     const user = await User.findOne({ email }).select('+password');
// //     if (!user) {
// //       return res.status(401).json({ success: false, message: 'Invalid credentials' });
// //     }

// //     const isMatch = await user.matchPassword(password);
// //     if (!isMatch) {
// //       return res.status(401).json({ success: false, message: 'Invalid credentials' });
// //     }

// //     sendTokenResponse(user, 200, res);
// //   } catch (error) {
// //     next(error);
// //   }
// // };

// // // @desc    Forgot Password Request
// // // @route   POST /api/auth/forgot-password
// // export const forgotPassword = async (req, res, next) => {
// //   try {
// //     const { email } = req.body;
// //     const user = await User.findOne({ email });

// //     if (!user) {
// //       return res.status(200).json({
// //         success: true,
// //         message: 'If an account exists with this email, a reset link has been sent.',
// //       });
// //     }

// //     const resetToken = user.getResetPasswordToken();
// //     await user.save({ validateBeforeSave: false });

// //     const resetUrl = `${process.env.CLIENT_URL || 'http://localhost:5173'}/reset-password/${resetToken}`;

// //     try {
// //       await sendEmail({
// //         email: user.email,
// //         subject: 'Password Reset Request',
// //         message: `Reset your password here: ${resetUrl}`,
// //         html: getPasswordResetTemplate(resetUrl),
// //       });

// //       res.status(200).json({ success: true, message: 'Reset email sent successfully' });
// //     } catch (err) {
// //       user.resetPasswordToken = undefined;
// //       user.resetPasswordExpire = undefined;
// //       await user.save({ validateBeforeSave: false });
// //       return res.status(500).json({ success: false, message: 'Email could not be sent' });
// //     }
// //   } catch (error) {
// //     next(error);
// //   }
// // };

// // // @desc    Reset Password via Token
// // // @route   PUT /api/auth/reset-password/:resettoken
// // export const resetPassword = async (req, res, next) => {
// //   try {
// //     const resetPasswordToken = crypto
// //       .createHash('sha256')
// //       .update(req.params.resettoken)
// //       .digest('hex');

// //     const user = await User.findOne({
// //       resetPasswordToken,
// //       resetPasswordExpire: { $gt: Date.now() },
// //     });

// //     if (!user) {
// //       return res.status(400).json({ success: false, message: 'Invalid or expired reset token' });
// //     }

// //     user.password = req.body.password;
// //     user.resetPasswordToken = undefined;
// //     user.resetPasswordExpire = undefined;
// //     await user.save();

// //     sendTokenResponse(user, 200, res);
// //   } catch (error) {
// //     next(error);
// //   }
// // };

// // // @desc    Change Password (Logged-In User)
// // // @route   PUT /api/auth/change-password
// // export const changePassword = async (req, res, next) => {
// //   try {
// //     const user = await User.findById(req.user.id).select('+password');

// //     const isMatch = await user.matchPassword(req.body.currentPassword);
// //     if (!isMatch) {
// //       return res.status(401).json({ success: false, message: 'Current password is incorrect' });
// //     }

// //     user.password = req.body.newPassword;
// //     await user.save();

// //     try {
// //       await sendEmail({
// //         email: user.email,
// //         subject: 'Security Alert: Password Changed',
// //         message: 'Your password was updated successfully.',
// //         html: getPasswordChangedTemplate(user.name),
// //       });
// //     } catch (err) {
// //       console.error('Password change alert failed:', err.message);
// //     }

// //     sendTokenResponse(user, 200, res);
// //   } catch (error) {
// //     next(error);
// //   }
// // };

// // // @desc    Get Current User Profile
// // // @route   GET /api/auth/me
// // export const getMe = async (req, res, next) => {
// //   try {
// //     const user = await User.findById(req.user.id).populate('store');
// //     res.status(200).json({ success: true, data: user });
// //   } catch (error) {
// //     next(error);
// //   }
// // };


// import crypto from 'crypto';
// import User from '../models/User.js';
// import { sendTokenResponse } from '../utils/generateToken.js';
// import sendEmail from '../utils/sendEmail.js';
// import { verifyEmailExistence } from '../utils/validateEmail.js';
// import { 
//   getWelcomeTemplate, 
//   getOtpTemplate, 
//   getPasswordResetTemplate, 
//   getPasswordChangedTemplate 
// } from '../utils/emailTemplates.js';

// // @desc    Check if email exists in DB and verifies deliverability
// // @route   POST /api/auth/check-email
// export const checkEmailExists = async (req, res, next) => {
//   try {
//     const { email } = req.body;

//     if (!email) {
//       return res.status(400).json({ success: false, message: 'Please enter an email address' });
//     }

//     // Check deliverability first
//     const emailCheck = await verifyEmailExistence(email);
//     if (!emailCheck.isValid) {
//       return res.status(400).json({
//         success: false,
//         exists: false,
//         message: emailCheck.reason,
//       });
//     }

//     // Check DB registration state
//     const user = await User.findOne({ email });

//     res.status(200).json({
//       success: true,
//       exists: !!user,
//       message: user ? 'Email is already registered' : 'Email address is valid and available',
//     });
//   } catch (error) {
//     next(error);
//   }
// };

// // @desc    Register User & Send OTP
// // @route   POST /api/auth/register
// export const register = async (req, res, next) => {
//   try {
//     const { name, email, password, role } = req.body;

//     // Check if user already exists in DB
//     const userExists = await User.findOne({ email });
//     if (userExists) {
//       return res.status(400).json({ success: false, message: 'User already exists with this email' });
//     }

//     // Verify real email existence before saving user or attempting Nodemailer send
//     const emailCheck = await verifyEmailExistence(email);
//     if (!emailCheck.isValid) {
//       return res.status(400).json({
//         success: false,
//         message: emailCheck.reason,
//       });
//     }

//     const user = new User({
//       name,
//       email,
//       password,
//       role: role || 'customer',
//       isVerified: false,
//     });

//     const otp = user.generateOTP();
//     await user.save();

//     try {
//       await sendEmail({
//         email: user.email,
//         subject: 'Verify Your Email OTP - Nova Ecommerce',
//         message: `Your verification code is: ${otp}`,
//         html: getOtpTemplate(otp),
//       });

//       res.status(201).json({
//         success: true,
//         message: 'Account created! Please verify your email using the OTP sent.',
//         email: user.email,
//       });
//     } catch (emailErr) {
//       user.otpCode = undefined;
//       user.otpExpire = undefined;
//       await user.save({ validateBeforeSave: false });
//       return res.status(500).json({ success: false, message: 'Verification email could not be sent' });
//     }
//   } catch (error) {
//     next(error);
//   }
// };

// // @desc    Verify OTP Code
// // @route   POST /api/auth/verify-otp
// export const verifyOTP = async (req, res, next) => {
//   try {
//     const { email, otp } = req.body;

//     const hashedOtp = crypto.createHash('sha256').update(otp).digest('hex');

//     const user = await User.findOne({
//       email,
//       otpCode: hashedOtp,
//       otpExpire: { $gt: Date.now() },
//     });

//     if (!user) {
//       return res.status(400).json({ success: false, message: 'Invalid or expired OTP code' });
//     }

//     user.isVerified = true;
//     user.otpCode = undefined;
//     user.otpExpire = undefined;
//     await user.save();

//     // Send Welcome Email
//     try {
//       await sendEmail({
//         email: user.email,
//         subject: 'Welcome to Nova Ecommerce! 🎉',
//         message: `Welcome ${user.name}! We are excited to have you join us.`,
//         html: getWelcomeTemplate(user.name),
//       });
//     } catch (err) {
//       console.error('Welcome email failed:', err.message);
//     }

//     sendTokenResponse(user, 200, res);
//   } catch (error) {
//     next(error);
//   }
// };

// // @desc    Login user
// // @route   POST /api/auth/login
// export const login = async (req, res, next) => {
//   try {
//     const { email, password } = req.body;

//     const user = await User.findOne({ email }).select('+password');
//     if (!user) {
//       return res.status(401).json({ success: false, message: 'Invalid credentials' });
//     }

//     const isMatch = await user.matchPassword(password);
//     if (!isMatch) {
//       return res.status(401).json({ success: false, message: 'Invalid credentials' });
//     }

//     sendTokenResponse(user, 200, res);
//   } catch (error) {
//     next(error);
//   }
// };

// // @desc    Forgot Password Request
// // @route   POST /api/auth/forgot-password
// export const forgotPassword = async (req, res, next) => {
//   try {
//     const { email } = req.body;
//     const user = await User.findOne({ email });

//     if (!user) {
//       return res.status(200).json({
//         success: true,
//         message: 'If an account exists with this email, a reset link has been sent.',
//       });
//     }

//     const resetToken = user.getResetPasswordToken();
//     await user.save({ validateBeforeSave: false });

//     const resetUrl = `${process.env.CLIENT_URL || 'http://localhost:5173'}/reset-password/${resetToken}`;

//     try {
//       await sendEmail({
//         email: user.email,
//         subject: 'Password Reset Request',
//         message: `Reset your password here: ${resetUrl}`,
//         html: getPasswordResetTemplate(resetUrl),
//       });

//       res.status(200).json({ success: true, message: 'Reset email sent successfully' });
//     } catch (err) {
//       user.resetPasswordToken = undefined;
//       user.resetPasswordExpire = undefined;
//       await user.save({ validateBeforeSave: false });
//       return res.status(500).json({ success: false, message: 'Email could not be sent' });
//     }
//   } catch (error) {
//     next(error);
//   }
// };

// // @desc    Reset Password via Token
// // @route   PUT /api/auth/reset-password/:resettoken
// export const resetPassword = async (req, res, next) => {
//   try {
//     const resetPasswordToken = crypto
//       .createHash('sha256')
//       .update(req.params.resettoken)
//       .digest('hex');

//     const user = await User.findOne({
//       resetPasswordToken,
//       resetPasswordExpire: { $gt: Date.now() },
//     });

//     if (!user) {
//       return res.status(400).json({ success: false, message: 'Invalid or expired reset token' });
//     }

//     user.password = req.body.password;
//     user.resetPasswordToken = undefined;
//     user.resetPasswordExpire = undefined;
//     await user.save();

//     sendTokenResponse(user, 200, res);
//   } catch (error) {
//     next(error);
//   }
// };

// // @desc    Change Password (Logged-In User)
// // @route   PUT /api/auth/change-password
// export const changePassword = async (req, res, next) => {
//   try {
//     const user = await User.findById(req.user.id).select('+password');

//     const isMatch = await user.matchPassword(req.body.currentPassword);
//     if (!isMatch) {
//       return res.status(401).json({ success: false, message: 'Current password is incorrect' });
//     }

//     user.password = req.body.newPassword;
//     await user.save();

//     try {
//       await sendEmail({
//         email: user.email,
//         subject: 'Security Alert: Password Changed',
//         message: 'Your password was updated successfully.',
//         html: getPasswordChangedTemplate(user.name),
//       });
//     } catch (err) {
//       console.error('Password change alert failed:', err.message);
//     }

//     sendTokenResponse(user, 200, res);
//   } catch (error) {
//     next(error);
//   }
// };

// // @desc    Get Current User Profile
// // @route   GET /api/auth/me
// export const getMe = async (req, res, next) => {
//   try {
//     const user = await User.findById(req.user.id).populate('store');
//     res.status(200).json({ success: true, data: user });
//   } catch (error) {
//     next(error);
//   }
// };



import crypto from 'crypto';
import User from '../models/User.js';
import { sendTokenResponse } from '../utils/generateToken.js';
import sendEmail from '../utils/sendEmail.js';
import { verifyEmailExistence } from '../utils/validateEmail.js';
import { 
  getWelcomeTemplate, 
  getOtpTemplate, 
  getPasswordResetTemplate, 
  getPasswordChangedTemplate 
} from '../utils/emailTemplates.js';

// @desc    Check if email exists in DB and verifies deliverability
// @route   POST /api/auth/check-email
export const checkEmailExists = async (req, res, next) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ success: false, message: 'Please enter an email address' });
    }

    const emailCheck = await verifyEmailExistence(email);
    if (!emailCheck.isValid) {
      return res.status(400).json({
        success: false,
        exists: false,
        message: emailCheck.reason,
      });
    }

    const user = await User.findOne({ email });

    res.status(200).json({
      success: true,
      exists: !!user,
      message: user ? 'Email is already registered' : 'Email address is valid and available',
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Register User & Send OTP
// @route   POST /api/auth/register
export const register = async (req, res, next) => {
  try {
    const { name, email, password, role } = req.body;

    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ success: false, message: 'User already exists with this email' });
    }

    const emailCheck = await verifyEmailExistence(email);
    if (!emailCheck.isValid) {
      return res.status(400).json({
        success: false,
        message: emailCheck.reason,
      });
    }

    const user = new User({
      name,
      email,
      password,
      role: role || 'customer',
      isVerified: false,
    });

    const otp = user.generateOTP();
    await user.save();

    try {
      await sendEmail({
        email: user.email,
        subject: 'Verify Your Email OTP - Nova Ecommerce',
        message: `Your verification code is: ${otp}`,
        html: getOtpTemplate(otp),
      });

      res.status(201).json({
        success: true,
        message: 'Account created! Please verify your email using the OTP sent.',
        email: user.email,
      });
    } catch (emailErr) {
      user.otpCode = undefined;
      user.otpExpire = undefined;
      await user.save({ validateBeforeSave: false });
      return res.status(500).json({ success: false, message: 'Verification email could not be sent' });
    }
  } catch (error) {
    next(error);
  }
};

// @desc    Verify OTP Code
// @route   POST /api/auth/verify-otp
export const verifyOTP = async (req, res, next) => {
  try {
    const { email, otp } = req.body;

    const hashedOtp = crypto.createHash('sha256').update(otp).digest('hex');

    const user = await User.findOne({
      email,
      otpCode: hashedOtp,
      otpExpire: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(400).json({ success: false, message: 'Invalid or expired OTP code' });
    }

    user.isVerified = true;
    user.otpCode = undefined;
    user.otpExpire = undefined;
    await user.save();

    try {
      await sendEmail({
        email: user.email,
        subject: 'Welcome to Nova Ecommerce! 🎉',
        message: `Welcome ${user.name}! We are excited to have you join us.`,
        html: getWelcomeTemplate(user.name),
      });
    } catch (err) {
      console.error('Welcome email failed:', err.message);
    }

    sendTokenResponse(user, 200, res);
  } catch (error) {
    next(error);
  }
};

// @desc    Resend OTP Code
// @route   POST /api/auth/resend-otp
export const resendOTP = async (req, res, next) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ success: false, message: 'Email address is required' });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    if (user.isVerified) {
      return res.status(400).json({ success: false, message: 'Account is already verified' });
    }

    // Generate new OTP and update DB
    const otp = user.generateOTP();
    await user.save({ validateBeforeSave: false });

    // Send email via Nodemailer
    await sendEmail({
      email: user.email,
      subject: 'Verify Your Email OTP - Nova Ecommerce',
      message: `Your new verification code is: ${otp}`,
      html: getOtpTemplate(otp),
    });

    res.status(200).json({
      success: true,
      message: 'A new verification code has been sent to your email.',
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Login user
// @route   POST /api/auth/login
export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email }).select('+password');
    if (!user) {
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }

    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }

    sendTokenResponse(user, 200, res);
  } catch (error) {
    next(error);
  }
};

// @desc    Forgot Password Request
// @route   POST /api/auth/forgot-password
export const forgotPassword = async (req, res, next) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(200).json({
        success: true,
        message: 'If an account exists with this email, a reset link has been sent.',
      });
    }

    const resetToken = user.getResetPasswordToken();
    await user.save({ validateBeforeSave: false });

    const resetUrl = `${process.env.CLIENT_URL || 'http://localhost:5173'}/reset-password/${resetToken}`;

    try {
      await sendEmail({
        email: user.email,
        subject: 'Password Reset Request',
        message: `Reset your password here: ${resetUrl}`,
        html: getPasswordResetTemplate(resetUrl),
      });

      res.status(200).json({ success: true, message: 'Reset email sent successfully' });
    } catch (err) {
      user.resetPasswordToken = undefined;
      user.resetPasswordExpire = undefined;
      await user.save({ validateBeforeSave: false });
      return res.status(500).json({ success: false, message: 'Email could not be sent' });
    }
  } catch (error) {
    next(error);
  }
};

// @desc    Reset Password via Token
// @route   PUT /api/auth/reset-password/:resettoken
export const resetPassword = async (req, res, next) => {
  try {
    const resetPasswordToken = crypto
      .createHash('sha256')
      .update(req.params.resettoken)
      .digest('hex');

    const user = await User.findOne({
      resetPasswordToken,
      resetPasswordExpire: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(400).json({ success: false, message: 'Invalid or expired reset token' });
    }

    user.password = req.body.password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save();

    sendTokenResponse(user, 200, res);
  } catch (error) {
    next(error);
  }
};

// @desc    Change Password (Logged-In User)
// @route   PUT /api/auth/change-password
export const changePassword = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id).select('+password');

    const isMatch = await user.matchPassword(req.body.currentPassword);
    if (!isMatch) {
      return res.status(401).json({ success: false, message: 'Current password is incorrect' });
    }

    user.password = req.body.newPassword;
    await user.save();

    try {
      await sendEmail({
        email: user.email,
        subject: 'Security Alert: Password Changed',
        message: 'Your password was updated successfully.',
        html: getPasswordChangedTemplate(user.name),
      });
    } catch (err) {
      console.error('Password change alert failed:', err.message);
    }

    sendTokenResponse(user, 200, res);
  } catch (error) {
    next(error);
  }
};

// @desc    Get Current User Profile
// @route   GET /api/auth/me
export const getMe = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id).populate('store');
    res.status(200).json({ success: true, data: user });
  } catch (error) {
    next(error);
  }
};