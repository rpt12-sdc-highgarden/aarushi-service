// shell command: npx knex migrate:make migration_name


exports.up = function (knex, Promise) {
  // priority:
  // create authors table
  // create books table
  return knex.schema
    .createTable('authors', function (authors) {
      authors.increments('id').primary();
      authors.string('name');
      authors.integer('followers');
      authors.text('biography');
    })
    .createTable('books', function (books) {
      books.increments('bookId').primary();
      books.string('title');
      books.integer('total_ratings');
      books.float('average_rating');
      books.text('description');
      books.string('cover_id');
      books.integer('author_id').references('id').inTable('authors');
      // .notNullable().onDelete('cascade');
    })
};

exports.down = function (knex, Promise) {
  // priority:
  // drop books
  // drop authors

  return knex.schema
    .dropTable('books')
    .dropTable('authors');
};