const Genre = require('../models/Genre');

const genreController = {
    getAll(req, res) {
        try {
            const genres = Genre.findAll();
            res.json(genres);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    getById(req, res) {
        try {
            const genre = Genre.findById(req.params.id);
            if (!genre) {
                return res.status(404).json({ error: 'Genre not found' });
            }
            res.json(genre);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    create(req, res) {
        try {
            const genre = Genre.create(req.body);
            res.status(201).json(genre);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    update(req, res) {
        try {
            const genre = Genre.findById(req.params.id);
            if (!genre) {
                return res.status(404).json({ error: 'Genre not found' });
            }
            const updated = Genre.update(req.params.id, req.body);
            res.json(updated);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    delete(req, res) {
        try {
            const deleted = Genre.delete(req.params.id);
            if (!deleted) {
                return res.status(404).json({ error: 'Genre not found' });
            }
            res.status(204).send();
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
};

module.exports = genreController;
