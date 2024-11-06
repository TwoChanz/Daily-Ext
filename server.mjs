import express from 'express';
import axios from 'axios';

const app = express();
const PORT = 4000;

const apiKey = 'c0a07ecd9b9d4e70a1204b36fc2ec111';
const apiUrl = `https://newsapi.org/v2/top-headlines?country=us&category=technology&apiKey=${apiKey}`;

// Root route
app.get('/', (req, res) => {
    res.send('Welcome to the Tech News API! Use /top-tech-news to get news.');
});

// Endpoint to fetch top technology news
app.get('/top-tech-news', async (req, res) => {
    try {
        const response = await axios.get(apiUrl);
        res.json(response.data.articles);
    } catch (error) {
        console.error('Error fetching news data:', error);
        res.status(500).json({ error: 'Failed to fetch news data' });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
