const { pool } = require('../config/db'); // Adjust the path if necessary

class Album {
    static create_album(title, artist, callback) {
        const query = 'INSERT INTO albums (title, artist) VALUES (?, ?)';
        pool.query(query, [title, artist])
            .then(result => callback(null, result))
            .catch(err => callback(err));
    } 

    static getall_albums(callback) {
        pool.query('SELECT * FROM albums')
            .then(result => callback(null, result[0])) // result[0] contains the rows
            .catch(err => callback(err));
    }

    static addto_album(audioId, albumId, callback) {
        const query = 'INSERT INTO audio_album (audio_id, album_id) VALUES (?, ?)';
        pool.query(query, [audioId, albumId])
            .then(result => callback(null, result))
            .catch(err => callback(err));
    }

    static getaudios_in_album(album_id, callback) { 
        const query = `
            SELECT audios.* FROM audios
            JOIN audio_album ON audios.id = audio_album.audio_id
            WHERE audio_album.album_id = ?
        `;
        pool.query(query, [album_id])
            .then(result => callback(null, result[0])) // result[0] contains the rows
            .catch(err => callback(err));
    }
}

module.exports = Album;
