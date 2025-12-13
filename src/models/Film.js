const db = require('../config/database');

class Film {
    static findAll(options = {}) {
        const { limit, offset, search } = options;

        let query = `
            SELECT f.*, g.name as genre_name
            FROM films f
            LEFT JOIN genres g ON f.genre_id = g.id
        `;

        const params = [];

        if (search) {
            query += ' WHERE f.title LIKE ?';
            params.push(`%${search}%`);
        }

        query += ' ORDER BY f.id';

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
