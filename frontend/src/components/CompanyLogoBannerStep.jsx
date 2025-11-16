// src/components/CompanyLogoBannerStep.jsx

import React, { useRef } from "react";
import { Card, CardContent, Box, Typography } from "@mui/material";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { uploadCompanyLogo, uploadCompanyBanner } from "../store/companySlice";

export default function CompanyLogoBannerStep({ fields, setFields, dispatch }) {
  const logoInput = useRef();
  const bannerInput = useRef();

  const handleFileUpload = (type, e) => {
    const file = e.target.files[0];
    if (!file) return;
    if (type === "logo") {
      dispatch(uploadCompanyLogo(file)).then(res => {
        if (res.error || !res.payload || !res.payload.data) {
          alert("Logo upload failed");
          return;
        }
        setFields(f => ({ ...f, logo_url: res.payload.data.logo_url || "" }));
      });
    } else {
      dispatch(uploadCompanyBanner(file)).then(res => {
        if (res.error || !res.payload || !res.payload.data) {
          alert("Banner upload failed");
          return;
        }
        setFields(f => ({ ...f, banner_url: res.payload.data.banner_url || "" }));
      });
    }
  };

  return (
    <Card>
      <CardContent>
        <Typography variant="subtitle1">Logo & Banner Image</Typography>
        <Box sx={{ display: "flex", gap: 2, mt: 2 }}>
          {/* Logo Upload */}
          <Box
            flex={1}
            sx={{
              border: "2px dashed #ccc",
              minHeight: 120,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer"
            }}
            onClick={() => logoInput.current.click()}
          >
            <input
              type="file"
              accept="image/*"
              ref={logoInput}
              style={{ display: "none" }}
              onChange={e => handleFileUpload("logo", e)}
            />
            {fields.logo_url ? (
              <img src={fields.logo_url} alt="logo" style={{ height: 60, marginBottom: 8 }} />
            ) : (
              <>
                <CloudUploadIcon fontSize="large" color="action" />
                <Typography>Upload Logo</Typography>
                <Typography variant="caption" color="textSecondary">
                  Larger than 400px. Max 5MB.
                </Typography>
              </>
            )}
          </Box>
          {/* Banner Upload */}
          <Box
            flex={1}
            sx={{
              border: "2px dashed #ccc",
              minHeight: 120,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer"
            }}
            onClick={() => bannerInput.current.click()}
          >
            <input
              type="file"
              accept="image/*"
              ref={bannerInput}
              style={{ display: "none" }}
              onChange={e => handleFileUpload("banner", e)}
            />
            {fields.banner_url ? (
              <img src={fields.banner_url} alt="banner" style={{ width: "100%", height: 60, objectFit: "cover", marginBottom: 8 }} />
            ) : (
              <>
                <CloudUploadIcon fontSize="large" color="action" />
                <Typography>Upload Banner</Typography>
                <Typography variant="caption" color="textSecondary">
                  1520x400px jpg/png, 5MB max.
                </Typography>
              </>
            )}
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
}
