const db = require('./database');

async function createTodosTable() {
  try {
    const exists = await db.schema.hasTable('todos');
    if (!exists) {
      await db.schema.createTable('todos', (table) => {
        table.increments('id').primary();
        table.string('title').notNullable();
        table.boolean('completed').notNullable();
        table.timestamps(true, true);
      });
      console.log('todos table created successfully');
    }
  } catch (error) {
    console.error('Error creating todos table:', error);
  }
}

module.exports = { createTodosTable };