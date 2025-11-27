const db = require('./database');

// Create posts table (run this once)
async function createPostsTable() {
  try {
    const exists = await db.schema.hasTable('posts');
    if (!exists) {
      await db.schema.createTable('posts', (table) => {
        table.increments('id').primary();
        table.string('title').notNullable();
        table.text('content').notNullable();
        table.timestamps(true, true);
      });
      console.log('Posts table created successfully');
    }
  } catch (error) {
    console.error('Error creating posts table:', error);
  }
}

module.exports = { createPostsTable };