// backend/server.js
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const compression = require('compression');
require('dotenv').config();

// --- IMPORT YOUR NEW ROUTES ---
const authRoutes = require('./src/routes/authRoutes');
const companyRoutes = require('./src/routes/companyRoutes');

// --- IMPORT DB FOR TESTING ---
// We import the pool directly to test it on startup
const { pool } = require('./src/config/db'); 

const app = express();
const PORT = process.env.PORT || 5001;

// Security & Middleware
app.use(cors());
app.use(helmet());
app.use(compression());

// Body Parsers
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Test Route
app.get('/', (req, res) => {
  res.send('Company Registration Module API is running...');
});

// --- MOUNT YOUR API ROUTES ---
app.use('/api/auth', authRoutes);
app.use('/api/company', companyRoutes);

// Global Error Handler (basic)
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);

  // --- START NEW DATABASE CONNECTION TEST ---
  console.log('Attempting to connect to database...');
  pool.query('SELECT NOW()', (err, res) => {
    if (err) {
      console.error('!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!');
      console.error('!!! DATABASE CONNECTION FAILED. SERVER DID NOT START !!!');
      console.error('!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!');
      console.error('Error:', err.message);
      console.error('Hint: Check your .env file (DB_USER, DB_PASSWORD, DB_HOST, DB_DATABASE).');
      console.error('Hint: Is your PostgreSQL server running?');
      console.error('!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!');
      // We can choose to exit if the DB connection fails
      // process.exit(1);
    } else {
      console.log('✅ Database connected successfully:', res.rows[0].now);
    }
  });
  // --- END NEW DATABASE CONNECTION TEST ---
});