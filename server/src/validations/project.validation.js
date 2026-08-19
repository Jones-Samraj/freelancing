import { body } from 'express-validator';

export const createProjectValidation = [
  body('title')
    .trim()
    .notEmpty().withMessage('Project title is required')
    .isLength({ min: 5, max: 255 }).withMessage('Title must be between 5 and 255 characters'),
  body('project_type')
    .trim()
    .notEmpty().withMessage('Project type is required')
    .isIn(['build', 'support', 'maintenance', 'bug_fix', 'improvement', 'consulting', 'other'])
    .withMessage('Invalid project type'),
  body('description')
    .trim()
    .notEmpty().withMessage('Project description is required')
    .isLength({ min: 10 }).withMessage('Description must be at least 10 characters long'),
  body('budget_min')
    .optional()
    .isNumeric().withMessage('Minimum budget must be a number'),
  body('budget_max')
    .optional()
    .isNumeric().withMessage('Maximum budget must be a number'),
  body('budget_type')
    .optional()
    .isIn(['fixed', 'hourly']).withMessage('Budget type must be fixed or hourly'),
  body('currency')
    .optional()
    .isLength({ min: 2, max: 10 }).withMessage('Currency code must be 2-10 characters')
];

export const updateProjectStatusValidation = [
  body('status')
    .notEmpty().withMessage('Status is required')
    .isIn(['draft', 'submitted', 'under_review', 'quotation_sent', 'approved', 'in_progress', 'completed', 'cancelled', 'rejected'])
    .withMessage('Invalid project status')
];
