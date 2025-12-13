const pool = require('../config/database');

class Film {
    static async findAll(options = {}) {
        const { limit, offset } = options;

        let query = `
            SELECT f.*, g.name as genre_name
            FROM films f
            LEFT JOIN genres g ON f.genre_id = g.id
            ORDER BY f.id
        `;

        const params = [];

        if (limit) {
            query += ' LIMIT ?';
            params.push(parseInt(limit));

            if (offset) {
                query += ' OFFSET ?';
                params.push(parseInt(offset));
            }
        }

        const [rows] = await pool.query(query, params);
        return rows;
    }

    static async findById(id) {
        const [rows] = await pool.query(`
            SELECT f.*, g.name as genre_name
            FROM films f
            LEFT JOIN genres g ON f.genre_id = g.id
            WHERE f.id = ?
        `, [id]);
        return rows[0];
    }

    static async create(data) {
        const { title, description, release_year, duration_minutes, genre_id } = data;
        const [result] = await pool.query(
            'INSERT INTO films (title, description, release_year, duration_minutes, genre_id) VALUES (?, ?, ?, ?, ?)',
            [title, description, release_year, duration_minutes, genre_id]
        );
        return this.findById(result.insertId);
    }

    static async update(id, data) {
        const { title, description, release_year, duration_minutes, genre_id } = data;
        await pool.query(
            'UPDATE films SET title = ?, description = ?, release_year = ?, duration_minutes = ?, genre_id = ? WHERE id = ?',
            [title, description, release_year, duration_minutes, genre_id, id]
        );
        return this.findById(id);
    }

    static async delete(id) {
        const [result] = await pool.query('DELETE FROM films WHERE id = ?', [id]);
        return result.affectedRows > 0;
    }
}

module.exports = Film;
