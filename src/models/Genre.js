const pool = require('../config/database');

class Genre {
    static async findAll() {
        const [rows] = await pool.query('SELECT * FROM genres ORDER BY id');
        return rows;
    }

    static async findById(id) {
        const [rows] = await pool.query('SELECT * FROM genres WHERE id = ?', [id]);
        return rows[0];
    }

    static async create(data) {
        const { name, description } = data;
        const [result] = await pool.query(
            'INSERT INTO genres (name, description) VALUES (?, ?)',
            [name, description]
        );
        return { id: result.insertId, name, description };
    }

    static async update(id, data) {
        const { name, description } = data;
        await pool.query(
            'UPDATE genres SET name = ?, description = ? WHERE id = ?',
            [name, description, id]
        );
        return this.findById(id);
    }

    static async delete(id) {
        const [result] = await pool.query('DELETE FROM genres WHERE id = ?', [id]);
        return result.affectedRows > 0;
    }
}

module.exports = Genre;
