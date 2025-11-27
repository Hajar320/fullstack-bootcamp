const db = require('./database');


async function createusersTable() {
  try {
    const exists = await db.schema.hasTable('users');
    if (!exists) {
      await db.schema.createTable('users', (table) => {
       table.increments('id').primary();
      table.string('email').notNullable().unique();
      table.string('username').notNullable().unique();
      table.string('first_name').notNullable();
      table.string('last_name').notNullable();
      table.timestamps(true, true);
      });
      console.log('users table created successfully');
    }
  } catch (error) {
    console.error('Error creating users table:', error);
  }
}



async function createhashpwdTable() {
  try {
    const exists = await db.schema.hasTable('hashpwd');
    if (!exists) {
      await db.schema.createTable('hashpwd', (table) => {
     table.increments('id').primary();
      table.string('username').notNullable().unique();
      table.string('password').notNullable();
      table.timestamps(true, true);
      
      // Foreign key relationship
      table.foreign('username').references('username').inTable('users').onDelete('CASCADE');
      });
      console.log('hashpwd table created successfully')    }
  } catch (error) {
    console.error('Error creating hashpwd table:', error);
  }
}



module.exports = { createusersTable,createhashpwdTable};
