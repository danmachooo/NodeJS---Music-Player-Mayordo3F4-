const { query } = require('express');
const mysql = require('mysql2/promise');

const dbConfig = {
    host: 'localhost',
    user: 'root',
    password: ''
};

const dbName = 'MayordoAudioAppDB';

const init_db = async () => {
    try {
        const connection = await mysql.createConnection(dbConfig);
        console.log('Connected to MySQL server.');

        const [databases] = await connection.query('SHOW DATABASES LIKE ?', [dbName]);

        if(databases.length === 0) {
            console.log(`Databases ${dbName} doesn't exist. Creating...`);
            await connection.query(`CREATE DATABASE ${dbName}`);
            console.log(`Database ${dbName} has been created!`) 
        } 
        else {
            console.log(`Database ${dbName} already exists!`);
        }

        await connection.changeUser({database: dbName});

        const createAudiosTableQuery = `
                CREATE TABLE IF NOT EXISTS audios (
                    id INT AUTO_INCREMENT PRIMARY KEY,
                    title VARCHAR(255) NOT NULL,
                    file_path VARCHAR(255) NOT NULL,
                    lyrics TEXT
                );
            `;

            const createAlbumsTableQuery = `
                CREATE TABLE IF NOT EXISTS albums (
                    id INT AUTO_INCREMENT PRIMARY KEY,
                    title VARCHAR(255) NOT NULL,
                    artist VARCHAR(255) NOT NULL
                );
            `;

            const createPlaylistTableQuery = `
                CREATE TABLE IF NOT EXISTS playlist (
                    id INT AUTO_INCREMENT PRIMARY KEY,
                    name VARCHAR(255) NOT NULL
                );
            `;

            const createAudioAlbumTableQuery = `
                CREATE TABLE IF NOT EXISTS audio_album (
                    audio_id INT,
                    album_id INT,
                    PRIMARY KEY (audio_id, album_id),
                    FOREIGN KEY (audio_id) REFERENCES audios(id) ON DELETE CASCADE,
                    FOREIGN KEY (album_id) REFERENCES albums(id) ON DELETE CASCADE
                );
            `;

            const createAudioPlaylistTableQuery = `
                CREATE TABLE IF NOT EXISTS audio_playlist (
                    audio_id INT,
                    playlist_id INT,
                    PRIMARY KEY (audio_id, playlist_id),
                    FOREIGN KEY (audio_id) REFERENCES audios(id) ON DELETE CASCADE,
                    FOREIGN KEY (playlist_id) REFERENCES playlist(id) ON DELETE CASCADE
                );
            `;

            const createAudioQueueTableQuery = `
                CREATE TABLE IF NOT EXISTS audio_queue (
                    id INT AUTO_INCREMENT PRIMARY KEY,
                    audio_id INT,
                    FOREIGN KEY (audio_id) REFERENCES audios(id) ON DELETE CASCADE
                );
            `;
        await connection.query(createAudiosTableQuery);
        await connection.query(createAlbumsTableQuery);
        await connection.query(createPlaylistTableQuery);
        await connection.query(createAudioAlbumTableQuery);
        await connection.query(createAudioPlaylistTableQuery);
        await connection.query(createAudioQueueTableQuery);

        console.log('All tables are ready!');

        await connection.end();
    } 
    catch (error) {
        console.error('Error initializing database: ', error);
        throw error;        
    }
};

module.exports = { init_db, query };