const Film = require('../models/Film');

const filmController = {
    async getAll(req, res) {
        try {
            const { limit, offset } = req.query;
            const films = await Film.findAll({ limit, offset });
            res.json(films);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    async getById(req, res) {
        try {
            const film = await Film.findById(req.params.id);
            if (!film) {
                return res.status(404).json({ error: 'Film not found' });
            }
            res.json(film);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    async create(req, res) {
        try {
            const film = await Film.create(req.body);
            res.status(201).json(film);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    async update(req, res) {
        try {
            const film = await Film.findById(req.params.id);
            if (!film) {
                return res.status(404).json({ error: 'Film not found' });
            }
            const updated = await Film.update(req.params.id, req.body);
            res.json(updated);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    async delete(req, res) {
        try {
            const deleted = await Film.delete(req.params.id);
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
