// Import the necessary modules
const express = require('express');
const axios = require('axios');
const mysql = require('mysql');
const cors = require('cors');

// Initialize the Express application
const app = express();
const port = 3000; // The port the server will listen on

// Apply middleware
app.use(cors()); // Enable CORS
app.use(express.json()); // Enable JSON body parsing for incoming requests

// Configure the connection to the MySQL database
const connection = mysql.createConnection({
  host: 'localhost', // Replace with your database host
  user: 'mealme', // Replace with your database user
  password: 'Calpal123', // Replace with your database password
  database: 'mealme' // Replace with your database name
});

// Connect to the MySQL database
connection.connect(error => {
  if (error) {
    console.error('Error connecting to the database:', error);
    return;
  }
  console.log("Successfully connected to the database.");
});

// An asynchronous function to fetch data from the API and insert it into the database
const fetchDataAndInsertToDB = async () => {
  const URL = 'https://travel-advisor.p.rapidapi.com/restaurants/list-in-boundary';
  // Replace the placeholders with actual latitude and longitude
  const params = {
    bl_latitude: 'bottom_left_latitude',
    tr_latitude: 'top_right_latitude',
    bl_longitude: 'bottom_left_longitude',
    tr_longitude: 'top_right_longitude',
  };
  const headers = {
    'X-RapidAPI-Key': 'your_rapidapi_key',
    'X-RapidAPI-Host': 'travel-advisor.p.rapidapi.com'
  };

  try {
    const { data: { data } } = await axios.get(URL, { params, headers });
    for (const place of data) {
      const { name, rating, price_level, ranking } = place;
      const query = 'INSERT INTO restaurants (name, rating, price_level, ranking) VALUES (?, ?, ?, ?)';
      await new Promise((resolve, reject) => {
        connection.query(query, [name, rating, price_level, ranking], (error, results) => {
          if (error) {
            reject(error);
          } else {
            resolve(results);
            console.log(`Inserted data for ${name}`);
          }
        });
      });
    }
  } catch (error) {
    console.error('Error fetching data from external API:', error);
  }
};

// Routes
app.get('/api/restaurants', (req, res) => {
  connection.query('SELECT * FROM restaurants', (error, results) => {
    if (error) return res.status(500).send(error);
    res.json(results);
  });
});

app.post('/api/restaurants', (req, res) => {
  const { name, rating, price_level, ranking } = req.body;
  const query = 'INSERT INTO restaurants (name, rating, price_level, ranking) VALUES (?, ?, ?, ?)';
  connection.query(query, [name, rating, price_level, ranking], (error, results) => {
    if (error) return res.status(500).send(error);
    res.status(201).send('Restaurant added successfully');
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
