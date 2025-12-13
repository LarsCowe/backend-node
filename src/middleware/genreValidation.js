const { body, validationResult } = require('express-validator');

const genreValidationRules = [
    body('name')
        .trim()
        .notEmpty().withMessage('Name is required')
        .matches(/^[a-zA-Z\s-]+$/).withMessage('Name cannot contain numbers or special characters')
];

const validate = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
};

module.exports = { genreValidationRules, validate };
