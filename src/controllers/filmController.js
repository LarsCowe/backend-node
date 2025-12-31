const Film = require('../models/Film');

const filmController = {
    getAll(req, res) {
        try {
            const { limit, offset, search, sort, order, genre_id, min_year, max_year, min_duration, max_duration } = req.query;
            const films = Film.findAll({ limit, offset, search, sort, order, genre_id, min_year, max_year, min_duration, max_duration });
            res.json(films);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    getById(req, res) {
        try {
            const film = Film.findById(req.params.id);
            if (!film) {
                return res.status(404).json({ error: 'Film not found' });
            }
            res.json(film);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    create(req, res) {
        try {
            const film = Film.create(req.body);
            res.status(201).json(film);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    update(req, res) {
        try {
            const film = Film.findById(req.params.id);
            if (!film) {
                return res.status(404).json({ error: 'Film not found' });
            }
            const updated = Film.update(req.params.id, req.body);
            res.json(updated);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    delete(req, res) {
        try {
            const deleted = Film.delete(req.params.id);
            if (!deleted) {
                return res.status(404).json({ error: 'Film not found' });
            }
            res.status(204).send();
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
};

module.exports = filmController;
