// backend/src/routes/companyRoutes.js

const express = require('express');
const router = express.Router();
const companyController = require('../controllers/companyController');
const authMiddleware = require('../middleware/authMiddleware'); // <-- Import auth middleware
const upload = require('../middleware/uploadMiddleware'); // <-- Import upload middleware

// @route   POST /api/company/register
// @desc    Submit company profile details
// @access  Private (Protected by JWT)
router.post(
  '/register',
  authMiddleware,
  companyController.registerCompany
);

// @route   GET /api/company/profile
// @desc    Fetch company profile details
// @access  Private
router.get(
  '/profile',
  authMiddleware,
  companyController.getProfile
);

// @route   PUT /api/company/profile
// @desc    Update company profile details
// @access  Private
router.put(
  '/profile',
  authMiddleware,
  companyController.updateProfile
);

// @route   POST /api/company/upload-logo
// @desc    Upload company logo
// @access  Private
router.post(
  '/upload-logo',
  authMiddleware,
  upload.single('logo'),
  companyController.uploadLogo
);

// @route   POST /api/company/upload-banner
// @desc    Upload company banner
// @access  Private
router.post(
  '/upload-banner',
  authMiddleware,
  upload.single('banner'),
  companyController.uploadBanner
);

// Print all registered routes for debugging
router.stack.forEach(r => {
  if (r.route) {
    console.log(`[companyRoutes] ${r.route.stack[0].method.toUpperCase()} ${r.route.path}`);
  }
});

module.exports = router;
