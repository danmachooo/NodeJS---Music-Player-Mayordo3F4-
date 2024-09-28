const Album = require('../models/albumModel');

module.exports = {
    create_album: (req, res) => {
        const {title, artist} = req.body;
        Album.create_album(title, artist, (err) => {
            if(err) throw err;
            res.redirect('/albums');
        });
    },

    renderall_albums: (req, res) => {
        Album.renderall_albums((err, results) => {
            if(err) throw err;
            res.render('albums', {albums: results});
        });
    },

    addto_album: (req, res) => {
        const {audioId, albumId} = req.body;
        Album.addto_album(audioId. albumId, (err) => {
            if (err) throw err;
            res.redirect('/albums');
        });
    },
};