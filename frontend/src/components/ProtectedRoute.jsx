import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';
import { CircularProgress, Box } from '@mui/material';

const ProtectedRoute = () => {
  const { isAuthenticated, isLoading } = useSelector((state) => state.auth);
  
  // 1. Show a loading spinner while checking auth status
  if (isLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 10 }}>
        <CircularProgress />
      </Box>
    );
  }

  // 2. If authenticated, render the child route (Dashboard/Settings)
  if (isAuthenticated) {
    return <Outlet />;
  }
  
  // 3. If not authenticated, redirect them to the login page
  return <Navigate to="/login" replace />;
};

export default ProtectedRoute;