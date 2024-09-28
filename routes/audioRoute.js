const express = require('express');
const router = express.Router();
const audioController = require('../controllers/audioController');

router.get('/', audioController.renderall_audios);
router.get('/upload', audioController.render_uploadform);
router.post('/upload', audioController.upload_audio);
router.get('/play/:id', audioController.play_audio);

module.exports = router;