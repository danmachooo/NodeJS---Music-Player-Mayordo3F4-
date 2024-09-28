const { pool } = require('../config/db'); // Import the pool from your db configuration

class Audio {
    static upload_audio(title, artist, filePath, lyrics, callback) {
        const query = 'INSERT INTO audios (title, artist, file_path, lyrics) VALUES (?, ?, ?, ?)';
        pool.query(query, [title, artist, filePath, lyrics])
            .then(result => callback(null, result))
            .catch(err => callback(err));
    }
    
    static getAudioById(id, callback) {
        pool.query('SELECT * FROM audios WHERE id = ?', [id])
            .then(result => callback(null, result[0])) 
    }
    

    static getall_Audios(callback) {
        pool.query('SELECT * FROM audios')
            .then(result => callback(null, result[0])) 
            .catch(err => callback(err));
    }
    
}

module.exports = Audio;
