const { pool } = require('../config/db'); // Import the pool from your db configuration

class Playlist {
    static create_playlist(name, callback) {
        const query = 'INSERT INTO playlist (name) VALUES (?)';
        pool.query(query, [name])
            .then(result => callback(null, result))
            .catch(err => callback(err));
    }

    static getall_playlist(callback) {
        pool.query('SELECT * FROM playlist')
            .then(result => callback(null, result[0])) // result[0] contains the rows
            .catch(err => callback(err));
    }

    static addto_playlist(audio_id, playlist_id, callback) {
        const query = 'INSERT INTO audio_playlist (audio_id, playlist_id) VALUES (?, ?)';
        pool.query(query, [audio_id, playlist_id])
            .then(result => callback(null, result))
            .catch(err => callback(err));
    }

    static getaudios_in_playlist(playlist_id, callback) {
        const query = `
            SELECT audios.* FROM audios
            JOIN audio_playlist ON audios.id = audio_playlist.audio_id
            WHERE audio_playlist.playlist_id = ?
        `;
        pool.query(query, [playlist_id])
            .then(result => callback(null, result[0])) // result[0] contains the rows
            .catch(err => callback(err));
    }
}

module.exports = Playlist;
