const db = require('../config/database');
const { successResponse, errorResponse } = require('../utils/errors');
const pkg = require('../../package.json');

const healthController = {
    check(req, res) {
        try {
            // Test database connection
            db.prepare('SELECT 1').get();

            return successResponse(res, {
                status: 'healthy',
                timestamp: new Date().toISOString(),
                uptime: Math.floor(process.uptime()),
                version: pkg.version,
                database: {
                    status: 'connected'
                }
            });
        } catch (error) {
            return errorResponse(res, 'INTERNAL_ERROR', 'Database unavailable');
        }
    }
};

module.exports = healthController;
