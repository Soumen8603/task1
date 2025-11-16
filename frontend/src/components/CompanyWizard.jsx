import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createCompanyProfile,
  uploadCompanyLogo,
  uploadCompanyBanner,
  updateCompanyProfile
} from "../store/companySlice";
import {
  Box,
  Stepper,
  Step,
  StepLabel,
  Button,
  Typography,
  LinearProgress,
} from "@mui/material";
import CompanyLogoBannerStep from "./CompanyLogoBannerStep";
import CompanyInfoStep from "./CompanyInfoStep";
import CompanySocialStep from "./CompanySocialStep";

// Three steps: Info, Logo/Banner, Social
const steps = ["Company Info", "Logo & Banner", "Social Media Profile"];

const initialData = {
  company_name: "",
  about_company: "",
  organizations_type: "",
  industry_type: "",
  team_size: "",
  company_website: "",
  linkedin: "",
  facebook: "",
  twitter: "",
  instagram: "",
  youtube: "",
  logo_url: "",
  banner_url: ""
};

const CompanyWizard = () => {
  const dispatch = useDispatch();
  const { profile, isSuccess, isLoading, isError } = useSelector((state) => state.company);

  const [step, setStep] = useState(0);
  // Initially use blank data, but hydrate with profile if available (for editing flow)
  const [fields, setFields] = useState(initialData);
  const [saving, setSaving] = useState(false);

  // Hydrate local state when backend gives profile (after create)
  useEffect(() => {
    if (profile) {
      setFields(f => ({
        ...f,
        ...profile
      }));
    }
    // eslint-disable-next-line
  }, [profile]);

  // On successful finish, reload dashboard
  useEffect(() => {
    if (isSuccess && !isLoading && !isError && step === steps.length) {
      window.location.reload();
    }
    // eslint-disable-next-line
  }, [isSuccess, isLoading, isError, step]);

  const stepProps = {
    fields,
    setFields,
    dispatch
  };

  // --- Step logic handlers ---
  // Next step
  const handleNext = async () => {
    if (step === 0) {
      // Always create company profile after first step, required for uploads
      setSaving(true);
      await dispatch(createCompanyProfile(fields));
      setSaving(false);
    }
    setStep((prev) => prev + 1);
  };

  // Back step
  const handleBack = () => {
    setStep((prev) => prev - 1);
  };

  // Logo/Banner Handlers for controlled step
  const handleLogoUpload = async (file) => {
    setSaving(true);
    await dispatch(uploadCompanyLogo(file));
    setSaving(false);
  };

  const handleBannerUpload = async (file) => {
    setSaving(true);
    await dispatch(uploadCompanyBanner(file));
    setSaving(false);
  };

  // Final submit (after last step)
  const handleFinish = async () => {
    setSaving(true);
    await dispatch(updateCompanyProfile(fields));
    setSaving(false);
    setStep(steps.length); // Triggers dashboard reload on next effect
  };

  // --- Step Rendering ---
  return (
    <Box sx={{ width: "100%", maxWidth: 700, mx: "auto", mt: 5 }}>
      <Typography variant="h5" align="center" sx={{ mb: 2 }}>
        Setup Progress
      </Typography>
      <LinearProgress
        variant="determinate"
        value={(step / (steps.length - 1)) * 100}
        sx={{ mb: 3 }}
      />
      <Stepper activeStep={step} alternativeLabel>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <Box sx={{ mt: 3 }}>
        {step === 0 && <CompanyInfoStep fields={fields} setFields={setFields} />}
        {step === 1 && (
          <CompanyLogoBannerStep
            fields={fields}
            setFields={setFields}
            dispatch={dispatch}
            handleLogoUpload={handleLogoUpload}
            handleBannerUpload={handleBannerUpload}
          />
        )}
        {step === 2 && <CompanySocialStep fields={fields} setFields={setFields} />}
      </Box>
      <Box sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}>
        <Button disabled={step === 0 || saving} onClick={handleBack}>
          Back
        </Button>
        {step === steps.length - 1 ? (
          <Button variant="contained" disabled={saving} onClick={handleFinish}>
            Finish
          </Button>
        ) : (
          <Button variant="contained" disabled={saving} onClick={handleNext}>
            Next
          </Button>
        )}
      </Box>
    </Box>
  );
};

export default CompanyWizard;
