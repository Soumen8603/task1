// backend/src/controllers/companyController.js

const companyModel = require('../models/companyModel');
const cloudinary = require('../config/cloudinary');

const companyController = {

  // --- THIS FUNCTION WAS ACCIDENTALLY DELETED ---
  registerCompany: async (req, res) => {
    try {
      const owner_id = req.user.id;
      const profileData = req.body;
      const newProfile = await companyModel.createProfile(profileData, owner_id);
      res.status(201).json({
        success: true,
        message: 'Company profile created successfully',
        data: newProfile,
      });
    } catch (error) {
      console.error('Company Registration Error:', error);
      res.status(500).json({ success: false, message: 'Server error during company registration.' });
    }
  },

  // --- THIS FUNCTION WAS ACCIDENTALLY DELETED ---
  getProfile: async (req, res) => {
    try {
      const owner_id = req.user.id;
      // (Keeping the test logs from before)
      console.log(`[COMPANY_CONTROLLER] Step 1: Fetching profile for user ${owner_id}...`);
      const profile = await companyModel.getProfileByOwnerId(owner_id);
      console.log(`[COMPANY_CONTROLLER] Step 2: Database call FINISHED. Profile found: ${!!profile}`);

      if (!profile) {
        console.log('No profile found for user:', owner_id); 
        return res.status(404).json({ status: 404, message: 'Profile not found' });
      }
      res.status(200).json({ success: true, data: profile });
    } catch (error) {
      console.error('Get Profile Error:', error); 
      res.status(500).json({ success: false, message: 'Server error getting profile.' });
    }
  },

  // --- THIS FUNCTION WAS ACCIDENTALLY DELETED ---
  updateProfile: async (req, res) => {
    try {
      const owner_id = req.user.id;
      const profileData = req.body;
      const updatedProfile = await companyModel.updateProfileByOwnerId(profileData, owner_id);
      if (!updatedProfile) {
        return res.status(404).json({ success: false, message: 'Profile not found or update failed.' });
      }
      res.status(200).json({
        success: true,
        message: 'Company profile updated successfully',
        data: updatedProfile,
      });
    } catch (error) {
      console.error('Update Profile Error:', error);
      res.status(500).json({ success: false, message: 'Server error updating profile.' });
    }
  },

  // --- THIS IS THE NEWLY FIXED FUNCTION (from my last message) ---
  uploadLogo: async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ success: false, message: 'No file uploaded.' });
      }
      const owner_id = req.user.id;
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          folder: `company_logos/${owner_id}`,
          resource_type: 'image',
        },
        async (error, result) => {
          if (error || !result) {
            console.error('Cloudinary Upload Error:', error);
            return res.status(500).json({ success: false, message: 'Cloudinary upload failed.' });
          }
          const logo_url = result.secure_url;
          if (!logo_url) {
            return res.status(500).json({ success: false, message: 'Cloudinary did not return a logo URL.' });
          }
          // This line saves it to the database
          const updatedProfile = await companyModel.updateLogoUrl(logo_url, owner_id);
          res.status(200).json({
            success: true,
            message: 'Logo uploaded successfully',
            data: updatedProfile,
          });
        }
      );
      uploadStream.end(req.file.buffer);
    } catch (error) {
      console.error('Upload Logo Error:', error);
      res.status(500).json({ success: false, message: 'Server error uploading logo.' });
    }
  },

  // --- THIS IS THE NEWLY FIXED FUNCTION (from my last message) ---
  uploadBanner: async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ success: false, message: 'No file uploaded.' });
      }
      const owner_id = req.user.id;
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          folder: `company_banners/${owner_id}`,
          resource_type: 'image',
        },
        async (error, result) => {
          if (error || !result) {
            console.error('Cloudinary Upload Error:', error);
            return res.status(500).json({ success: false, message: 'Cloudinary upload failed.' });
          }
          const banner_url = result.secure_url;
          if (!banner_url) {
            return res.status(500).json({ success: false, message: 'Cloudinary did not return a banner URL.' });
          }
           // This line saves it to the database
          const updatedProfile = await companyModel.updateBannerUrl(banner_url, owner_id);
          res.status(200).json({
            success: true,
            message: 'Banner uploaded successfully',
            data: updatedProfile,
          });
        }
      );
      uploadStream.end(req.file.buffer);
    } catch (error) {
      console.error('Upload Banner Error:', error);
      res.status(500).json({ success: false, message: 'Server error uploading banner.' });
    }
  }
};

module.exports = companyController;