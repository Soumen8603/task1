// backend/src/routes/authRoutes.js
const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const {
  registerValidationRules,
  loginValidationRules, // <-- ADDED THIS
  validate,
} = require('../middleware/validation');

// @route   POST /api/auth/register
// @desc    Register a new user
// @access  Public
router.post(
  '/register',
  registerValidationRules(), // Apply validation rules
  validate, // Check for errors
  authController.register // Run the controller logic
);

// @route   POST /api/auth/login
// @desc    Authenticate user & get token
// @access  Public
router.post(
  '/login',
  loginValidationRules(), // <-- ADDED THIS ROUTE
  validate,
  authController.login
);

// (We will add verify-email, etc. routes here later)

module.exports = router;