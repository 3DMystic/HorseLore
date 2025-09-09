const express = require('express');
const app = express();
const PORT = 8080;
const fs = require('fs');
const horseData = JSON.parse(fs.readFileSync('./horseData.json'), 'utf-8');

const path = require('path');

// Serve frontend from public directory
app.use(express.static('../public'));
app.use(express.json());

// display api data
app.get('/api/horseData', (req, res) => {
    res.json(horseData);
});

app.get('/api/horseData/:breed', (req, res) => {
    const breed = req.params.breed.toLowerCase();
    
    if (horseData[breed]) {
        res.status(200).json(horseData[breed]);
    } else {
        res.status(404).json({ error: 'Breed not found' });
    }
});

app.listen(PORT, () => {
    console.log(`Server listening on http://localhost:${PORT}`);
    console.log('Press Ctrl+C to quit.');
});