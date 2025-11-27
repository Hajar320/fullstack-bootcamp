const db = require('./database');

async function createBooksTable() {
  try {
    const exists = await db.schema.hasTable('Books');
    if (!exists) {
      await db.schema.createTable('books', (table) => {
        table.increments('id').primary();
        table.string('title').notNullable();
        table.text('author').notNullable();
        table.integer('publishedYear').notNullable();
        table.timestamps(true, true);
      });
      console.log('Books table created successfully');
    }
  } catch (error) {
    console.error('Error creating books table:', error);
  }
}

module.exports = { createBooksTable };