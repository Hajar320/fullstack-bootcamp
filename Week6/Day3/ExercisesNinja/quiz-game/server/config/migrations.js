const db = require('./database');


async function createquestionsTable() {
  try {
    const exists = await db.schema.hasTable('questions');
    if (!exists) {
      await db.schema.createTable('questions', (table) => {
       table.increments('id').primary();
      table.text('question').notNullable();
      table.text('correct_answer').notNullable();
      table.string('difficulty').defaultTo('easy');
      table.timestamps(true, true);
      });
      console.log('questions table created successfully');
    }
  } catch (error) {
    console.error('Error creating questions table:', error);
  }
}



async function createoptionsTable() {
  try {
    const exists = await db.schema.hasTable('options');
    if (!exists) {
      await db.schema.createTable('options', (table) => {
      table.increments('id').primary();
      table.text('option').notNullable();
      table.timestamps(true, true);      });
      console.log('options table created successfully');
    }
  } catch (error) {
    console.error('Error creating options table:', error);
  }
}


async function createquestions_optionsTable() {
     try {
      const exists = await db.schema.hasTable('questions_options');
      if (!exists) {
      await db.schema.createTable('questions_options', (table) => {
      table.integer('question_id').unsigned().notNullable();
      table.integer('option_id').unsigned().notNullable();
      table.foreign('question_id').references('id').inTable('questions').onDelete('CASCADE');
      table.foreign('option_id').references('id').inTable('options').onDelete('CASCADE');
      table.primary(['question_id', 'option_id']) });      
      console.log('questions_options table created successfully');
    }
   } catch (error) {
    console.error('Error creating questions_options table:', error);
  }
}


module.exports = { createquestionsTable,createoptionsTable ,createquestions_optionsTable};
