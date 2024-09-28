const multer = require('multer');
const path = require('path');

// Set up storage options for multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); // Define the upload folder
    },
    filename: (req, file, cb) => {
        // Use the original file name with a timestamp
        cb(null, `${Date.now()}_${file.originalname}`);
    },
});

// Initialize multer with the storage configuration
const upload = multer({ storage });

module.exports = upload;
