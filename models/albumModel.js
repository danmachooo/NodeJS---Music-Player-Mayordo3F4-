const { pool } = require('../config/db');

class Album {
    static create_album(title, artist, coverPath, released_date, callback) {
        const query = 'INSERT INTO albums (title, artist, cover_image, released_date) VALUES (?, ?, ?, ?)';
        pool.query(query, [title, artist, coverPath, released_date])
            .then(result => callback(null, result))
            .catch(err => callback(err));
    }

    static getall_albums(callback) {
        const query = 'SELECT * FROM albums';
        pool.query(query)
            .then(result => callback(null, result[0]))
            .catch(err => callback(err));
    }

    static addto_album(audioId, albumId, callback) {
        const checkQuery = `
            SELECT COUNT(*) AS count
            FROM album_audio
            WHERE album_id = ? AND audio_id = ?
        `;

        pool.query(checkQuery, [albumId, audioId])
            .then(result => {
                const count = result[0][0].count;
                if (count > 0) {
                    return callback(new Error('Song already exists in the album'));
                }

                const insertQuery = `
                    INSERT INTO album_audio (album_id, audio_id)
                    VALUES (?, ?)
                `;

                return pool.query(insertQuery, [albumId, audioId]);
            })
            .then(() => {
                callback(null);
            })
            .catch(err => {
                console.error('SQL Error:', err);
                callback(err);
            });
    }

    static get_album_with_songs(albumId, callback) {
        const query = `
            SELECT 
                a.id AS albumId, 
                a.title AS albumTitle, 
                a.artist AS albumArtist, 
                a.cover_image AS coverImage, 
                a.released_date AS releasedDate, 
                au.id AS audioId, 
                au.title AS audioTitle 
            FROM albums a
            LEFT JOIN album_audio aa ON a.id = aa.album_id
            LEFT JOIN audios au ON au.id = aa.audio_id
            WHERE a.id = ?
        `;

        pool.query(query, [albumId])
            .then(result => {
                callback(null, result);
            })
            .catch(err => {
                console.error('SQL Error:', err);
                callback(err);
            });
    }
}

module.exports = Album;
