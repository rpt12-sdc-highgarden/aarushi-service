const faker = require('faker');
const pool = require('./index.js');

const getAuthorInfo = (bookId, callback) => {
  pool.query(`SELECT id, name, followers, biography, author_image FROM authors WHERE id IN (SELECT author_id FROM books WHERE id = ${bookId})`, (err, results) => {
    if (err) {
      console.log(err);
    } else {
      const authorInfo = results[0];
      const authorId = authorInfo.id;
      pool.query(`SELECT title, total_ratings, average_rating, year, description, cover_image FROM books WHERE author_id = ${authorId} ORDER BY average_rating DESC LIMIT 5`, (err, resultsBook) => {
        if (err) {
          console.log(err);
        } else {
          const bookInfo = resultsBook;
          const titles = [];
          for (let i = 0; i < bookInfo.length; i += 1) {
            titles.push(bookInfo[i].title);
          }
          authorInfo.titles = titles;
          authorInfo.bookDetails = bookInfo;
          callback(null, authorInfo);
        }
      });
    }
  });
};

const deleteAuthorAndBook = (id) => {
  const deleteBookQuery = `DELETE FROM books WHERE author_id=${id}`;
  const deleteAuthorQuery = `DELETE FROM authors WHERE id=${id}`;
  pool.query(deleteBookQuery, (err, results) => {
    if (err) {
      console.log('err in deleting book', err);
    } else {
      console.log('deleted book', results);
      pool.query(deleteAuthorQuery, (err2, results2) => {
        if (err) {
          console.log('err in deleting author', err2);
        } else {
          console.log('deleted author', results2)
        }
      });
    }
  });
};

const addAuthor = () => {
  const createFakeAuthor = () => ({
    name: faker.name.findName(),
    followers: faker.random.number(),
    biography: faker.lorem.paragraph(),
    author_image: faker.image.people(),
  });

  const author = createFakeAuthor();
  const addQuery = `INSERT INTO authors (name, followers, biography, author_image) VALUES ("${author.name}",${author.followers},"${author.biography}","${author.author_image}");`;
  pool.query(addQuery, (err, results) => {
    if (err) {
      console.log('error in adding author', err);
    } else {
      console.log('added author', results);
    }
  });
};

const addFollowers = (bookId) => {
  const addFollowersQuery = `UPDATE authors SET followers = followers + 1 WHERE id IN (SELECT author_id FROM books WHERE id = ${bookId})`;
  pool.query(addFollowersQuery, (err, results) => {
    if (err) {
      console.log('error in adding follower, err');
    } else {
      console.log('added follower', results);
    }
  });
};

exports.getAuthorInfo = getAuthorInfo;
exports.deleteAuthorAndBook = deleteAuthorAndBook;
exports.addAuthor = addAuthor;
exports.addFollowers = addFollowers;
