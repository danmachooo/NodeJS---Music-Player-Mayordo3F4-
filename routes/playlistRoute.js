const express = require('express');
const router = express.Router();
const playlistController = require('../controllers/playlistController');

router.get('/', playlistController.renderall_playlists);
router.post('/', playlistController.create_playlist);
router.post('/add', playlistController.addto_playlist);

module.exports = router;
