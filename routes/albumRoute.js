
const express = require('express');
const router = express.Router();
const albumController = require('../controllers/albumController');

router.get('/', albumController.renderall_albums);
router.post('/', albumController.create_album);
router.post('/add', albumController.addto_album);

module.exports = router;
