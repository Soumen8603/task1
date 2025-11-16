import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getCompanyProfile, resetCompany } from "../store/companySlice";
import { logout } from "../store/authSlice";
import {
  Box,
  CircularProgress,
  Typography,
  Container,
  Button,
} from "@mui/material";
import CompanyWizard from "../components/CompanyWizard";
import CompanyProfile from "../components/CompanyProfile";

export default function Dashboard() {
  const dispatch = useDispatch();

  const { profile, isLoading, isSuccess, isError } = useSelector((state) => state.company);
  const { token, isAuthenticated } = useSelector((state) => state.auth);

  // Deliberately trigger profile fetch whenever token updates (even after initial login)
  useEffect(() => {
    if (token && isAuthenticated) {
      dispatch(getCompanyProfile());
    }
  }, [dispatch, token, isAuthenticated]);

  // Defensive fetch again if token appears (handles edge case where token comes AFTER mount)
  useEffect(() => {
    if (token && isAuthenticated && (!isSuccess && !isError)) {
      dispatch(getCompanyProfile());
    }
    // eslint-disable-next-line
  }, [token, isAuthenticated, isSuccess, isError, dispatch]);

  // Profile completeness check
  const isProfileComplete =
    !!profile &&
    typeof profile === "object" &&
    Object.keys(profile).length > 0 &&
    !!profile.company_name &&
    !!profile.company_name.trim();

  const renderContent = () => {
    if (isLoading || (!isSuccess && !isError)) {
      return (
        <Container>
          <Box sx={{ display: "flex", justifyContent: "center", mt: 10 }}>
            <CircularProgress />
            <Typography sx={{ ml: 2, alignSelf: "center" }}>
              Loading profile...
            </Typography>
          </Box>
        </Container>
      );
    }

    if (isSuccess && isProfileComplete) {
      return <CompanyProfile profile={profile} />;
    }

    if ((isSuccess && !isProfileComplete) || isError) {
      return <CompanyWizard />;
    }

    return <CompanyWizard />;
  };

  return (
    <Box
      sx={{
        bgcolor: "#f8fafc",
        minHeight: "100vh",
        width: "100vw",
        position: "relative",
        p: 2,
      }}
    >
      <Button
        variant="text"
        color="error"
        sx={{
          position: "fixed",
          top: 16,
          right: 16,
          fontWeight: 600,
          zIndex: 10,
        }}
        onClick={() => dispatch(logout())}
      >
        Logout
      </Button>
      <Box
        sx={{
          minHeight: "100vh",
          width: "100vw",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          pt: 4,
          boxSizing: "border-box",
        }}
      >
        {renderContent()}
      </Box>
    </Box>
  );
}
