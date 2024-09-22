const express = require('express');
const path = require('path');
const { searchFlights } = require('./flightSearch');

const app = express();
const port = 7777;

app.use(express.static('public'));
app.use(express.json());

app.post('/api/search', async (req, res) => {
    try {
        const { origin, destination, startDate, days } = req.body;
        const results = await searchFlights(origin, destination, startDate, days);
        res.json(results);
    } catch (error) {
        console.error('Search error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
