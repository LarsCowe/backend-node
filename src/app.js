const express = require('express');
const cors = require('cors');
const path = require('path');

const genreRoutes = require('./routes/genreRoutes');
const filmRoutes = require('./routes/filmRoutes');
const reviewRoutes = require('./routes/reviewRoutes');
const healthRoutes = require('./routes/healthRoutes');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files
app.use(express.static(path.join(__dirname, '../public')));

// Routes
app.use('/api/genres', genreRoutes);
app.use('/api/films', filmRoutes);
app.use('/api/reviews', reviewRoutes);
app.use('/api/health', healthRoutes);

module.exports = app;
