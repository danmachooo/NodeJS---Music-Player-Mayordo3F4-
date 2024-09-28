const Audio = require('../models/audioModel');
const path = require('path');

module.exports = {
    upload_audio: (req, res) => {
        const { title, lyrics, artist } = req.body;
        const filePath = path.join(__dirname, '../uploads/audios', req.file.filename);
        console.log('Uploaded audio file path:', filePath);

        Audio.upload_audio(title, artist, req.file.filename, lyrics, (err) => {
            if (err) {
                console.error('Error uploading audio:', err);
                return res.status(500).send('Error uploading audio.');
            }
            res.redirect('/'); 
        });
    },
    
    render_uploadform: (req, res) => {
        res.render('upload');
    },

    play_audio: (req, res) => {
        const audioId = req.params.id;
        console.log('Playing audio with ID:', audioId);
        
        Audio.getAudioById(audioId, (err, audio) => {
            if (err) {
                console.error('Error retrieving audio:', err);
                return res.status(500).send('Internal Server Error');
            }
            if (!audio || !audio[0]) {
                return res.status(404).send('Audio not found');
            }
            console.log('Catching: ', audio[0]);
            console.log('Audio file path:', audio[0].file_path);
            res.render('play', { audio: audio[0] });
        });
    },

    renderall_audios: (req, res) => {
        Audio.getall_Audios((err, results) => {
            if (err) {
                console.error('Error retrieving audio list:', err);
                return res.status(500).send('Error retrieving audio list.');
            }
            console.log('Retrieved audios:', results);
            res.render('index', { audios: results });
        });
    }
};
