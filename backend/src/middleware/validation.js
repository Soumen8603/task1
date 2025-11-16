// backend/src/middleware/validation.js
const { body, validationResult } = require('express-validator');

// Validation rules for user registration
const registerValidationRules = () => {
  return [
    body('email', 'A valid email is required').isEmail().normalizeEmail(),
    body('password', 'Password must be at least 6 characters').isLength({ min: 6 }),
    body('full_name', 'Full name is required').not().isEmpty().trim().escape(),
    body('mobile_no', 'A valid mobile number is required').not().isEmpty().trim(),
   body('gender')
    .notEmpty()
    .withMessage('Gender is required')
    .isIn(['m', 'f', 'o']) // <-- THIS IS THE FIX
    .withMessage("Gender must be 'm', 'f', or 'o'"),
  ];
};

// Validation rules for user login
const loginValidationRules = () => {
  return [
    body('email', 'A valid email is required').isEmail().normalizeEmail(),
    body('password', 'Password is required').not().isEmpty(),
  ];
};

// Middleware to check for validation errors
const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }

  // Return the first error
  const extractedErrors = errors.array().map((err) => ({ [err.path]: err.msg }));
  return res.status(400).json({
    success: false,
    message: 'Validation failed',
    errors: extractedErrors,
  });
};

module.exports = {
  registerValidationRules,
  loginValidationRules, // <-- Added this
  validate,
};