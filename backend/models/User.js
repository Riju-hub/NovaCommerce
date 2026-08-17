
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please enter your name'],
      trim: true,
      maxlength: [50, 'Name cannot exceed 50 characters'],
    },
    email: {
      type: String,
      required: [true, 'Please enter an email address'],
      unique: true,
      lowercase: true,
      trim: true,
      match: [
        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
        'Please enter a valid email address',
      ],
    },
    password: {
      type: String,
      required: [true, 'Please enter a password'],
      minlength: [6, 'Password must be at least 6 characters'],
      select: false,
    },
    role: {
      type: String,
      enum: ['customer', 'vendor', 'admin'],
      default: 'customer',
    },
    avatar: {
      type: String,
      default: 'https://via.placeholder.com/150',
    },
    phone: {
      type: String,
      default: '',
    },
    address: {
      street: { type: String, default: '' },
      city: { type: String, default: '' },
      state: { type: String, default: '' },
      zipCode: { type: String, default: '' },
      country: { type: String, default: '' },
    },
    store: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Store',
      default: null,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    otpCode: String,
    otpExpire: Date,
    resetPasswordToken: String,
    resetPasswordExpire: Date,
  },
  {
    timestamps: true,
  }
);

// TTL Index: Auto-delete unverified accounts 10 minutes after creation
userSchema.index(
  { createdAt: 1 },
  { expireAfterSeconds: 600, partialFilterExpression: { isVerified: false } }
);

// Hash password BEFORE saving (Only if modified)
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    return;
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

// Compare password
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// Generate JWT Token
userSchema.methods.getSignedJwtToken = function () {
  return jwt.sign(
    { id: this._id, role: this.role },
    process.env.JWT_SECRET || 'fallbacksecret',
    { expiresIn: process.env.JWT_EXPIRE || '30d' }
  );
};

// Generate 6-digit OTP for email verification
userSchema.methods.generateOTP = function () {
  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  
  // Hash OTP for DB storage
  this.otpCode = crypto.createHash('sha256').update(otp).digest('hex');
  this.otpExpire = new Date(Date.now() + 10 * 60 * 1000); // 10 mins

  return otp; // Plaintext OTP to send via Nodemailer
};

// Generate and hash password reset token
userSchema.methods.getResetPasswordToken = function () {
  const resetToken = crypto.randomBytes(32).toString('hex');

  this.resetPasswordToken = crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex');

  this.resetPasswordExpire = new Date(Date.now() + 10 * 60 * 1000);

  return resetToken;
};

const User = mongoose.model('User', userSchema);

export default User;