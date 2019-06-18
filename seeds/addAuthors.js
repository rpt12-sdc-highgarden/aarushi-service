const faker = require('faker');

const knex = require('knex')({
  client: 'mysql',
  connection: {
    host : 'localhost',
    user : 'root',
    password: '',
    database : 'goodreads'
  }
});

const createFakeAuthors = () => ({
  name: faker.name.findName(),
  followers: faker.random.number(),
  biography: faker.lorem.paragraph(),
  author_image: faker.image.people(),
  // createdAt: faker.date.past(),
  // updatedAt: faker.date.past(),
});

// exports.seed = (knex) => {
//   // Deletes ALL existing entries
//   return knex('authors').del()
//     .then(() => {
//       const authors = [];
//       for (let i = 0; i < 10000; i += 1) {
//         authors.push(createFakeAuthors());
//       }
//       return knex('authors').insert(authors)
//         .then(() => {
//           const authors1 = [];
//           for (let i = 0; i < 10000; i += 1) {
//             authors1.push(createFakeAuthors());
//           }
//           return knex('authors').insert(authors1);
//         });
//     });
// };

const createAllFakeAuthors = (numberAuthors) => {
  const arrayAuthors = [];
  let i = 0;
  for (i; i < numberAuthors; i += 1) {
    arrayAuthors.push(createFakeAuthors());
  }
  return arrayAuthors;
};

// const allAuthors = createAllFakeAuthors(1000000);

// exports.seed = (knex) => {
//   return knex('authors').del()
//     .then(() => {
//       return knex.batchInsert('authors', createAllFakeAuthors(1000000), 1000)
//         .then(() => {
//           return knex.batchInsert('authors', createAllFakeAuthors(1000000), 1000)
//             .then(() => {
//               return knex.batchInsert('authors', createAllFakeAuthors(1000000), 1000)
//                 .then(() => {
//                   return knex.batchInsert('authors', createAllFakeAuthors(1000000), 1000)
//                     .then(() => {
//                       return knex.batchInsert('authors', createAllFakeAuthors(1000000), 1000)
//                         .then(() => {
//                           return knex.batchInsert('authors', createAllFakeAuthors(1000000), 1000)
//                             .then(() => {
//                               return knex.batchInsert('authors', createAllFakeAuthors(1000000), 1000)
//                                 .then(() => {
//                                   return knex.batchInsert('authors', createAllFakeAuthors(1000000), 1000)
//                                     .then(() => {
//                                       return knex.batchInsert('authors', createAllFakeAuthors(1000000), 1000)
//                                         .then(() => {
//                                           return knex.batchInsert('authors', createAllFakeAuthors(1000000), 1000)
//                                             .catch(err => console.log(err));
//                                         })
//                                         .catch(err => console.log(err));
//                                     })
//                                     .catch(err => console.log(err));
//                                 })
//                                 .catch(err => console.log(err));
//                             })
//                             .catch(err => console.log(err));
//                         })
//                         .catch(err => console.log(err));
//                     })
//                     .catch(err => console.log(err));
//                 })
//                 .catch(err => console.log(err));
//             })
//             .catch(err => console.log(err));
//         })
//         .catch(err => console.log(err));
//     });
// };

const seedAuthors = () => {
  return knex.batchInsert('authors', createAllFakeAuthors(1000000), 1000)
    .catch(err => console.log(err));
};

seedAuthors();
