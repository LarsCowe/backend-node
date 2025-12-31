const db = require('../config/database');

class Film {
    static ALLOWED_SORT_FIELDS = ['id', 'title', 'release_year', 'duration_minutes', 'created_at'];

    static findAll(options = {}) {
        const { limit, offset, search, sort, order, genre_id, min_year, max_year, min_duration, max_duration } = options;

        let query = `
            SELECT f.*, g.name as genre_name
            FROM films f
            LEFT JOIN genres g ON f.genre_id = g.id
        `;

        const params = [];
        const conditions = [];

        if (search) {
            conditions.push('f.title LIKE ?');
            params.push(`%${search}%`);
        }

        if (genre_id) {
            conditions.push('f.genre_id = ?');
            params.push(parseInt(genre_id));
        }

        if (min_year) {
            conditions.push('f.release_year >= ?');
            params.push(parseInt(min_year));
        }

        if (max_year) {
            conditions.push('f.release_year <= ?');
            params.push(parseInt(max_year));
        }

        if (min_duration) {
            conditions.push('f.duration_minutes >= ?');
            params.push(parseInt(min_duration));
        }

        if (max_duration) {
            conditions.push('f.duration_minutes <= ?');
            params.push(parseInt(max_duration));
        }

        if (conditions.length > 0) {
            query += ' WHERE ' + conditions.join(' AND ');
        }

        const sortField = this.ALLOWED_SORT_FIELDS.includes(sort) ? sort : 'id';
        const sortOrder = order?.toLowerCase() === 'desc' ? 'DESC' : 'ASC';
        query += ` ORDER BY f.${sortField} ${sortOrder}`;

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
            SELECT f.*, g.name as genre_name
            FROM films f
            LEFT JOIN genres g ON f.genre_id = g.id
            WHERE f.id = ?
        `).get(id);
    }

    static create(data) {
        const { title, description, release_year, duration_minutes, genre_id } = data;
        const result = db.prepare(
            'INSERT INTO films (title, description, release_year, duration_minutes, genre_id) VALUES (?, ?, ?, ?, ?)'
        ).run(title, description, release_year, duration_minutes, genre_id);
        return this.findById(result.lastInsertRowid);
    }

    static update(id, data) {
        const { title, description, release_year, duration_minutes, genre_id } = data;
        db.prepare(
            'UPDATE films SET title = ?, description = ?, release_year = ?, duration_minutes = ?, genre_id = ? WHERE id = ?'
        ).run(title, description, release_year, duration_minutes, genre_id, id);
        return this.findById(id);
    }

    static delete(id) {
        const result = db.prepare('DELETE FROM films WHERE id = ?').run(id);
        return result.changes > 0;
    }
}

module.exports = Film;
