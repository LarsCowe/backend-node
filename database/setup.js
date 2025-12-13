const Database = require('better-sqlite3');
const path = require('path');

const dbPath = path.join(__dirname, 'films.db');
const db = new Database(dbPath);

console.log('Setting up database...');

// Create tables
db.exec(`
    CREATE TABLE IF NOT EXISTS genres (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        description TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS films (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        description TEXT,
        release_year INTEGER,
        duration_minutes INTEGER,
        genre_id INTEGER,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (genre_id) REFERENCES genres(id) ON DELETE SET NULL
    );
`);

console.log('Tables created.');

// Check if data already exists
const genreCount = db.prepare('SELECT COUNT(*) as count FROM genres').get();

if (genreCount.count === 0) {
    console.log('Seeding data...');

    // Seed genres
    const insertGenre = db.prepare('INSERT INTO genres (name, description) VALUES (?, ?)');
    const genres = [
        ['Action', 'High-energy films with physical stunts and chases'],
        ['Comedy', 'Films intended to make the audience laugh'],
        ['Drama', 'Serious narratives focused on realistic characters'],
        ['Horror', 'Films designed to frighten and scare'],
        ['Science Fiction', 'Films with futuristic or scientific themes'],
        ['Romance', 'Films focused on romantic relationships'],
        ['Thriller', 'Suspenseful films that keep viewers on edge'],
        ['Animation', 'Films created using animation techniques']
    ];

    for (const [name, description] of genres) {
        insertGenre.run(name, description);
    }

    // Seed films
    const insertFilm = db.prepare(
        'INSERT INTO films (title, description, release_year, duration_minutes, genre_id) VALUES (?, ?, ?, ?, ?)'
    );
    const films = [
        ['The Matrix', 'A computer hacker learns about the true nature of reality', 1999, 136, 5],
        ['Inception', 'A thief who steals corporate secrets through dream-sharing technology', 2010, 148, 5],
        ['The Dark Knight', 'Batman faces the Joker, a criminal mastermind', 2008, 152, 1],
        ['Pulp Fiction', 'Various interconnected stories of criminals in Los Angeles', 1994, 154, 3],
        ['The Shawshank Redemption', 'Two imprisoned men bond over a number of years', 1994, 142, 3],
        ['Forrest Gump', 'The life of a slow-witted but kind-hearted man', 1994, 142, 3],
        ['The Godfather', 'The aging patriarch of an organized crime dynasty', 1972, 175, 3],
        ['Interstellar', 'A team of explorers travel through a wormhole in space', 2014, 169, 5],
        ['Toy Story', 'A cowboy doll is threatened by a new spaceman toy', 1995, 81, 8],
        ['The Conjuring', 'Paranormal investigators help a family terrorized by a dark presence', 2013, 112, 4]
    ];

    for (const film of films) {
        insertFilm.run(...film);
    }

    console.log('Data seeded: 8 genres, 10 films');
} else {
    console.log('Data already exists, skipping seed.');
}

db.close();
console.log('Database setup complete!');
