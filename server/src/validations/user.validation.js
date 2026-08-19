import { body } from 'express-validator';

export const updateProfileValidation = [
  body('name')
    .optional()
    .trim()
    .isLength({ min: 2, max: 100 }).withMessage('Name must be between 2 and 100 characters'),
  body('display_name')
    .optional({ nullable: true })
    .trim(),
  body('bio')
    .optional({ nullable: true })
    .trim(),
  body('company_name')
    .optional({ nullable: true })
    .trim(),
  body('company_website')
    .optional({ nullable: true })
    .trim(),
  body('phone')
    .optional({ nullable: true })
    .trim(),
  body('city')
    .optional({ nullable: true })
    .trim(),
  body('state')
    .optional({ nullable: true })
    .trim(),
  body('country_id')
    .optional({ nullable: true })
    .isInt().withMessage('Country ID must be an integer')
];

export const changePasswordValidation = [
  body('currentPassword')
    .notEmpty().withMessage('Current password is required'),
  body('newPassword')
    .notEmpty().withMessage('New password is required')
    .isLength({ min: 6 }).withMessage('New password must be at least 6 characters long')
];
