import { body } from 'express-validator';

export const createQuotationValidation = [
  body('project_id')
    .notEmpty().withMessage('Project ID is required')
    .isInt().withMessage('Project ID must be an integer'),
  body('title')
    .trim()
    .notEmpty().withMessage('Quotation title is required'),
  body('items')
    .isArray({ min: 1 }).withMessage('At least one quotation item is required'),
  body('items.*.title')
    .trim()
    .notEmpty().withMessage('Item title is required'),
  body('items.*.quantity')
    .isInt({ min: 1 }).withMessage('Item quantity must be at least 1'),
  body('items.*.unit_price')
    .isNumeric().withMessage('Item unit price must be a valid number'),
  body('tax')
    .optional()
    .isNumeric().withMessage('Tax must be a valid number'),
  body('discount')
    .optional()
    .isNumeric().withMessage('Discount must be a valid number')
];

export const respondQuotationValidation = [
  body('status')
    .notEmpty().withMessage('Response status is required')
    .isIn(['accepted', 'rejected']).withMessage('Status must be accepted or rejected')
];
