/*
//using sequelize, going to try pure mysql
require('dotenv').config();
const Sequelize = require('sequelize');

const sequelize = new Sequelize('goodreads', 'root', '', {
  dialect: 'mysql',
});

sequelize
  .authenticate()
  .then(() => {
    console.log('connection connected!');
  })
  .catch((err) => {
    console.error('unable to connect to db', err);
  });

const Authors = sequelize.define('authors', {
  id: {
    autoIncrement: true,
    type: Sequelize.INTEGER,
    primaryKey: true,
  },
  name: Sequelize.STRING,
  followers: Sequelize.INTEGER,
  biography: Sequelize.TEXT,
  author_image: Sequelize.STRING,
});

const Books = sequelize.define('books', {
  id: {
    autoIncrement: true,
    type: Sequelize.INTEGER,
    primaryKey: true,
  },
  title: Sequelize.STRING,
  year: Sequelize.INTEGER,
  total_ratings: Sequelize.INTEGER,
  average_rating: Sequelize.DECIMAL,
  description: Sequelize.TEXT,
  cover_image: Sequelize.TEXT,
  author_id: {
    type: Sequelize.INTEGER,
    // references: {
    //   model: Authors,
    //   key: 'id',
    // },
  },
});


Authors.sync();
Books.sync();

exports.Authors = Authors;
exports.Books = Books;
exports.sequelize = sequelize;
*/

const mysql = require('mysql');

const pool = mysql.createPool({
  connectionLimit: 10,
  acquireTimeout: 1000000,
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
