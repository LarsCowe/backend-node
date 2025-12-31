# Films & Genres API

REST API voor het beheren van films en genres, gebouwd met Node.js en Express.

## Installatie

1. Clone de repository:
```bash
git clone https://github.com/LarsCowe/backend-node.git
cd backend-node
```

2. Installeer dependencies:
```bash
npm install
```

3. Initialiseer de database met seed data:
```bash
npm run setup
```

4. Start de server:
```bash
npm start
```

Of voor development (met auto-reload):
```bash
npm run dev
```

De API draait nu op `http://localhost:3000`

## API Endpoints

### Genres

| Method | Endpoint | Beschrijving |
|--------|----------|--------------|
| GET | `/api/genres` | Alle genres ophalen |
| GET | `/api/genres/:id` | Genre op ID ophalen |
| POST | `/api/genres` | Nieuw genre aanmaken |
| PUT | `/api/genres/:id` | Genre updaten |
| DELETE | `/api/genres/:id` | Genre verwijderen |

### Films

| Method | Endpoint | Beschrijving |
|--------|----------|--------------|
| GET | `/api/films` | Alle films ophalen |
| GET | `/api/films?limit=10&offset=0` | Films met paginatie |
| GET | `/api/films?search=matrix` | Films zoeken op titel |
| GET | `/api/films?sort=release_year&order=desc` | Films sorteren |
| GET | `/api/films?genre_id=5` | Films filteren op genre |
| GET | `/api/films?min_year=2000&max_year=2020` | Films filteren op jaar |
| GET | `/api/films/:id` | Film op ID ophalen |
| POST | `/api/films` | Nieuwe film aanmaken |
| PUT | `/api/films/:id` | Film updaten |
| DELETE | `/api/films/:id` | Film verwijderen |

## Validatie

### Genres
- `name`: Verplicht, mag geen cijfers bevatten

### Films
- `title`: Verplicht
- `release_year`: Optioneel, moet een geldig jaar zijn (1888-heden)
- `duration_minutes`: Optioneel, moet een positief getal zijn
- `genre_id`: Optioneel, moet verwijzen naar een bestaand genre

## Technische Stack

- **Runtime**: Node.js v20+
- **Framework**: Express.js
- **Database**: SQLite (better-sqlite3)
- **Validatie**: express-validator

## Bronvermeldingen

- [Express.js documentatie](https://expressjs.com/)
- [better-sqlite3 documentatie](https://github.com/WiseLibs/better-sqlite3)
- [express-validator documentatie](https://express-validator.github.io/)
