const express = require('express');
const cors = require('cors');
const path = require('path');

const genreRoutes = require('./routes/genreRoutes');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files
app.use(express.static(path.join(__dirname, '../public')));

// Routes
app.use('/api/genres', genreRoutes);

module.exports = app;
