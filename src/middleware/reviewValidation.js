const { body, validationResult } = require('express-validator');
const { errorResponse } = require('../utils/errors');

const reviewValidationRules = [
    body('film_id')
        .notEmpty().withMessage('Film ID is required')
        .isInt({ min: 1 }).withMessage('Film ID must be a valid number'),
    body('reviewer_name')
        .trim()
        .notEmpty().withMessage('Reviewer name is required')
        .isLength({ min: 2, max: 100 }).withMessage('Reviewer name must be between 2 and 100 characters')
        .matches(/^[a-zA-Z\s-]+$/).withMessage('Reviewer name cannot contain numbers or special characters'),
    body('rating')
        .notEmpty().withMessage('Rating is required')
        .isInt({ min: 1, max: 5 }).withMessage('Rating must be between 1 and 5'),
    body('comment')
        .optional({ nullable: true })
        .isLength({ max: 1000 }).withMessage('Comment cannot exceed 1000 characters')
];

const validate = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const details = errors.array().map(err => ({
            field: err.path,
            message: err.msg
        }));
        return errorResponse(res, 'VALIDATION_ERROR', 'Validation failed', details);
    }
    next();
};

module.exports = { reviewValidationRules, validate };
