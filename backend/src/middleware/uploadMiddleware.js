const multer = require('multer');

// Configure multer to store files in memory as buffers
const storage = multer.memoryStorage();

// Set up file filter to only accept images
const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image/')) {
    cb(null, true); // Accept the file
  } else {
    cb(new Error('Not an image! Please upload an image.'), false); // Reject the file
  }
};

// Initialize multer with storage and file filter
const upload = multer({ 
  storage: storage,
  fileFilter: fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 } // 5MB file size limit
});

module.exports = upload;