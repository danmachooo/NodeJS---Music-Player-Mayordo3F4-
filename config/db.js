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

        const createUsersTableQuery = `
            CREATE TABLE IF NOT EXISTS users (
                id INT AUTO_INCREMENT PRIMARY KEY,
                name VARCHAR(255) NOT NULL,
                email VARCHAR(255) NOT NULL UNIQUE
            );
        `;

        await connection.end();
    } 
    catch (error) {
        console.error('Error initializing database: ', error);
        throw error;        
    }
};

module.exports = { init_db, };