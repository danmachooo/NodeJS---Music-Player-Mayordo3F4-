const Audio = require('../models/audioModel');
const path = require('path');
const mm = require('music-metadata');


module.exports = {
    // Method to handle audio uploads
    upload_audio: (req, res) => {
        const { title, lyrics, artist } = req.body; 
        const filePath = path.join(__dirname, '../uploads/', req.file.filename);
 
        // Extract duration
        mm.parseFile(filePath)
            .then(metadata => {
                const duration = metadata.format.duration; // Duration in seconds

                // Call your Audio model's upload_audio method with the correct parameters
                Audio.upload_audio(title, artist, duration, req.file.filename, lyrics, (err) => {
                    if (err) {
                        console.error(err);
                        return res.status(500).send('Error uploading audio.');
                    }
                    res.redirect('/');
                });
            })
            .catch(err => {
                console.error(err);
                return res.status(500).send('Error reading audio metadata.');
            });
    },
    
    // Method to render the upload form
    render_uploadform: (req, res) => {
        res.render('upload');
    },

    // Method to play audio
    play_audio: (req, res) => {
        const audioId = req.params.id;
        Audio.getaudio_byID(audioId, (err, result) => {
            if (err) {
                console.error(err); // Log any error
                return res.status(500).send('Error retrieving audio.');
            }
            console.log(result[0]); // Inspect the audio object
            res.render('play', { audio: result[0] });
        });
    },
    

    // Method to render all audio files
    renderall_audios: (req, res) => {
        Audio.getall_Audios((err, results) => {
            if (err) {
                console.error(err);
                return res.status(500).send('Error retrieving audio list.');
            }
            res.render('index', { audios: results }); // Render index with the list of audios
        });
    },
};
