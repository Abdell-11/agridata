const express = require('express');
const bodyParser = require('body-parser');
const { Pool } = require('pg');

const app = express();
const port = 3000;

// Replace these values with your PostgreSQL connection details
const connectionString = 'postgresql://postgres:vx0mwX2Ols9G4uvT@db.arbotauyvnobapaukzfi.supabase.co:5432/postgres';

const pool = new Pool({
  connectionString,
});

app.use(bodyParser.json());


app.post('/api/sensor-data', async (req, res) => {
  try {
    const { node, temperature, humidity, pressure, gas, soil } = req.body;

    const query = `
    INSERT INTO "sensordata" (node, temperature, pressure, humidity, gas, soil)
    VALUES ($1, 
            CASE WHEN $2::text IS NULL THEN NULL ELSE $2::double precision END,
            CASE WHEN $3::text IS NULL THEN NULL ELSE $3::double precision END,
            CASE WHEN $4::text IS NULL THEN NULL ELSE $4::double precision END,
            CASE WHEN $5::text IS NULL THEN NULL ELSE $5::double precision END,
            CASE WHEN $6::text IS NULL THEN NULL ELSE $6::double precision END)
    RETURNING id;
  `;
    const values = [node, temperature, pressure, humidity, gas, soil];

    const result = await pool.query(query, values);
    res.status(201).json({ id: result.rows[0].id });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while inserting sensor data' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
