const express = require('express');
const songRoutes = require('./src/routes/song.routes'); // Import the song routes
const  cors = require('cors');

const app = express();
app.use(cors()); 
app.use(express.json()) // Middleware to parse JSON bodies


app.use('/',songRoutes) // Use the song routes

module.exports = app; // Export the app for use in other files