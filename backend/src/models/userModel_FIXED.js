// backend/src/models/userModel_FIXED.js
const db = require('../config/db'); // Imports { pool }
const bcrypt = require('bcrypt');

// SAFE query helper. This prevents all database connection leaks.
const query = async (text, params) => {
  let client;
  try {
    client = await db.pool.connect();
    const res = await client.query(text, params);
    return res;
  } catch (err) {
    console.error('Database query error:', err);
    throw err;
  } finally {
    // This 'finally' block ensures the connection is ALWAYS released
    if (client) {
      client.release();
    }
  }
};

const userModel = {
  findUserByEmailOrMobile: async (email, mobile_no) => {
    const queryText = 'SELECT * FROM users WHERE email = $1 OR mobile_no = $2';
    const { rows } = await query(queryText, [email, mobile_no]); // Use safe query
    return rows[0];
  },

  findUserByEmail: async (email) => {
    const queryText = 'SELECT * FROM users WHERE email = $1';
    const { rows } = await query(queryText, [email]); // Use safe query
    return rows[0];
  },

  createUser: async (user) => {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(user.password, saltRounds);
    const queryText = `
      INSERT INTO users (email, password, full_name, gender, mobile_no, signup_type)
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING id, email, full_name, created_at
    `;
    const values = [
      user.email, hashedPassword, user.full_name,
      user.gender, user.mobile_no, user.signup_type || 'e',
    ];
    const { rows } = await query(queryText, values); // Use safe query
    return rows[0];
  },
};

module.exports = userModel;