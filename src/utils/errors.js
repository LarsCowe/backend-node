const ERROR_CODES = {
    NOT_FOUND: { status: 404, message: 'Resource not found' },
    VALIDATION_ERROR: { status: 400, message: 'Validation failed' },
    INTERNAL_ERROR: { status: 500, message: 'Internal server error' }
};

const errorResponse = (res, code, message = null, details = null) => {
    const errorConfig = ERROR_CODES[code] || { status: 500, message: 'Unknown error' };

    const response = {
        success: false,
        error: {
            code,
            message: message || errorConfig.message
        }
    };

    if (details) {
        response.error.details = details;
    }

    return res.status(errorConfig.status).json(response);
};

const successResponse = (res, data, status = 200) => {
    return res.status(status).json({
        success: true,
        data
    });
};

module.exports = { errorResponse, successResponse, ERROR_CODES };
