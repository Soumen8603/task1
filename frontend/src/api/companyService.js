import axios from 'axios';

// Change this to your actual backend URL if needed!
const API_URL = 'http://localhost:5001/api/company/';

// Helper for getting token from thunkAPI in asyncThunks
const getToken = (thunkAPI) => {
  // Support either thunkAPI or direct calls if needed.
  try {
    return thunkAPI.getState().auth.token;
  } catch {
    return null;
  }
};

// CREATE profile (POST /register)
const createProfile = async (profileData, thunkAPI) => {
  const token = getToken(thunkAPI);
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  const response = await axios.post(API_URL + 'register', profileData, config);
  return response.data; // should be { data: { ...company... } }
};

// GET profile (GET /profile)
const getProfile = async (thunkAPI) => {
  const token = getToken(thunkAPI);
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  const response = await axios.get(API_URL + 'profile', config);
  return response.data;
};

// UPDATE profile (PUT /profile)
const updateProfile = async (profileData, thunkAPI) => {
  const token = getToken(thunkAPI);
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  const response = await axios.put(API_URL + 'profile', profileData, config);
  return response.data;
};

// UPLOAD logo (POST /upload-logo)
const uploadLogo = async (file, thunkAPI) => {
  const token = getToken(thunkAPI);
  const formData = new FormData();
  formData.append('logo', file);
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'multipart/form-data',
    },
  };
  const response = await axios.post(API_URL + 'upload-logo', formData, config);
  return response.data;
};

// UPLOAD banner (POST /upload-banner)
const uploadBanner = async (file, thunkAPI) => {
  const token = getToken(thunkAPI);
  const formData = new FormData();
  formData.append('banner', file);
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'multipart/form-data',
    },
  };
  const response = await axios.post(API_URL + 'upload-banner', formData, config);
  return response.data;
};

const companyService = {
  createProfile,
  getProfile,
  updateProfile,
  uploadLogo,
  uploadBanner,
};

export default companyService;
