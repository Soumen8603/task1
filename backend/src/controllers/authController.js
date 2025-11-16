// backend/src/controllers/authController.js
const userModel = require('../models/userModel_FIXED');
const bcrypt = require('bcrypt');
const { generateToken } = require('../utils/jwtHelper'); 

const authController = {
  register: async (req, res) => {
    // ... (This function is fine)
    try {
      const { email, password, full_name, mobile_no, gender, signup_type } = req.body;
      const existingUser = await userModel.findUserByEmailOrMobile(email, mobile_no);
      if (existingUser) {
        let message =
          existingUser.email === email
            ? 'An account with this email already exists.'
            : 'An account with this mobile number already exists.';
        return res.status(400).json({ success: false, message });
      }
      const newUser = { email, password, full_name, mobile_no, gender, signup_type };
      const createdUser = await userModel.createUser(newUser);
      res.status(201).json({
        success: true,
        message: 'User registered successfully.',
        data: { user_id: createdUser.id },
      });
    } catch (error) {
      console.error('Registration Error:', error);
      res.status(500).json({ success: false, message: 'Server error.' });
    }
  },

  // --- THIS IS THE TESTED LOGIN FUNCTION ---
  login: async (req, res) => {
    // --- NEW LOG 1 ---
    console.log('>>> [AUTH_CONTROLLER] Step 1: Login attempt started...');
    try {
      const { email, password } = req.body;

      // 1. Find user by email (USING THE SAFE MODEL FUNCTION)
      const user = await userModel.findUserByEmail(email);

      if (!user) {
        // --- NEW LOG 2 ---
        console.log('>>> [AUTH_CONTROLLER] Step 2: Login FAILED. User not found.');
        return res.status(400).json({ success: false, message: 'Invalid credentials' });
      }

      // 2. Compare password
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        // --- NEW LOG 3 ---
        console.log('>>> [AUTH_CONTROLLER] Step 2: Login FAILED. Password incorrect.');
        return res.status(400).json({ success: false, message: 'Invalid credentials' });
      }

      // 3. Generate JWT
      const token = generateToken(user.id);
      
      const userForResponse = { ...user };
      delete userForResponse.password; 

      // --- NEW LOG 4 ---
      console.log('>>> [AUTH_CONTROLLER] Step 2: Login SUCCESS. Sending token.');
      
      // 5. Send token and user data
      res.status(200).json({
        success: true,
        message: 'Login successful',
        data: {
          token: token,
          user: userForResponse, 
        },
      });
    } catch (error) {
      console.error('Login Error:', error);
      res.status(500).json({ success: false, message: 'Server error during login.' });
    }
  },
};

module.exports = authController;