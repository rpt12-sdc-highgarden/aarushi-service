const faker = require('faker');

const createFakeBooks = () => ({
  title: faker.commerce.productName(),
  year: faker.random.number({ min: 1900, max: 2019 }),
  total_ratings: faker.random.number(),
  average_rating: faker.random.number({ min: 1, max: 5 }),
  description: faker.lorem.paragraph(),
  cover_image: faker.image.city(),
  author_id: faker.random.number({ min: 1, max: 10000000 }),
  // createdAt: faker.date.past(),
  // updatedAt: faker.date.past(),
});

// exports.seed = (knex) => {
//   // Deletes ALL existing entries
//   return knex('books').del()
//     .then(() => {
//       const fakeBooks = [];
//       const desiredBooks = 100;
//       for (let i = 0; i < desiredBooks; i += 1) {
//         fakeBooks.push(createFakeBooks());
//       }
//       // Inserts seed entries
//       return knex('books').insert(fakeBooks);
//     });
// };

const createAllFakeBooks = (numberBooks) => {
  const arrayBooks = [];
  let i = 0;
  for (i; i < numberBooks; i += 1) {
    arrayBooks.push(createFakeBooks());
  }
  return arrayBooks;
};

// const allBooks = createAllFakeBooks(1000000);

exports.seed = (knex) => {
  return knex('books').del()
    .then(() => {
      return knex.batchInsert('books', createAllFakeBooks(1000000), 1000)
        .then(() => {
          return knex.batchInsert('books', createAllFakeBooks(1000000), 1000)
            .then(() => {
              return knex.batchInsert('books', createAllFakeBooks(1000000), 1000)
                .then(() => {
                  return knex.batchInsert('books', createAllFakeBooks(1000000), 1000)
                    .then(() => {
                      return knex.batchInsert('books', createAllFakeBooks(1000000), 1000)
                        .then(() => {
                          return knex.batchInsert('books', createAllFakeBooks(1000000), 1000)
                            .then(() => {
                              return knex.batchInsert('books', createAllFakeBooks(1000000), 1000)
                                .then(() => {
                                  return knex.batchInsert('books', createAllFakeBooks(1000000), 1000)
                                    .then(() => {
                                      return knex.batchInsert('books', createAllFakeBooks(1000000), 1000)
                                        .then(() => {
                                          return knex.batchInsert('books', createAllFakeBooks(1000000), 1000)
                                            .catch(err => console.log(err));
                                        })
                                        .catch(err => console.log(err));
                                    })
                                    .catch(err => console.log(err));
                                })
                                .catch(err => console.log(err));
                            })
                            .catch(err => console.log(err));
                        })
                        .catch(err => console.log(err));
                    })
                    .catch(err => console.log(err));
                })
                .catch(err => console.log(err));
            })
            .catch(err => console.log(err));
        })
        .catch(err => console.log(err));
    });
};
