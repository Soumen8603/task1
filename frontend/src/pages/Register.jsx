import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Button, TextField, Box, Typography, Container, Paper, CircularProgress, Select, MenuItem, InputLabel, FormControl } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { registerUser, reset } from '../store/authSlice';
import { toast } from 'react-toastify';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css'; // CSS for phone input

const Register = () => {
  const { register, handleSubmit, setValue, formState: { errors } } = useForm();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Get auth state from Redux store
  const { isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    // This effect runs when the auth state changes
    if (isError) {
      toast.error(message); // Show error message
      dispatch(reset());
    }

    // If registration is successful, show success and redirect to login
    if (isSuccess) {
      toast.success('User registered successfully! Please log in.');
      navigate('/login');
      dispatch(reset());
    }
  }, [isError, isSuccess, message, navigate, dispatch]);

  const onSubmit = (data) => {
    // Add the default signup_type
    const userData = { ...data, signup_type: 'e' }; 
    dispatch(registerUser(userData));
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
          padding: 4,
          marginBottom: 8,
        }}
      >
        <Typography component="h1" variant="h5">
          Sign Up
        </Typography>
        
        <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ mt: 3 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="full_name"
            label="Full Name"
            autoComplete="name"
            autoFocus
            disabled={isLoading}
            {...register("full_name", { required: "Full name is required" })}
            error={!!errors.full_name}
            helperText={errors.full_name?.message}
          />

          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            autoComplete="email"
            disabled={isLoading}
            {...register("email", { 
              required: "Email is required",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Invalid email address"
              }
            })}
            error={!!errors.email}
            helperText={errors.email?.message}
          />
          
          <TextField
            margin="normal"
            required
            fullWidth
            label="Password"
            type="password"
            id="password"
            autoComplete="new-password"
            disabled={isLoading}
            {...register("password", { 
              required: "Password is required",
              minLength: {
                value: 6,
                message: "Password must be at least 6 characters"
              }
            })}
            error={!!errors.password}
            helperText={errors.password?.message}
          />

          <FormControl fullWidth margin="normal" required error={!!errors.gender}>
            <InputLabel id="gender-label">Gender</InputLabel>
            <Select
              labelId="gender-label"
              id="gender"
              label="Gender"
              disabled={isLoading}
              defaultValue=""
              {...register("gender", { required: "Gender is required" })}
            >
              <MenuItem value="m">Male</MenuItem>
              <MenuItem value="f">Female</MenuItem>
              <MenuItem value="o">Other</MenuItem>
            </Select>
            {errors.gender && <Typography variant="caption" color="error">{errors.gender.message}</Typography>}
          </FormControl>

          <Box sx={{ mt: 2, mb: 1 }}>
            <PhoneInput
              country={'in'} // Default to India
              // This is a bit tricky with react-hook-form, so we use setValue
              onChange={phone => setValue('mobile_no', `+${phone}`)}
              inputProps={{
                name: 'mobile_no',
                required: true,
              }}
              disabled={isLoading}
            />
          </Box>
          
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            disabled={isLoading}
          >
            {isLoading ? <CircularProgress size={24} color="inherit" /> : "Sign Up"}
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default Register;