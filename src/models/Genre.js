const db = require('../config/database');

class Genre {
    static findAll() {
        return db.prepare('SELECT * FROM genres ORDER BY id').all();
    }

    static findById(id) {
        return db.prepare('SELECT * FROM genres WHERE id = ?').get(id);
    }

    static create(data) {
        const { name, description } = data;
        const result = db.prepare(
            'INSERT INTO genres (name, description) VALUES (?, ?)'
        ).run(name, description);
        return this.findById(result.lastInsertRowid);
    }

    static update(id, data) {
        const { name, description } = data;
        db.prepare(
            'UPDATE genres SET name = ?, description = ? WHERE id = ?'
        ).run(name, description, id);
        return this.findById(id);
    }

    static delete(id) {
        const result = db.prepare('DELETE FROM genres WHERE id = ?').run(id);
        return result.changes > 0;
    }
}

module.exports = Genre;
