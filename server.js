const express = require('express');
const path = require('path');
const PORT = process.env.port || 3001;
const app = express();
const uuid = require('./helpers/uuid');
const apiRoutes = require('./routes/index')

// Middleware for parsing JSON and URLencoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// Middleware for accessing public folder
app.use(express.static('public'));
// Middleware to mount modularized routes
app.use('/api', apiRoutes);

// GET Route for homepage
app.get('/', (req, res) => res.sendFile(path.join(__dirname, '/public/index.html')));

// GET Route for notes page
app.get('/notes', (req, res) => res.sendFile(path.join(__dirname, '/public/notes.html')));

// Fallback Route set to index.html
app.get('*', (req, res) => res.sendFile(path.join(__dirname, '/public/index.html')));

// Listen for requests to server
app.listen(PORT, () => console.log(`App listening at http://localhost:${PORT}`));