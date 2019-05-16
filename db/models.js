const faker = require('faker');
const ORM = require('./index.js');


const getFiveBooks = (authorId, callback) => {
  const fiveBooksQuery = `SELECT title FROM books WHERE author_id = ${authorId} ORDER BY average_rating LIMIT 5`;
  ORM.sequelize.query(fiveBooksQuery)
    .then(([results]) => {
      // separate out as its own function, then able to test its output
      const fiveBooks = {};
      fiveBooks.titles = [];
      for (let i = 0; i < results.length; i += 1) {
        fiveBooks.titles.push(results[i].title);
      }
      callback(null, fiveBooks);
    })
    .catch((err) => {
      console.log('err', err);
      callback(err);
    });
};

const getAuthorInfo = (bookId, callback) => {
  const authorQuery = `SELECT id, name, followers, biography, author_image FROM authors WHERE id IN (SELECT author_id FROM books WHERE id = ${bookId})`;
  ORM.sequelize.query(authorQuery)
    .then(([results]) => {
      const authorId = results[0].id;
      getFiveBooks(authorId, (err, books) => {
        if (err) { throw err; }
        ORM.sequelize.query('SELECT title, total_ratings, average_rating, year, description, cover_image FROM books WHERE title IN(:status)',
          { replacements: { status: books.titles } },
        ).then((details) => {
          results[0].titles = books.titles;
          results[0].bookDetails = details[0];
          callback(null, results[0]);
        })
      });
    })
    .catch((err) => {
      console.log('err', err);
      callback(err);
    });
};

// can probably delete this function as it's no longer needed
const getBookItemHoverWindow = (bookId, callback) => {
  const bookQuery = `SELECT title, total_ratings, average_rating, year, description FROM books WHERE id = ${bookId}`;
  ORM.sequelize.query(bookQuery)
    .then(([results]) => {
      callback(null, results[0]);
    })
    .catch((err) => {
      console.log('err', err);
      callback(err);
    });
};

// need to add post, put, delete

// const deleteAuthor = (bookId) => {
//   const deleteQuery = `DELETE FROM books WHERE id = ${bookId}`;
//   ORM.sequelize.query(deleteQuery)
//     .then((results) => {
//       console.log('deleted book', results);
//     })
//     .catch((err) => {
//       console.log('err in deleting book', err);
//     });
// };

const addAuthor = () => {
  const createFakeAuthor = () => ({
    name: faker.name.findName(),
    followers: faker.random.number(),
    biography: faker.lorem.paragraph(),
    author_image: faker.image.people(),
  });

  const author = createFakeAuthor();
  const addQuery = `INSERT INTO authors (name, followers, biography, author_image, createdAt, updatedAt) VALUES ("${author.name}", ${author.followers}, "${author.biography}", "${author.author_image}", ${CURDATE()}, ${CURDATE()}`;
  ORM.sequelize.query(addQuery)
    .then((results) => {
      console.log('added author', results);
    })
    .then((err) => {
      console.log('err in adding author', err);
    });
};

exports.getAuthorInfo = getAuthorInfo;
exports.getFiveBooks = getFiveBooks;
exports.getBookItemHoverWindow = getBookItemHoverWindow;
exports.deleteAuthor = deleteAuthor;
exports.addAuthor = addAuthor;
