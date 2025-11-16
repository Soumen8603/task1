import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateCompanyProfile, uploadCompanyLogo, uploadCompanyBanner } from '../store/companySlice';
import {
  Box, Typography, Card, CardContent, Button, Avatar, TextField, Dialog, DialogTitle, DialogContent, DialogActions, Link, Stack
} from '@mui/material';

const socialFields = [
  { label: "LinkedIn", key: "linkedin" },
  { label: "Facebook", key: "facebook" },
  { label: "Twitter", key: "twitter" },
  { label: "Instagram", key: "instagram" },
  { label: "YouTube", key: "youtube" },
];

const CompanyProfile = () => {
  const dispatch = useDispatch();
  const { profile, isLoading } = useSelector(state => state.company);

  const [editOpen, setEditOpen] = useState(false);
  const [editData, setEditData] = useState(profile || {});

  // Sync editData when profile changes
  React.useEffect(() => {
    if (profile) setEditData(profile);
  }, [profile]);

  // Image upload handlers
  const handleLogoChange = (e) => {
    if (e.target.files[0]) {
      dispatch(uploadCompanyLogo(e.target.files[0]));
    }
  };
  const handleBannerChange = (e) => {
    if (e.target.files[0]) {
      dispatch(uploadCompanyBanner(e.target.files[0]));
    }
  };

  // Edit handlers
  const handleChange = (e) => {
    setEditData({ ...editData, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    dispatch(updateCompanyProfile(editData));
    setEditOpen(false);
  };

  if (!profile) return null;

  return (
    <Box
      sx={{
        bgcolor: '#f8fafc',
        minHeight: '100vh',
        width: '100vw',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      <Card sx={{
        width: 400,
        borderRadius: 4,
        boxShadow: 4,
        mx: 'auto',
        my: 'auto'
      }}>
        <CardContent>
          {profile.banner_url ? (
            <Box sx={{ mb: 2 }}>
              <img src={profile.banner_url}
                style={{
                  width: '100%', height: 100, objectFit: 'cover', borderRadius: 8
                }}
                alt="Company Banner" />
            </Box>
          ) : (
            <Box sx={{
              width: '100%',
              height: 100,
              backgroundColor: '#eee',
              mb: 2, borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center'
            }}>
              <Typography color="textSecondary">No Banner Set</Typography>
            </Box>
          )}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
            {profile.logo_url ? (
              <Avatar src={profile.logo_url} sx={{ width: 60, height: 60 }} />
            ) : (
              <Avatar sx={{ bgcolor: "primary.light", width: 60, height: 60 }}>
                {profile.company_name?.charAt(0).toUpperCase()}
              </Avatar>
            )}
            <Typography variant="h5">{profile.company_name} Dashboard</Typography>
          </Box>
          <Typography sx={{ mb: 1 }}>{profile.about_company || "No description yet."}</Typography>
          <Typography variant="body2" sx={{ mb: 1 }}>
            <strong>Industry:</strong> {profile.industry_type || "N/A"}<br/>
            <strong>Type:</strong> {profile.organizations_type || "N/A"}<br/>
            <strong>Team size:</strong> {profile.team_size || "N/A"}<br/>
            <strong>Website:</strong>{" "}
            {profile.company_website ?
              <a href={profile.company_website} target="_blank" rel="noopener noreferrer">{profile.company_website}</a>
              : "N/A"}
          </Typography>
          {/* SOCIAL LINKS DISPLAY AS ONLY PLATFORM NAME */}
          <Stack direction="row" spacing={2} sx={{ flexWrap: 'wrap', mb: 2 }}>
            {socialFields.map(({ label, key }) =>
              profile[key] && profile[key].trim() ? (
                <Link href={profile[key]} color="primary" target="_blank" rel="noopener" key={key} underline="hover" fontWeight={600}>
                  {label}
                </Link>
              ) : null
            )}
          </Stack>
          <Box sx={{ mt: 2, display: 'flex', flexDirection: 'column', gap: 1 }}>
            <Button variant="contained" onClick={() => setEditOpen(true)}>
              Edit Profile
            </Button>
            <input type="file" accept="image/*"
              style={{ display: 'none' }}
              id="logo-upload"
              onChange={handleLogoChange}
            />
            <label htmlFor="logo-upload">
              <Button variant="outlined" component="span" sx={{ mt: 1 }}>
                Set Logo
              </Button>
            </label>
            <input type="file" accept="image/*"
              style={{ display: 'none' }}
              id="banner-upload"
              onChange={handleBannerChange}
            />
            <label htmlFor="banner-upload">
              <Button variant="outlined" component="span" sx={{ mt: 1 }}>
                Set Banner
              </Button>
            </label>
          </Box>
        </CardContent>
      </Card>
      {/* --- EDIT DIALOG --- */}
      <Dialog open={editOpen} onClose={() => setEditOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Edit Company Profile</DialogTitle>
        <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <TextField label="Company Name" name="company_name" value={editData.company_name || ''} onChange={handleChange} />
          <TextField label="About Company" name="about_company" value={editData.about_company || ''} onChange={handleChange} multiline rows={2} />
          <TextField label="Industry Type" name="industry_type" value={editData.industry_type || ''} onChange={handleChange} />
          <TextField label="Organization Type" name="organizations_type" value={editData.organizations_type || ''} onChange={handleChange} />
          <TextField label="Team Size" name="team_size" value={editData.team_size || ''} onChange={handleChange} type="number" />
          <TextField label="Website" name="company_website" value={editData.company_website || ''} onChange={handleChange} />
          {/* SOCIAL MEDIA EDIT FIELDS */}
          {socialFields.map(({ label, key }) => (
            <TextField
              key={key}
              label={label}
              name={key}
              value={editData[key] || ''}
              onChange={handleChange}
              fullWidth
            />
          ))}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setEditOpen(false)} variant="outlined">Cancel</Button>
          <Button onClick={handleSave} variant="contained" disabled={isLoading}>Save</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default CompanyProfile;
