const Genre = require('../models/Genre');

const genreController = {
    async getAll(req, res) {
        try {
            const genres = await Genre.findAll();
            res.json(genres);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    async getById(req, res) {
        try {
            const genre = await Genre.findById(req.params.id);
            if (!genre) {
                return res.status(404).json({ error: 'Genre not found' });
            }
            res.json(genre);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    async create(req, res) {
        try {
            const genre = await Genre.create(req.body);
            res.status(201).json(genre);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    async update(req, res) {
        try {
            const genre = await Genre.findById(req.params.id);
            if (!genre) {
                return res.status(404).json({ error: 'Genre not found' });
            }
            const updated = await Genre.update(req.params.id, req.body);
            res.json(updated);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    async delete(req, res) {
        try {
            const deleted = await Genre.delete(req.params.id);
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
