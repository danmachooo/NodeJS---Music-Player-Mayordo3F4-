const Album = require('../models/albumModel');

module.exports = {
    create_album: (req, res) => {
        const { title, artist, cover } = req.body;
        Album.create_album(title, artist, (err) => {
            if (err) {
                console.error('Error creating album:', err);
                return res.status(500).send('Internal Server Error'); // Send error response
            }
            res.redirect('/albums');
        });
    },

    renderall_albums: (req, res) => {
        Album.getall_albums((err, results) => { // Fixed method name
            if (err) {
                console.error('Error retrieving albums:', err);
                return res.status(500).send('Internal Server Error'); // Send error response
            }
            res.render('albums', { albums: results });
        });
    },

    addto_album: (req, res) => {
        const { audioId, albumId } = req.body;
        Album.addto_album(audioId, albumId, (err) => { // Fixed the comma typo
            if (err) {
                console.error('Error adding audio to album:', err);
                return res.status(500).send('Internal Server Error'); // Send error response
            }
            res.redirect('/albums');
        });
    },
};
