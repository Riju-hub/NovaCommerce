
import { body, validationResult } from 'express-validator';

export const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const errorArray = errors.array();
    return res.status(400).json({
      success: false,
      message: errorArray[0].msg, // Formatted message for Redux error reducer
      errors: errorArray.map((err) => ({
        field: err.path || err.param,
        message: err.msg,
      })),
    });
  }
  next();
};

export const registerValidation = [
  body('name')
    .trim()
    .notEmpty()
    .withMessage('Name is required')
    .isLength({ max: 50 })
    .withMessage('Name cannot exceed 50 characters'),

  body('email')
    .trim()
    .notEmpty()
    .withMessage('Email is required')
    .isEmail()
    .withMessage('Please enter a valid email address'),

  body('password')
    .notEmpty()
    .withMessage('Password is required')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters long'),

  body('role')
    .optional()
    .isIn(['customer', 'vendor'])
    .withMessage('Role must be either customer or vendor'),

  validate,
];

// Added missing loginValidation export
export const loginValidation = [
  body('email')
    .trim()
    .notEmpty()
    .withMessage('Email is required')
    .isEmail()
    .withMessage('Please enter a valid email address'),

  body('password')
    .notEmpty()
    .withMessage('Password is required'),

  validate,
];

// Added missing updateProfileValidation export
export const updateProfileValidation = [
  body('name')
    .optional()
    .trim()
    .isLength({ max: 50 })
    .withMessage('Name cannot exceed 50 characters'),

  body('email')
    .optional()
    .trim()
    .isEmail()
    .withMessage('Please enter a valid email address'),

  body('phone')
    .optional()
    .trim()
    .isMobilePhone()
    .withMessage('Please provide a valid phone number'),

  validate,
];