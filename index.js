// Import the pets array from data.js
const pets = require('./data');

// Initialize express app
const express = require('express');
const app = express();
const path = require('path')
const PORT = 8080;

// Serve static files from the public directory
app.use(express.static(path.join(__dirname, 'public')));

// Catch-all route to serve the React app
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'));
});

// GET - / - Returns homepage
app.get('/', (req, res) => {
    // Serve up the public folder as static index.html file
    res.sendFile(__dirname + '/public/index.html');
});

// Hello world route
app.get('/api', (req, res) => {
    res.send('Hello World!');
});

// Get all pets from the database
app.get('/api/v1/pets', (req, res) => {
    // Send the pets array as a response
    res.json(pets);
});

// Get pet by owner with query string
app.get('/api/v1/pets/owner', (req, res) => {
    // Get the owner from the request
    const owner = req.query.owner;

    // Find the pet in the pets array
    const pet = pets.find(pet => pet.owner === owner);

    // Send the pet as a response
    res.json(pet);
});

// Get pet by name
app.get('/api/v1/pets/:name', (req, res) => {
    // Get the name from the request
    const name = req.params.name;

    // Find the pet in the pets array
    const pet = pets.find(pet => pet.name === name);

    // Send the pet as a response
    res.json(pet);
});

app.listen(PORT, () => {
    console.log('Server is listening on port ' + PORT);
});

module.exports = app;
