
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

//     const emailCheck = await verifyEmailExistence(email);
//     if (!emailCheck.isValid) {
//       return res.status(400).json({
//         success: false,
//         exists: false,
//         message: emailCheck.reason,
//       });
//     }

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
// // export const register = async (req, res, next) => {
// //   try {
// //     const { name, email, password, role } = req.body;

// //     const userExists = await User.findOne({ email });
// //     if (userExists) {
// //       return res.status(400).json({ success: false, message: 'User already exists with this email' });
// //     }

// //     const emailCheck = await verifyEmailExistence(email);
// //     if (!emailCheck.isValid) {
// //       return res.status(400).json({
// //         success: false,
// //         message: emailCheck.reason,
// //       });
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

// // @desc    Register User & Send OTP
// // @route   POST /api/auth/register
// // export const register = async (req, res, next) => {
// //   try {
// //     const { name, email, password, role } = req.body;

// //     const userExists = await User.findOne({ email });
    
// //     // If user exists and is already verified, block registration
// //     if (userExists && userExists.isVerified) {
// //       return res.status(400).json({ 
// //         success: false, 
// //         message: 'An account with this email is already verified. Please sign in.' 
// //       });
// //     }

// //     // If unverified account exists from a previous attempt, remove it to reset the state
// //     if (userExists && !userExists.isVerified) {
// //       await User.deleteOne({ _id: userExists._id });
// //     }

// //     const emailCheck = await verifyEmailExistence(email);
// //     if (!emailCheck.isValid) {
// //       return res.status(400).json({
// //         success: false,
// //         message: emailCheck.reason,
// //       });
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

// //       return res.status(201).json({
// //         success: true,
// //         message: 'Account created! Please verify your email using the OTP sent.',
// //         email: user.email,
// //       });
// //     } catch (emailErr) {
// //       // Delete temporary user record if sending the email fails
// //       await User.deleteOne({ _id: user._id });
// //       return res.status(500).json({ 
// //         success: false, 
// //         message: 'Verification email could not be sent. Please try again.' 
// //       });
// //     }
// //   } catch (error) {
// //     next(error);
// //   }
// // };

// export const register = async (req, res, next) => {
//   try {
//     const { name, email, password, role } = req.body;

//     const userExists = await User.findOne({ email });

//     // Block if account exists AND is already verified
//     if (userExists && userExists.isVerified) {
//       return res.status(400).json({ 
//         success: false, 
//         message: 'User already exists and is verified. Please sign in.' 
//       });
//     }

//     // Delete existing unverified document to allow fresh OTP registration
//     if (userExists && !userExists.isVerified) {
//       await User.deleteOne({ _id: userExists._id });
//     }

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

//       return res.status(201).json({
//         success: true,
//         message: 'Account created! Please verify your email using the OTP sent.',
//         email: user.email,
//       });
//     } catch (emailErr) {
//       // Rollback database creation if email dispatch fails
//       await User.deleteOne({ _id: user._id });
//       return res.status(500).json({ 
//         success: false, 
//         message: 'Verification email could not be sent. Please try again.' 
//       });
//     }
//   } catch (error) {
//     next(error);
//   }
// };

// // @desc    Verify OTP Code
// // @route   POST /api/auth/verify-otp
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

// // export const verifyOTP = async (req, res, next) => {
// //   try {
// //     const { email, otp } = req.body;

// //     if (!email || !otp) {
// //       return res.status(400).json({ success: false, message: 'Email and OTP code are required' });
// //     }

// //     const hashedOtp = crypto.createHash('sha256').update(otp.trim()).digest('hex');

// //     const user = await User.findOne({
// //       email: email.toLowerCase().trim(),
// //       otpCode: hashedOtp,
// //       otpExpire: { $gt: Date.now() },
// //     });

// //     if (!user) {
// //       return res.status(400).json({ success: false, message: 'Invalid or expired OTP code' });
// //     }

// //     user.isVerified = true;
// //     user.otpCode = undefined;
// //     user.otpExpire = undefined;
// //     await user.save({ validateBeforeSave: false });

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

// //     return sendTokenResponse(user, 200, res);
// //   } catch (error) {
// //     next(error);
// //   }
// // };

// // @desc    Verify OTP Code
// export const verifyOTP = async (req, res, next) => {
//   try {
//     const { email, otp } = req.body;

//     if (!email || !otp) {
//       return res.status(400).json({ success: false, message: 'Email and OTP code are required' });
//     }

//     const cleanEmail = email.toLowerCase().trim();
//     const cleanOtp = otp.toString().trim();
    
//     // Hash incoming plaintext OTP to compare with DB
//     const hashedOtp = crypto.createHash('sha256').update(cleanOtp).digest('hex');

//     const user = await User.findOne({
//       email: cleanEmail,
//       otpCode: hashedOtp,
//       otpExpire: { $gt: Date.now() },
//     });

//     if (!user) {
//       return res.status(400).json({ success: false, message: 'Invalid or expired OTP code' });
//     }

//     user.isVerified = true;
//     user.otpCode = undefined;
//     user.otpExpire = undefined;
    
//     // Save without triggering password re-hashes or validation checks
//     await user.save({ validateBeforeSave: false });

//     // Send JWT response
//     sendTokenResponse(user, 200, res);
//   } catch (error) {
//     next(error);
//   }
// };

// // @desc    Resend OTP Code
// // @route   POST /api/auth/resend-otp
// export const resendOTP = async (req, res, next) => {
//   try {
//     const { email } = req.body;

//     if (!email) {
//       return res.status(400).json({ success: false, message: 'Email address is required' });
//     }

//     const user = await User.findOne({ email });

//     if (!user) {
//       return res.status(404).json({ success: false, message: 'User not found' });
//     }

//     if (user.isVerified) {
//       return res.status(400).json({ success: false, message: 'Account is already verified' });
//     }

//     // Generate new OTP and update DB
//     const otp = user.generateOTP();
//     await user.save({ validateBeforeSave: false });

//     // Send email via Nodemailer
//     await sendEmail({
//       email: user.email,
//       subject: 'Verify Your Email OTP - Nova Ecommerce',
//       message: `Your new verification code is: ${otp}`,
//       html: getOtpTemplate(otp),
//     });

//     res.status(200).json({
//       success: true,
//       message: 'A new verification code has been sent to your email.',
//     });
//   } catch (error) {
//     next(error);
//   }
// };

// // @desc    Login user
// // @route   POST /api/auth/login
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

//     if (!user.isVerified) {
//       return res.status(403).json({
//         success: false,
//         isVerified: false,
//         message: 'Account is not verified. Please complete OTP verification.',
//         email: user.email,
//       });
//     }

//     return sendTokenResponse(user, 200, res);
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

    const cleanEmail = email.toLowerCase().trim();

    const emailCheck = await verifyEmailExistence(cleanEmail);
    if (!emailCheck.isValid) {
      return res.status(400).json({
        success: false,
        exists: false,
        message: emailCheck.reason,
      });
    }

    const user = await User.findOne({ email: cleanEmail });

    return res.status(200).json({
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

    if (!name || !email || !password) {
      return res.status(400).json({ success: false, message: 'Please provide all required fields' });
    }

    const cleanEmail = email.toLowerCase().trim();

    const userExists = await User.findOne({ email: cleanEmail });

    // Block if account exists AND is already verified
    if (userExists && userExists.isVerified) {
      return res.status(400).json({ 
        success: false, 
        message: 'User already exists and is verified. Please sign in.' 
      });
    }

    // Delete existing unverified document to allow fresh OTP registration
    if (userExists && !userExists.isVerified) {
      await User.deleteOne({ _id: userExists._id });
    }

    const emailCheck = await verifyEmailExistence(cleanEmail);
    if (!emailCheck.isValid) {
      return res.status(400).json({
        success: false,
        message: emailCheck.reason,
      });
    }

    const user = new User({
      name: name.trim(),
      email: cleanEmail,
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

      return res.status(201).json({
        success: true,
        message: 'Account created! Please verify your email using the OTP sent.',
        email: user.email,
      });
    } catch (emailErr) {
      console.error('SMTP Email Error:', emailErr);
      
      // Rollback database creation if email dispatch fails
      await User.deleteOne({ _id: user._id }).catch(() => {});
      
      return res.status(400).json({ 
        success: false, 
        message: 'Verification email could not be sent. Check your SMTP settings or Gmail App Password.' 
      });
    }
  } catch (error) {
    console.error('Registration Route Error:', error);
    return res.status(500).json({
      success: false,
      message: error.message || 'Internal Server Error during registration',
    });
  }
};

// @desc    Verify OTP Code
// @route   POST /api/auth/verify-otp
export const verifyOTP = async (req, res, next) => {
  try {
    const { email, otp } = req.body;

    if (!email || !otp) {
      return res.status(400).json({ success: false, message: 'Email and OTP code are required' });
    }

    const cleanEmail = email.toLowerCase().trim();
    const cleanOtp = otp.toString().trim();
    
    // Hash incoming plaintext OTP to compare with DB
    const hashedOtp = crypto.createHash('sha256').update(cleanOtp).digest('hex');

    const user = await User.findOne({
      email: cleanEmail,
      otpCode: hashedOtp,
      otpExpire: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(400).json({ success: false, message: 'Invalid or expired OTP code' });
    }

    user.isVerified = true;
    user.otpCode = undefined;
    user.otpExpire = undefined;
    
    // Save without triggering password re-hashes or validation checks
    await user.save({ validateBeforeSave: false });

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

    return sendTokenResponse(user, 200, res);
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

    const cleanEmail = email.toLowerCase().trim();
    const user = await User.findOne({ email: cleanEmail });

    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    if (user.isVerified) {
      return res.status(400).json({ success: false, message: 'Account is already verified' });
    }

    const otp = user.generateOTP();
    await user.save({ validateBeforeSave: false });

    await sendEmail({
      email: user.email,
      subject: 'Verify Your Email OTP - Nova Ecommerce',
      message: `Your new verification code is: ${otp}`,
      html: getOtpTemplate(otp),
    });

    return res.status(200).json({
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

    if (!email || !password) {
      return res.status(400).json({ success: false, message: 'Please provide email and password' });
    }

    const cleanEmail = email.toLowerCase().trim();

    const user = await User.findOne({ email: cleanEmail }).select('+password');
    if (!user) {
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }

    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }

    if (!user.isVerified) {
      return res.status(403).json({
        success: false,
        isVerified: false,
        message: 'Account is not verified. Please complete OTP verification.',
        email: user.email,
      });
    }

    return sendTokenResponse(user, 200, res);
  } catch (error) {
    next(error);
  }
};

// @desc    Forgot Password Request
// @route   POST /api/auth/forgot-password
export const forgotPassword = async (req, res, next) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({ success: false, message: 'Please enter an email' });
    }

    const cleanEmail = email.toLowerCase().trim();
    const user = await User.findOne({ email: cleanEmail });

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

      return res.status(200).json({ success: true, message: 'Reset email sent successfully' });
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

    return sendTokenResponse(user, 200, res);
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

    return sendTokenResponse(user, 200, res);
  } catch (error) {
    next(error);
  }
};

// @desc    Get Current User Profile
// @route   GET /api/auth/me
export const getMe = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id).populate('store');
    return res.status(200).json({ success: true, data: user });
  } catch (error) {
    next(error);
  }
};