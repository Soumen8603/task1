import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Button, TextField, Box, Typography, Container, Paper, CircularProgress, Grid } from '@mui/material'; 
import { useNavigate, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { loginUser, reset } from '../store/authSlice';
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user, isAuthenticated, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    let timer; // Timer variable for cleanup

    // 1. Handle Errors
    if (isError) {
      dispatch(reset());
    }
    
    // 2. Handle POST-SUBMISSION SUCCESS and Delayed Redirection (The Final Fix)
    if (isSuccess) {
      // Use setTimeout to ensure the Redux store and browser finish saving the token
      timer = setTimeout(() => {
          navigate('/dashboard');
          dispatch(reset()); 
      }, 150); // 150ms delay to break the race condition
    }

    // 3. Handle Already Authenticated (Synchronous Check)
    // If the component loads and the user is already in storage, redirect immediately.
    if (isAuthenticated && !isSuccess) {
      navigate('/dashboard');
    }

    // 4. Cleanup function: Clear the timeout if the component unmounts or state changes
    return () => {
        clearTimeout(timer);
    };

  }, [user, isAuthenticated, isError, isSuccess, message, navigate, dispatch]); 

  const onSubmit = (data) => {
    dispatch(loginUser(data));
  };

  return (
    <Container component="main" maxWidth="xs">
      <Paper 
        elevation={3} 
        sx={{ 
          marginTop: 8, 
          display: 'flex', 
          flexDirection: 'column', 
          alignItems: 'center',
          padding: 4
        }}
      >
        <Typography component="h1" variant="h5">
          Sign In
        </Typography>
        
        <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ mt: 3 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            autoComplete="email"
            autoFocus
            disabled={isLoading}
            {...register("email", { required: "Email is required" })}
            error={!!errors.email}
            helperText={errors.email?.message}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            disabled={isLoading}
            {...register("password", { required: "Password is required" })}
            error={!!errors.password}
            helperText={errors.password?.message}
          />
          
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            disabled={isLoading}
          >
            {isLoading ? <CircularProgress size={24} color="inherit" /> : "Sign In"}
          </Button>

          {/* --- ADD THIS CODE --- */}
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link to="/register" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
          {/* --- END OF ADDED CODE --- */}

        </Box>
      </Paper>
    </Container>
  );
};

export default Login;