const Audio = require('../models/audioModel');

module.exports = {
    upload_audio: (req, res) => {
        const { title, filePath, lyrics } = req.body;
        Audio.upload_audio(title, filePath, lyrics, (err) => {
            if(err) throw err;
            res.redirect('/');
        });
    },

    render_uploadform: (req, res) => {
        res.render('upload');
    },

    play_audio: (req, res) => {
        const audioId = req.params.id;
        Audio.getaudio_byID(audioId, (err, result) => {
            if(err) throw err;
            res.render('index', {audio: result[0]});
        })
    },

    renderall_audios: (req, res) => {
        Audio.getall_Audios((err, results) => {
            if(err) throw err;
            res.render('index', {audios: results});
        });
    },
};