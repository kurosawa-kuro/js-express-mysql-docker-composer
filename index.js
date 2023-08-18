require('dotenv').config();
const express = require('express');
const mysql = require('mysql2/promise');
const app = express();
const PORT = 3000;

app.get('/', (req, res) => {
    res.send('Hello World from Express!');
});

app.get('/microposts', async (req, res) => {

    try {
        const connection = await mysql.createConnection({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME,
            ssl: {
                rejectUnauthorized: true
            }
        });


        const [results] = await connection.query('SELECT * FROM microposts');
        res.send(results);
    } catch (error) {
        console.error("Error querying the database: ", error);
        res.status(500).send("Internal Server Error");
    }
});


app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
