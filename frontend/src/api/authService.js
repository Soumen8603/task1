// backend/src/api/authService.js
import axios from 'axios';

const API_URL = 'http://localhost:5001/api/auth/';

// Register user
const register = async (userData) => {
  const response = await axios.post(API_URL + 'register', userData);
  // Note: Your backend sends user_id, but not token on register.
  return response.data;
};

// Login user (FIXED)
const login = async (userData) => {
  const response = await axios.post(API_URL + 'login', userData);

  // --- FIX APPLIED HERE ---
  // The token is nested inside response.data.data.token
  if (response.data.data && response.data.data.token) { 
    // Store user data (which is at response.data.data.user)
    localStorage.setItem('user', JSON.stringify(response.data.data.user)); 
    // Store token (which is at response.data.data.token)
    localStorage.setItem('token', JSON.stringify(response.data.data.token));
  }
  return response.data;
};

// Logout user
const logout = () => {
  localStorage.removeItem('user');
  localStorage.removeItem('token');
};

const authService = {
  register,
  login,
  logout,
};

export default authService;