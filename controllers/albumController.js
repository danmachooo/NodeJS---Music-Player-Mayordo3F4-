const Album = require('../models/albumModel');
const Audio = require('../models/audioModel');
const path = require('path');

module.exports = {
    create_album: (req, res) => {
        const { title, artist, released_date } = req.body;
        const coverPath = path.join('uploads/cover_image', req.file.filename); 

        Album.create_album(title, artist, coverPath, released_date, (err) => {
            if (err) {
                console.error('Error creating album:', err);
                return res.status(500).send('Internal Server Error');
            }
            res.redirect('/albums'); 
        });
    },

    renderall_albums: (req, res) => {
        Album.getall_albums((err, results) => {
            if (err) {
                console.error('Error retrieving albums:', err);
                return res.status(500).send('Internal Server Error');
            }
            res.render('albums', { albums: results }); 
        });
    },

    render_add_album_form: (req, res) => {
        res.render('add_album'); 
    },

    addto_album: (req, res) => {
        const { audioId, albumId } = req.body;

        Album.addto_album(audioId, albumId, (err) => {
            if (err) {
                console.error('Error adding audio to album:', err);
                return res.status(500).send('Internal Server Error');
            }
            res.redirect(`/albums/${albumId}`); 
        });
    },

    render_add_song_to_album_form: (req, res) => {
        const albumId = req.params.id;

        Audio.getall_Audios((err, audios) => {
            if (err) {
                console.error('Error fetching audios:', err);
                return res.status(500).send('Internal Server Error');
            }

            res.render('add_song_to_album', { albumId, audios });
        });
    },

    view_album: (req, res) => {
        const albumId = req.params.id;
    
        Album.get_album_with_songs(albumId, (err, albumData) => {
            if (err) {
                console.error('Error fetching album:', err);
                return res.status(500).send('Internal Server Error');
            }
    
            if (albumData.length === 0 || albumData[0].length === 0) {
                return res.status(404).send('Album not found');
            }
    
            // Access the first array (album data) from the result
            const albumInfo = albumData[0][0]; // Get the first object
    
            const uniqueSongs = new Set();
            const songs = [];
    
            // Loop through the albumData to construct songs array
            albumData[0].forEach(row => {
                if (!uniqueSongs.has(row.audioId)) {
                    uniqueSongs.add(row.audioId);
                    songs.push({
                        id: row.audioId,
                        title: row.audioTitle
                    });
                }
            });
    
            const album = {
                id: albumInfo.albumId,           
                title: albumInfo.albumTitle,
                artist: albumInfo.albumArtist,
                cover_image: albumInfo.coverImage,
                released_date: albumInfo.releasedDate,
                songs: songs                     
            };
    
            console.log('Album Data:', album); 
    
            res.render('view_album', { album });
        });
    },
};
