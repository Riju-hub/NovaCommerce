import User from '../models/User.js';
import { sendTokenResponse } from '../utils/generateToken.js';
import sendEmail from '../utils/sendEmail.js';
import { getWelcomeTemplate, getLoginAlertTemplate } from '../utils/emailTemplates.js';

export const register = async (req, res, next) => {
  try {
    const { name, email, password, role } = req.body;

    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ success: false, message: 'User already exists with this email' });
    }

    const user = await User.create({
      name,
      email,
      password,
      role: role || 'customer',
    });

    // 📧 Send Welcome Email on Account Creation
    try {
      await sendEmail({
        email: user.email,
        subject: 'Welcome to Nova Ecommerce! 🎉',
        message: `Welcome ${user.name}! We are excited to have you join us.`,
        html: getWelcomeTemplate(user.name),
      });
      console.log(`📧 Welcome email sent to ${user.email}`);
    } catch (emailErr) {
      console.error('❌ Failed to send welcome email:', emailErr.message);
    }

    sendTokenResponse(user, 201, res);
  } catch (error) {
    next(error);
  }
};

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

    // 📧 Send Login Notification Email
    try {
      const loginTime = new Date().toLocaleString();
      await sendEmail({
        email: user.email,
        subject: 'Security Alert: New Login Detected',
        message: `Hello ${user.name}, a new login was detected on ${loginTime}.`,
        html: getLoginAlertTemplate(user.name, loginTime),
      });
      console.log(`📧 Login notification sent to ${user.email}`);
    } catch (emailErr) {
      console.error('❌ Failed to send login notification:', emailErr.message);
    }

    sendTokenResponse(user, 200, res);
  } catch (error) {
    next(error);
  }
};

export const getMe = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id).populate('store');
    res.status(200).json({ success: true, data: user });
  } catch (error) {
    next(error);
  }
};