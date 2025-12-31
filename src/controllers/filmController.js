const Film = require('../models/Film');
const { errorResponse, successResponse } = require('../utils/errors');

const filmController = {
    getAll(req, res) {
        try {
            const { limit, offset, search, sort, order, genre_id, min_year, max_year, min_duration, max_duration } = req.query;
            const films = Film.findAll({ limit, offset, search, sort, order, genre_id, min_year, max_year, min_duration, max_duration });
            return successResponse(res, films);
        } catch (error) {
            return errorResponse(res, 'INTERNAL_ERROR', error.message);
        }
    },

    getById(req, res) {
        try {
            const film = Film.findById(req.params.id);
            if (!film) {
                return errorResponse(res, 'NOT_FOUND', 'Film not found');
            }
            return successResponse(res, film);
        } catch (error) {
            return errorResponse(res, 'INTERNAL_ERROR', error.message);
        }
    },

    create(req, res) {
        try {
            const film = Film.create(req.body);
            return successResponse(res, film, 201);
        } catch (error) {
            return errorResponse(res, 'INTERNAL_ERROR', error.message);
        }
    },

    update(req, res) {
        try {
            const film = Film.findById(req.params.id);
            if (!film) {
                return errorResponse(res, 'NOT_FOUND', 'Film not found');
            }
            const updated = Film.update(req.params.id, req.body);
            return successResponse(res, updated);
        } catch (error) {
            return errorResponse(res, 'INTERNAL_ERROR', error.message);
        }
    },

    delete(req, res) {
        try {
            const deleted = Film.delete(req.params.id);
            if (!deleted) {
                return errorResponse(res, 'NOT_FOUND', 'Film not found');
            }
            return res.status(204).send();
        } catch (error) {
            return errorResponse(res, 'INTERNAL_ERROR', error.message);
        }
    }
};

module.exports = filmController;
