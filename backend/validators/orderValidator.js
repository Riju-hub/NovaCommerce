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

export const createOrderValidation = [
  body('orderItems')
    .isArray({ min: 1 })
    .withMessage('Order must contain at least one item'),

  body('orderItems.*.product')
    .notEmpty()
    .isMongoId()
    .withMessage('Valid Product ID is required for each order item'),

  body('orderItems.*.store')
    .notEmpty()
    .isMongoId()
    .withMessage('Valid Store ID is required for each order item'),

  body('orderItems.*.quantity')
    .isInt({ min: 1 })
    .withMessage('Quantity must be at least 1'),

  body('orderItems.*.price')
    .isFloat({ min: 0 })
    .withMessage('Price must be a positive number'),

  body('shippingAddress.street')
    .notEmpty()
    .withMessage('Street address is required'),

  body('shippingAddress.city')
    .notEmpty()
    .withMessage('City is required'),

  body('shippingAddress.state')
    .notEmpty()
    .withMessage('State is required'),

  body('shippingAddress.zipCode')
    .notEmpty()
    .withMessage('Zip / Postal code is required'),

  body('shippingAddress.country')
    .notEmpty()
    .withMessage('Country is required'),

  body('paymentMethod')
    .notEmpty()
    .withMessage('Payment method is required'),

  validate,
];