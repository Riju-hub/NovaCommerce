import { body, validationResult } from 'express-validator';

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      errors: errors.array().map((err) => ({
        field: err.path,
        message: err.msg,
      })),
    });
  }
  next();
};

export const storeSetupValidation = [
  body('name')
    .trim()
    .notEmpty()
    .withMessage('Store name is required')
    .isLength({ max: 50 })
    .withMessage('Store name cannot exceed 50 characters'),

  body('description')
    .optional()
    .trim()
    .isLength({ max: 500 })
    .withMessage('Description cannot exceed 500 characters'),

  body('bankDetails.accountHolderName')
    .optional()
    .trim()
    .notEmpty()
    .withMessage('Account holder name cannot be empty'),

  body('bankDetails.accountNumber')
    .optional()
    .trim()
    .notEmpty()
    .withMessage('Account number cannot be empty'),

  body('bankDetails.bankName')
    .optional()
    .trim()
    .notEmpty()
    .withMessage('Bank name cannot be empty'),

  validate,
];

export const updateStoreValidation = [
  body('name')
    .optional()
    .trim()
    .isLength({ max: 50 })
    .withMessage('Store name cannot exceed 50 characters'),

  body('description')
    .optional()
    .trim()
    .isLength({ max: 500 })
    .withMessage('Description cannot exceed 500 characters'),

  validate,
];