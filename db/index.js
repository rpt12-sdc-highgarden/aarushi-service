const mysql = require('mysql');

const pool = mysql.createPool({
  connectionLimit: 10,
  acquireTimeout: 10000000,
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'goodreads',
});

pool.getConnection((err, connection) => {
  if (err) {
    if (err.code === 'PROTOCOL_CONNECTION_LOST') {
      console.error('Database connection was closed.');
    }
    if (err.code === 'ER_CON_COUNT_ERROR') {
      console.error('Database has too many connections.');
    }
    if (err.code === 'ECONNREFUSED') {
      console.error('Database connection was refused.');
    }
  }
  if (connection) connection.release();
});

pool.query('CREATE TABLE IF NOT EXISTS authors (id int NOT NULL AUTO_INCREMENT PRIMARY KEY, name VARCHAR(50), followers INT, biography TEXT, author_image VARCHAR(40))', (error, results) => {
  if (error) {
    console.log('error in creating authors table', error);
  } else {
    console.log('authors table created', results);
  }
});

pool.query('CREATE TABLE IF NOT EXISTS books (id int NOT NULL AUTO_INCREMENT PRIMARY KEY, title VARCHAR(50), year INT, total_ratings INT, average_rating DECIMAL, description TEXT, cover_image TEXT, author_ID INT NOT NULL)', (error, results) => {
  if (error) {
    console.log('error in creating books table', error);
  } else {
    console.log('books table created', results);
  }
});

module.exports = pool;
