const Genre = require('../models/Genre');
const { errorResponse, successResponse } = require('../utils/errors');

const genreController = {
    getAll(req, res) {
        try {
            const genres = Genre.findAll();
            return successResponse(res, genres);
        } catch (error) {
            return errorResponse(res, 'INTERNAL_ERROR', error.message);
        }
    },

    getById(req, res) {
        try {
            const genre = Genre.findById(req.params.id);
            if (!genre) {
                return errorResponse(res, 'NOT_FOUND', 'Genre not found');
            }
            return successResponse(res, genre);
        } catch (error) {
            return errorResponse(res, 'INTERNAL_ERROR', error.message);
        }
    },

    create(req, res) {
        try {
            const genre = Genre.create(req.body);
            return successResponse(res, genre, 201);
        } catch (error) {
            return errorResponse(res, 'INTERNAL_ERROR', error.message);
        }
    },

    update(req, res) {
        try {
            const genre = Genre.findById(req.params.id);
            if (!genre) {
                return errorResponse(res, 'NOT_FOUND', 'Genre not found');
            }
            const updated = Genre.update(req.params.id, req.body);
            return successResponse(res, updated);
        } catch (error) {
            return errorResponse(res, 'INTERNAL_ERROR', error.message);
        }
    },

    delete(req, res) {
        try {
            const deleted = Genre.delete(req.params.id);
            if (!deleted) {
                return errorResponse(res, 'NOT_FOUND', 'Genre not found');
            }
            return res.status(204).send();
        } catch (error) {
            return errorResponse(res, 'INTERNAL_ERROR', error.message);
        }
    }
};

module.exports = genreController;
