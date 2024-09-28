const db = require('../')

class Album {
    static create_album(title, artist, callback) {
        const query = 'INSERT INTO albums (title, artist) VALUES (?, ?)';
        db.query(query, [title, artist], callback);
    } 

    static getall_albums(callback) {
        db.query('SELECT * FROM albums', callback);
    }

    static addto_album(audioId, albumId, callback) {
        const query = 'INSERT INTO audio_album (audio_id, album_id) VALUES (?, ?)';
        db.query(query, [audioId, albumId], callback);
    }

    static getaudios_in_album(album_id, callback) { 
        const query = `
            SELECT audios.* FROM audios
            JOIN audio_album ON audios.id = audio_album.audio_id
            WHERE audio_album.album_id = ?
        `;
        db.query(query, [album_id], callback);
    }
}

module.exports = Album;