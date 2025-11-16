const cloudinary = require('cloudinary').v2;

cloudinary.config({ 
  cloud_name: 'dig9z8wsl', // <-- You already found this!
  api_key: '566899323479696', // <-- Find this on the "Home" page
  api_secret: 'cTuLSnZXkK9mR4mCYv1s2c5SW4o' // <-- Find this on the "Home" page
});

module.exports = cloudinary;