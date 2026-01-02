const Review = require('../models/Review');
const Film = require('../models/Film');
const { errorResponse, successResponse } = require('../utils/errors');

const reviewController = {
    getAll(req, res) {
        try {
            const { limit, offset, sort, order, film_id, min_rating, max_rating } = req.query;
            const reviews = Review.findAll({ limit, offset, sort, order, film_id, min_rating, max_rating });
            return successResponse(res, reviews);
        } catch (error) {
            return errorResponse(res, 'INTERNAL_ERROR', error.message);
        }
    },

    getById(req, res) {
        try {
            const review = Review.findById(req.params.id);
            if (!review) {
                return errorResponse(res, 'NOT_FOUND', 'Review not found');
            }
            return successResponse(res, review);
        } catch (error) {
            return errorResponse(res, 'INTERNAL_ERROR', error.message);
        }
    },

    getByFilmId(req, res) {
        try {
            const film = Film.findById(req.params.id);
            if (!film) {
                return errorResponse(res, 'NOT_FOUND', 'Film not found');
            }
            const { limit, offset, sort, order } = req.query;
            const reviews = Review.findByFilmId(req.params.id, { limit, offset, sort, order });
            return successResponse(res, reviews);
        } catch (error) {
            return errorResponse(res, 'INTERNAL_ERROR', error.message);
        }
    },

    create(req, res) {
        try {
            const film = Film.findById(req.body.film_id);
            if (!film) {
                return errorResponse(res, 'NOT_FOUND', 'Film not found');
            }
            const review = Review.create(req.body);
            return successResponse(res, review, 201);
        } catch (error) {
            return errorResponse(res, 'INTERNAL_ERROR', error.message);
        }
    },

    update(req, res) {
        try {
            const review = Review.findById(req.params.id);
            if (!review) {
                return errorResponse(res, 'NOT_FOUND', 'Review not found');
            }
            if (req.body.film_id) {
                const film = Film.findById(req.body.film_id);
                if (!film) {
                    return errorResponse(res, 'NOT_FOUND', 'Film not found');
                }
            }
            const updated = Review.update(req.params.id, req.body);
            return successResponse(res, updated);
        } catch (error) {
            return errorResponse(res, 'INTERNAL_ERROR', error.message);
        }
    },

    delete(req, res) {
        try {
            const deleted = Review.delete(req.params.id);
            if (!deleted) {
                return errorResponse(res, 'NOT_FOUND', 'Review not found');
            }
            return res.status(204).send();
        } catch (error) {
            return errorResponse(res, 'INTERNAL_ERROR', error.message);
        }
    }
};

module.exports = reviewController;
