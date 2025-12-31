const { body, validationResult } = require('express-validator');
const { errorResponse } = require('../utils/errors');

const filmValidationRules = [
    body('title')
        .trim()
        .notEmpty().withMessage('Title is required'),
    body('release_year')
        .optional({ nullable: true })
        .isInt({ min: 1888, max: new Date().getFullYear() })
        .withMessage('Release year must be a valid year'),
    body('duration_minutes')
        .optional({ nullable: true })
        .isInt({ min: 1 })
        .withMessage('Duration must be a positive number'),
    body('genre_id')
        .optional({ nullable: true })
        .isInt({ min: 1 })
        .withMessage('Genre ID must be a valid number')
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

module.exports = { filmValidationRules, validate };
