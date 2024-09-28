const express = require('express');
const router = express.Router();
const albumController = require('../controllers/albumController'); // Ensure this path is correct
const multer = require('multer');

// Multer storage configuration for cover images
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/cover_image'); // Path for storing cover images
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '_' + file.originalname); // Ensure unique filenames
    }
});

const upload = multer({ storage });

// Routes for albums
router.get('/', albumController.renderall_albums); // List all albums
router.get('/add', albumController.render_add_album_form); // Render the form to add a new album
router.post('/add', upload.single('cover_image'), albumController.create_album); // Handle new album creation
router.get('/:id', albumController.view_album); // View a specific album with songs
router.get('/:id/add-audio', albumController.render_add_song_to_album_form); // Render form to add a song to the album
router.post('/:id/addto', albumController.addto_album); // Handle adding a song to the specific album

module.exports = router;
