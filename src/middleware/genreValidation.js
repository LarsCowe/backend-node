const { body, validationResult } = require('express-validator');
const { errorResponse } = require('../utils/errors');

const genreValidationRules = [
    body('name')
        .trim()
        .notEmpty().withMessage('Name is required')
        .matches(/^[a-zA-Z\s-]+$/).withMessage('Name cannot contain numbers or special characters')
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

module.exports = { genreValidationRules, validate };
