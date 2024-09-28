const db = require('../config/db');

class Audio {
    static upload_audio(title, artist, duration, filePath, lyrics, callback) {
        const query = 'INSERT INTO audios (title, artist, duration, file_path, lyrics VALUES (?, ?, ?, ?, ?)';
        db.query(query, [title, artist, duration, filePath, lyrics], callback);
    }
    
    static getall_Audios(callback) {
        db.query('SELECT * FROM audios', callback);
    }

    static getaudios_byID(callback) {
        db.query('SELECT * FROM audios', callback);
    }

    static getaudio_byID(id, callback) {
        db.query('SELECT * FROM audios WHERE id = ?', [id], callback);
    }
}

module.exports = Audio;