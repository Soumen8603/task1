import React, { useState } from 'react';
import { useForm } from 'react-hook-form'; 
import { Box, Button, Typography, Paper, TextField, Grid, CircularProgress } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { createCompanyProfile } from '../store/companySlice';
import { toast } from 'react-toastify';


const CompanyRegistrationForm = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const { register, handleSubmit, formState: { errors }, getValues, reset } = useForm();
  
  // State to hold all form data across steps
  const [formData, setFormData] = useState({}); 

  const dispatch = useDispatch();
  const { isLoading, isError, isSuccess, message } = useSelector(state => state.company);


  // --- Step Validation and Navigation ---
  const handleNext = (data) => {
    setFormData(prev => ({ ...prev, ...data }));

    if (currentStep < 3) {
      // Reset form fields for the next step before navigating
      reset(); 
      setCurrentStep(prev => prev + 1);
    }
  };

  const handleBack = () => {
    // Save current step data before navigating back (Important for images/optional fields)
    const currentStepData = getValues();
    setFormData(prev => ({ ...prev, ...currentStepData }));
    
    // Reset form fields to load previous data on the back step
    reset(formData); 
    setCurrentStep(prev => prev - 1);
  };
  
  // --- FINAL SUBMISSION ---
  const onSubmitFinal = (data) => {
      const finalData = { ...formData, ...data };
      
      // Dispatch the thunk to create the profile
      dispatch(createCompanyProfile(finalData));
  }

  // Handle successful submission effect
  React.useEffect(() => {
    if (isError) {
        toast.error('Submission Failed: ' + (typeof message === 'object' ? message.message : message));
    }
    if (isSuccess) {
        toast.success('Company Profile Created Successfully!');
        // No redirect needed, as the Dashboard will re-render to show the profile
    }
  }, [isError, isSuccess, message]);
  

  // --- Function to Render Current Step UI ---
  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <Box sx={{ mt: 2 }}>
            <Typography variant="h6" gutterBottom>Company Registration Step 1: Basic Info</Typography>
            <Grid container spacing={2}>
              {/* Company Name */}
              <Grid item xs={12}>
                <TextField fullWidth required label="Company Name" defaultValue={formData.company_name || ''} 
                  {...register("company_name", { required: "Company Name is required" })}
                  error={!!errors.company_name} helperText={errors.company_name?.message}
                />
              </Grid>
              {/* Company Website */}
              <Grid item xs={12}>
                <TextField fullWidth label="Website URL (Optional)" defaultValue={formData.website || ''}
                  {...register("website", { 
                    pattern: { value: /^(ftp|http|https):\/\/[^ "]+$/i, message: "Must be a valid URL" }
                  })}
                  error={!!errors.website} helperText={errors.website?.message}
                />
              </Grid>
              {/* Industry Type */}
              <Grid item xs={12}>
                <TextField fullWidth required label="Industry Type" defaultValue={formData.industry || ''}
                  {...register("industry", { required: "Industry is required" })}
                  error={!!errors.industry} helperText={errors.industry?.message}
                />
              </Grid>
            </Grid>
          </Box>
        );
      case 2:
        return (
          <Box sx={{ mt: 2 }}>
            <Typography variant="h6" gutterBottom>Company Registration Step 2: Address</Typography>
            <Grid container spacing={2}>
              {/* Company Address */}
              <Grid item xs={12}>
                <TextField fullWidth required label="Company Address" defaultValue={formData.address || ''} 
                  {...register("address", { required: "Address is required" })}
                  error={!!errors.address} helperText={errors.address?.message}
                />
              </Grid>
              {/* City */}
              <Grid item xs={12} sm={6}>
                <TextField fullWidth required label="City" defaultValue={formData.city || ''} 
                  {...register("city", { required: "City is required" })}
                  error={!!errors.city} helperText={errors.city?.message}
                />
              </Grid>
              {/* State */}
              <Grid item xs={12} sm={6}>
                <TextField fullWidth required label="State" defaultValue={formData.state || ''} 
                  {...register("state", { required: "State is required" })}
                  error={!!errors.state} helperText={errors.state?.message}
                />
              </Grid>
              {/* Country */}
              <Grid item xs={12} sm={6}>
                <TextField fullWidth required label="Country" defaultValue={formData.country || ''} 
                  {...register("country", { required: "Country is required" })}
                  error={!!errors.country} helperText={errors.country?.message}
                />
              </Grid>
              {/* Postal Code */}
              <Grid item xs={12} sm={6}>
                <TextField fullWidth required label="Postal Code" defaultValue={formData.postal_code || ''} 
                  {...register("postal_code", { 
                    required: "Postal Code is required",
                    pattern: { value: /^[0-9]+$/, message: "Must be numeric" }
                  })}
                  error={!!errors.postal_code} helperText={errors.postal_code?.message}
                />
              </Grid>
            </Grid>
          </Box>
        );
      case 3:
        return (
          <Box sx={{ mt: 2 }}>
            <Typography variant="h6" gutterBottom>Company Registration Step 3: Final Details</Typography>
            <Typography variant="body2" color="textSecondary" sx={{ mb: 2 }}>
                Review details and provide a brief description before finalizing.
            </Typography>
            
            {/* Description/About Field */}
            <TextField
                fullWidth
                multiline
                rows={4}
                label="Company Description (Optional)"
                defaultValue={formData.description || ''}
                {...register("description")}
                error={!!errors.description}
                helperText={errors.description?.message}
            />
            
          </Box>
        );
      default:
        return <Typography color="error">Invalid Step</Typography>;
    }
  };


  return (
    <Paper sx={{ p: 3, mt: 2, border: 1, borderColor: 'primary.main' }}>
      <Box component="form" onSubmit={handleSubmit(currentStep < 3 ? handleNext : onSubmitFinal)}>
        
        {renderStep()}

        <Box sx={{ mt: 3, display: 'flex', justifyContent: 'space-between' }}>
          {/* Back Button */}
          <Button
            variant="outlined"
            disabled={currentStep === 1 || isLoading}
            onClick={handleBack}
          >
            Back
          </Button>
          
          {/* Next/Submit Button */}
          {currentStep < 3 ? (
            <Button type="submit" variant="contained" disabled={isLoading}>
              Next
            </Button>
          ) : (
            <Button type="submit" variant="contained" color="success" disabled={isLoading}>
              {isLoading ? <CircularProgress size={24} color="inherit" /> : "Submit & Finish"}
            </Button>
          )}
        </Box>
      </Box>
    </Paper>
  );
};

export default CompanyRegistrationForm;