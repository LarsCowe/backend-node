const db = require('../config/database');

class Review {
    static ALLOWED_SORT_FIELDS = ['id', 'rating', 'created_at'];

    static findAll(options = {}) {
        const { limit, offset, sort, order, film_id, min_rating, max_rating } = options;

        let query = `
            SELECT r.*, f.title as film_title
            FROM reviews r
            LEFT JOIN films f ON r.film_id = f.id
        `;

        const params = [];
        const conditions = [];

        if (film_id) {
            conditions.push('r.film_id = ?');
            params.push(parseInt(film_id));
        }

        if (min_rating) {
            conditions.push('r.rating >= ?');
            params.push(parseInt(min_rating));
        }

        if (max_rating) {
            conditions.push('r.rating <= ?');
            params.push(parseInt(max_rating));
        }

        if (conditions.length > 0) {
            query += ' WHERE ' + conditions.join(' AND ');
        }

        const sortField = this.ALLOWED_SORT_FIELDS.includes(sort) ? sort : 'created_at';
        const sortOrder = order?.toLowerCase() === 'asc' ? 'ASC' : 'DESC';
        query += ` ORDER BY r.${sortField} ${sortOrder}`;

        if (limit) {
            query += ' LIMIT ?';
            params.push(parseInt(limit));

            if (offset) {
                query += ' OFFSET ?';
                params.push(parseInt(offset));
            }
        }

        return db.prepare(query).all(...params);
    }

    static findById(id) {
        return db.prepare(`
            SELECT r.*, f.title as film_title
            FROM reviews r
            LEFT JOIN films f ON r.film_id = f.id
            WHERE r.id = ?
        `).get(id);
    }

    static findByFilmId(filmId, options = {}) {
        const { limit, offset, sort, order } = options;

        let query = `
            SELECT * FROM reviews
            WHERE film_id = ?
        `;

        const params = [filmId];

        const sortField = this.ALLOWED_SORT_FIELDS.includes(sort) ? sort : 'created_at';
        const sortOrder = order?.toLowerCase() === 'asc' ? 'ASC' : 'DESC';
        query += ` ORDER BY ${sortField} ${sortOrder}`;

        if (limit) {
            query += ' LIMIT ?';
            params.push(parseInt(limit));

            if (offset) {
                query += ' OFFSET ?';
                params.push(parseInt(offset));
            }
        }

        return db.prepare(query).all(...params);
    }

    static create(data) {
        const { film_id, reviewer_name, rating, comment } = data;
        const result = db.prepare(
            'INSERT INTO reviews (film_id, reviewer_name, rating, comment) VALUES (?, ?, ?, ?)'
        ).run(film_id, reviewer_name, rating, comment);
        return this.findById(result.lastInsertRowid);
    }

    static update(id, data) {
        const { film_id, reviewer_name, rating, comment } = data;
        db.prepare(
            'UPDATE reviews SET film_id = ?, reviewer_name = ?, rating = ?, comment = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?'
        ).run(film_id, reviewer_name, rating, comment, id);
        return this.findById(id);
    }

    static delete(id) {
        const result = db.prepare('DELETE FROM reviews WHERE id = ?').run(id);
        return result.changes > 0;
    }
}

module.exports = Review;
