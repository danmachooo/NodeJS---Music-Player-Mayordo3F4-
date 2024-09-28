const db = require('../config/db');

class Playlist {
    static create_playlist(name, callback) {
        const query = 'INSERT INTO playlist (name) VALUES (?)';
        db.query(query, [name], callback);
    }

    static getall_playlist(callback) {
        db.query('SELECT * FROM playlist', callback);
    }

    static addto_playlist(audio_id, playlist_id, callback) {
        const query = 'INSERT INTO audio_playlist (audio_id, playlist_id) VALUES (?, ?)';
        db.query(query, [audio_id, playlist_id], callback);
    }

    static getaudios_in_playlist(playlist_id, callback) {
        const query = `
            SELECT audios.* FROM audios
            JOIN audio_playlist ON audios.id = audio_playlist.audio_id
            WHERE audio_playlist.playlist_id = ?
        `;
        db.query(query, [playlistId], callback);
    }
}

module.exports = Playlist;