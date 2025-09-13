const express = require('express');
const app = express();
const PORT = 8080;
const fs = require('fs');
const horseData = JSON.parse(fs.readFileSync('./horseData.json'), 'utf-8');

const path = require('path');
const fetch = require('node-fetch');
require('dotenv').config();
const cors = require('cors');
const corsOptions = {
    origin: 'http://localhost:8080',
    optionsSuccessStatus: 200
};
app.use(cors());
app.use(cors(corsOptions));

// Serve frontend from public directory
app.use(express.static(path.join(__dirname,'../public')));
app.use(express.json());

// display api data
async function fetchHistory() {
    try {
        const searchTerm = 'Evolution of the horse';
        const response = await fetch(`https://en.wikipedia.org/w/api.php?action=query&format=json&origin=*&prop=extracts&exintro=true&titles=${encodeURIComponent(searchTerm)}`);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error(error);
    }
}

app.get('/api/horseData', (req, res) => {
    res.json(horseData);
});

app.get('/api/v1.0/fetchHistory', async (req, res) => {
    res.status(200).json({
        status: 200,
        data: await fetchHistory(),
    });
});

app.listen(PORT, () => {
    console.log(`Server listening on http://localhost:${PORT}`);
    console.log('Press Ctrl+C to quit.');
});
