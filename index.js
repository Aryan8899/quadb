const express = require('express');
const axios = require('axios');
const { Pool } = require('pg');

const app = express();
const port = 3000;

// PostgreSQL Pool setup
const pool = new Pool({
    user: 'aryan',
    host: 'localhost',
    database: 'crypto_db',
    password: 'Aryan@123',
    port: 5432
});

// Fetch data from WazirX API and store in PostgreSQL
app.get('/fetch-crypto', async (req, res) => {
    try {
        const response = await axios.get('https://api.wazirx.com/api/v2/tickers');
        const data = Object.values(response.data).slice(0, 10); // Get top 10 results

        const client = await pool.connect();
        await client.query('TRUNCATE TABLE crypto'); // Clear old data

        for (const item of data) {
            const { name, last, buy, sell, volume, base_unit } = item;
            await client.query(
                'INSERT INTO crypto (name, last, buy, sell, volume, base_unit) VALUES ($1, $2, $3, $4, $5, $6)',
                [name, last, buy, sell, volume, base_unit]
            );
        }

        client.release();
        res.send('Data fetched and stored in PostgreSQL.');
    } catch (error) {
        console.error(error);
        res.status(500).send('Error fetching or storing data.');
    }
});

// Route to get the stored data from PostgreSQL
app.get('/get-crypto', async (req, res) => {
    try {
        const client = await pool.connect();
        const result = await client.query('SELECT * FROM crypto');
        client.release();
        res.json(result.rows);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error retrieving data.');
    }
});

// Serve static files (for frontend)
app.use(express.static('public'));

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
