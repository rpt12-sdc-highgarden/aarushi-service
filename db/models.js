const faker = require('faker');
// const ORM = require('./index.js');
const pool = require('./index.js');


// const getFiveBooks = (authorId, callback) => {
//   const fiveBooksQuery = `SELECT title FROM books WHERE author_id = ${authorId} ORDER BY average_rating LIMIT 5`;
//   ORM.sequelize.query(fiveBooksQuery)
//     .then(([results]) => {
//       // separate out as its own function, then able to test its output
//       const fiveBooks = {};
//       fiveBooks.titles = [];
//       for (let i = 0; i < results.length; i += 1) {
//         fiveBooks.titles.push(results[i].title);
//       }
//       callback(null, fiveBooks);
//     })
//     .catch((err) => {
//       console.log('err', err);
//       callback(err);
//     });
// };

const getAuthorInfo = (bookId, callback) => {
  pool.query(`SELECT id, name, followers, biography, author_image FROM authors WHERE id IN (SELECT author_id FROM books WHERE id = ${bookId})`);
};

// const getAuthorInfo = (bookId, callback) => {
//   const authorQuery = `SELECT id, name, followers, biography, author_image FROM authors WHERE id IN (SELECT author_id FROM books WHERE id = ${bookId})`;
//   ORM.sequelize.query(authorQuery)
//     .then(([results]) => {
//       const authorId = results[0].id;
//       getFiveBooks(authorId, (err, books) => {
//         if (err) { throw err; }
//         ORM.sequelize.query(`SELECT title, total_ratings, average_rating, year, description, cover_image FROM books WHERE author_id = ${authorId} ORDER BY average_rating DESC LIMIT 5`,
//           { replacements: { status: books.titles } },
//         ).then((details) => {
//           results[0].titles = books.titles;
//           results[0].bookDetails = details[0];
//           callback(null, results[0]);
//         })
//       });
//     })
//     .catch((err) => {
//       console.log('err', err);
//       callback(err);
//     });
// };

// // can probably delete this function as it's no longer needed
// const getBookItemHoverWindow = (bookId, callback) => {
//   const bookQuery = `SELECT title, total_ratings, average_rating, year, description FROM books WHERE id = ${bookId}`;
//   ORM.sequelize.query(bookQuery)
//     .then(([results]) => {
//       callback(null, results[0]);
//     })
//     .catch((err) => {
//       console.log('err', err);
//       callback(err);
//     });
// };

// const deleteAuthorAndBook = (id) => {
//   const deleteBookQuery = `DELETE FROM books WHERE author_id=${id}`;
//   const deleteAuthorQuery = `DELETE FROM authors WHERE id=${id}`;
//   ORM.sequelize.query(deleteBookQuery)
//     .then((results) => {
//       console.log('deleted book', results);
//       return ORM.sequelize.query(deleteAuthorQuery)
//         .then((authorResults) => {
//           console.log('deleted author', authorResults);
//         })
//         .catch(err => console.log('error in deleting author', err));
//     })
//     .catch(err => console.log('error in deleting book', err));
// };

// const addAuthor = () => {
//   const createFakeAuthor = () => ({
//     name: faker.name.findName(),
//     followers: faker.random.number(),
//     biography: faker.lorem.paragraph(),
//     author_image: faker.image.people(),
//   });

//   const author = createFakeAuthor();
//   const addQuery = `INSERT INTO authors (name, followers, biography, author_image, createdAt, updatedAt) VALUES ("${author.name}", ${author.followers}, "${author.biography}", "${author.author_image}", CURDATE(), CURDATE())`;
//   ORM.sequelize.query(addQuery)
//     .then((results) => {
//       console.log('added author', results);
//     })
//     .catch((err) => {
//       console.log('err in adding author', err);
//     });
// };

// const addFollowers = (bookId) => {
//   const addFollowersQuery = `UPDATE authors SET followers = followers + 1 WHERE id IN (SELECT author_id FROM books WHERE id = ${bookId})`;
//   ORM.sequelize.query(addFollowersQuery)
//     .then((results) => {
//       console.log('added followers', results);
//     })
//     .catch((err) => {
//       console.log('err in adding follower', err);
//     });
// };

exports.getAuthorInfo = getAuthorInfo;
// exports.getFiveBooks = getFiveBooks;
// exports.getBookItemHoverWindow = getBookItemHoverWindow;
// exports.deleteAuthorAndBook = deleteAuthorAndBook;
// exports.addAuthor = addAuthor;
// exports.addFollowers = addFollowers;