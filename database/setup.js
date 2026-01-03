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

    CREATE TABLE IF NOT EXISTS reviews (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        film_id INTEGER NOT NULL,
        reviewer_name TEXT NOT NULL,
        rating INTEGER NOT NULL,
        comment TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (film_id) REFERENCES films(id) ON DELETE CASCADE
    );
`);

console.log('Tables created.');

// Check and seed genres
const genreCount = db.prepare('SELECT COUNT(*) as count FROM genres').get();
if (genreCount.count === 0) {
    console.log('Seeding genres...');
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
    console.log(`Seeded ${genres.length} genres`);
} else {
    console.log('Genres already exist, skipping.');
}

// Check and seed films
const filmCount = db.prepare('SELECT COUNT(*) as count FROM films').get();
if (filmCount.count === 0) {
    console.log('Seeding films...');
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
    console.log(`Seeded ${films.length} films`);
} else {
    console.log('Films already exist, skipping.');
}

// Check and seed reviews
const reviewCount = db.prepare('SELECT COUNT(*) as count FROM reviews').get();
if (reviewCount.count === 0) {
    console.log('Seeding reviews...');
    const insertReview = db.prepare(
        'INSERT INTO reviews (film_id, reviewer_name, rating, comment) VALUES (?, ?, ?, ?)'
    );
    const reviews = [
        // The Matrix (film_id: 1)
        [1, 'John Smith', 5, 'A groundbreaking film that changed cinema forever. The visual effects were revolutionary.'],
        [1, 'Jane Doe', 4, 'Great action sequences and thought-provoking storyline.'],
        [1, 'Alex Turner', 5, 'The red pill or blue pill scene is iconic. A must-watch for any sci-fi fan.'],
        [1, 'Maria Garcia', 4, 'Keanu Reeves at his best. The choreography is stunning.'],
        // Inception (film_id: 2)
        [2, 'Mike Johnson', 5, 'Mind-bending plot that keeps you guessing until the very end.'],
        [2, 'Sarah Wilson', 4, 'Visually stunning with an incredible score by Hans Zimmer.'],
        [2, 'Tom Bradley', 5, 'Nolan proves once again why he is a master filmmaker.'],
        [2, 'Emma Thompson', 3, 'A bit confusing at times, but overall a great experience.'],
        // The Dark Knight (film_id: 3)
        [3, 'Chris Brown', 5, 'Heath Ledger delivers an unforgettable performance as the Joker.'],
        [3, 'Rachel Green', 5, 'The best superhero movie ever made. Period.'],
        [3, 'James Wilson', 5, 'Dark, intense, and incredibly well-crafted.'],
        [3, 'Sophie Miller', 4, 'Christian Bale is the definitive Batman.'],
        // Pulp Fiction (film_id: 4)
        [4, 'Emily Davis', 4, 'Tarantino at his finest. The dialogue is exceptional.'],
        [4, 'Mark Stevens', 5, 'A cultural phenomenon. Every scene is quotable.'],
        [4, 'Linda Parker', 4, 'The non-linear storytelling keeps you engaged throughout.'],
        // The Shawshank Redemption (film_id: 5)
        [5, 'David Miller', 5, 'A timeless masterpiece about hope and friendship.'],
        [5, 'Nancy White', 5, 'Morgan Freeman narration is perfection.'],
        [5, 'Peter Johnson', 5, 'Emotional and uplifting. A film that stays with you.'],
        [5, 'Karen Brown', 4, 'Slow burn but absolutely worth it.'],
        // Forrest Gump (film_id: 6)
        [6, 'Lisa Anderson', 5, 'Tom Hanks gives a heartwarming performance.'],
        [6, 'Robert Lee', 4, 'A beautiful journey through American history.'],
        [6, 'Jennifer Clark', 5, 'Life is like a box of chocolates indeed.'],
        // The Godfather (film_id: 7)
        [7, 'Robert Taylor', 5, 'The definitive gangster movie. An offer you cannot refuse.'],
        [7, 'Michael Scott', 5, 'Marlon Brando is mesmerizing. A true classic.'],
        [7, 'Angela Martin', 4, 'Long but every minute is worth it.'],
        [7, 'Kevin Malone', 5, 'The family dynamics are portrayed brilliantly.'],
        // Interstellar (film_id: 8)
        [8, 'Amanda White', 4, 'Ambitious sci-fi with emotional depth and stunning visuals.'],
        [8, 'Daniel Craig', 5, 'The docking scene alone is worth the watch.'],
        [8, 'Olivia Newton', 5, 'A love letter to space exploration and human spirit.'],
        [8, 'George Lucas', 4, 'Hans Zimmer score elevates every scene.'],
        // Toy Story (film_id: 9)
        [9, 'Tim Allen', 5, 'A revolutionary film that started it all for Pixar.'],
        [9, 'Amy Adams', 5, 'Heartfelt story that appeals to all ages.'],
        [9, 'Billy Crystal', 4, 'Woody and Buzz are an iconic duo.'],
        // The Conjuring (film_id: 10)
        [10, 'Patrick Wilson', 4, 'Genuinely scary with great atmosphere.'],
        [10, 'Vera Farmiga', 4, 'James Wan knows how to build tension.'],
        [10, 'Stephen King', 3, 'Good scares but follows familiar horror tropes.'],
        [10, 'Wes Craven', 5, 'One of the best horror films of the decade.']
    ];
    for (const review of reviews) {
        insertReview.run(...review);
    }
    console.log(`Seeded ${reviews.length} reviews`);
} else {
    console.log('Reviews already exist, skipping.');
}

db.close();
console.log('Database setup complete!');
