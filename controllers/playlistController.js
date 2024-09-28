const Playlist = require('../models/playlistModel');

module.exports = {
    create_playlist: (req, res) => {
        const { name } = req.body;
        Playlist.create_playlist(name, (err) => {
            if (err) {
                console.error('Error creating playlist:', err);
                return res.status(500).send('Internal Server Error'); 
            }
            res.redirect('/playlists'); // Redirect on success
        });
    },

    renderall_playlists: (req, res) => {
        Playlist.getall_playlist((err, results) => {
            if (err) {
                console.error('Error retrieving playlists:', err);
                return res.status(500).send('Internal Server Error'); 
            }
            res.render('playlists', { playlists: results }); 
        });
    },

    addto_playlist: (req, res) => {
        const { audioId, playlistId } = req.body;
        Playlist.addto_playlist(audioId, playlistId, (err) => {
            if (err) {
                console.error('Error adding to playlist:', err);
                return res.status(500).send('Internal Server Error'); 
            }
            res.redirect('/playlists'); 
        });
    },
};
