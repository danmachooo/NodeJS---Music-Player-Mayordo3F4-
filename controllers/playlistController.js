const Playlist = require('../models/playlistModel');
const { renderall_albums } = require('./albumController');

module.exports = {
    create_playlist: (req, res) => {
        const { name } = req.body;
        Playlist.create_playlist(name, (err) => {
            if(err) throw err;
            res.redirect('/playlists')
        });
    },

    renderall_playlists: (req, res) => {
        Playlist.getall_playlist((err, results) => {
            if(err) throw err;
            res.render('playlists', {playlists: results});
        });
    },

    addto_playlist: (req, res) => {
        const { audioId, playlistId } = req.body;
        Playlist.addto_playlist(audioId, playlistId, (err) => {
            if(err) throw err;
            res.redirect('/playlists');
        });
    },
};