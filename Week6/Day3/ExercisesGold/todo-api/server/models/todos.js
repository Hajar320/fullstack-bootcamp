const db = require('../config/database');

class Todos {
  static async getAll() {
    try {
      return await db('todos').select('*').orderBy('created_at', 'desc');
    } catch (error) {
      throw new Error(`Error fetching todos: ${error.message}`);
    }
  }

  static async getById(id) {
    try {
      const todo = await db('todos').where({ id }).first();
      if (!todo) {
        throw new Error('todo not found');
      }
      return todo;
    } catch (error) {
      throw new Error(`Error fetching todo: ${error.message}`);
    }
  }

  static async create(todoData) {
    try {
      const [todo] = await db('todos').insert(todoData).returning('*');
      return todo;
    } catch (error) {
      throw new Error(`Error creating todo: ${error.message}`);
    }
  }

  static async update(id, todoData) {
    try {
      const [todo] = await db('todos')
        .where({ id })
        .update(todoData)
        .returning('*');
      
      if (!todo) {
        throw new Error('todo not found');
      }
      return todo;
    } catch (error) {
      throw new Error(`Error updating todo: ${error.message}`);
    }
  }

  static async delete(id) {
    try {
      const deleted = await db('todos').where({ id }).del();
      if (!deleted) {
        throw new Error('todo not found');
      }
      return { message: 'todo deleted successfully' };
    } catch (error) {
      throw new Error(`Error deleting todo: ${error.message}`);
    }
  }
}

module.exports = Todos;