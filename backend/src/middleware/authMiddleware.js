// backend/src/middleware/authMiddleware.js
const jwt = require('jsonwebtoken');
//require('dotenv').config();

module.exports = function (req, res, next) {
  // 1. Get token from the header
  const token = req.header('Authorization');

  // 2. Check if no token
  if (!token) {
    return res.status(401).json({ success: false, message: 'No token, authorization denied' });
  }

  // 3. Verify token
  try {
    // The token comes in the format "Bearer <token>". We split it and get just the token.
    const justToken = token.split(' ')[1];
    if (!justToken) {
      return res.status(401).json({ success: false, message: 'Token format is invalid' });
    }
    console.log("JWT_SECRET (Middleware - Verify):", process.env.JWT_SECRET);
    const decoded = jwt.verify(justToken, process.env.JWT_SECRET);

    // 4. Add user ID from payload to the request object
    // This lets all our protected routes know *who* is making the request
    req.user = decoded.user;
    next();
  } catch (error) {
    res.status(401).json({ success: false, message: 'Token is not valid' });
  }
};