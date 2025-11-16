import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice'; 
import companyReducer from './companySlice'; // 1. Import company reducer

export const store = configureStore({
  reducer: {
    auth: authReducer, 
    company: companyReducer, // 2. Add company reducer
  },
});