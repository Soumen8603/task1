// backend/src/utils/jwtHelper.js
const jwt = require('jsonwebtoken');
//require('dotenv').config();

const generateToken = (userId) => {
  console.log("JWT_SECRET (Helper - Signing):", process.env.JWT_SECRET);
  // Create a payload
  const payload = {
    user: {
      id: userId,
    },
  };

  // Sign the token
  // Set to 90 days as per project spec [cite: 122]
  return jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: '90d',
  });
};

module.exports = { generateToken };