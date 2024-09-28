const express = require('express');
const router = express.Router();
const audioController = require('../controllers/audioController');
const upload = require('../config/upload'); 

router.get('/upload', audioController.render_uploadform);
router.post('/upload', upload.single('audioFile'), audioController.upload_audio);
router.get('/', audioController.renderall_audios);
router.get('/play/:id', audioController.play_audio); // Route to play audio by ID

module.exports = router;
