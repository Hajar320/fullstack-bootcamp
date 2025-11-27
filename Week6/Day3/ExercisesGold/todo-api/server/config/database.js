const knex = require('knex');
// db example
const db = knex({
  client: 'pg',
  connection: {
    host: 'localhost',
    port: 5432,
    user: 'postgres',
    password: '123456789',
    database: 'todos_db'
  },
  pool: { min: 0, max: 7 }
});


module.exports = db;
