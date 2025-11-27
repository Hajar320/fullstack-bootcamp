const db = require('../config/database');

class Book {
  static async getAll() {
    try {
      return await db('books').select('*').orderBy('created_at', 'desc');
    } catch (error) {
      throw new Error(`Error fetching books: ${error.message}`);
    }
  }

  static async getById(id) {
    try {
      const book = await db('books').where({ id }).first();
      if (!book) {
        throw new Error('book not found');
      }
      return post;
    } catch (error) {
      throw new Error(`Error fetching post: ${error.message}`);
    }
  }

  static async create(bookData) {
    try {
      const [book] = await db('books').insert(bookData).returning('*');
      return book;
    } catch (error) {
      throw new Error(`Error creating a book: ${error.message}`);
    }
  }

  static async update(id, bookData) {
    try {
      const [book] = await db('books')
        .where({ id })
        .update(bookData)
        .returning('*');
      
      if (!book) {
        throw new Error('book not found');
      }
      return book;
    } catch (error) {
      throw new Error(`Error updating bookdata: ${error.message}`);
    }
  }

  static async delete(id) {
    try {
      const deleted = await db('books').where({ id }).del();
      if (!deleted) {
        throw new Error('book not found');
      }
      return { message: 'book deleted successfully' };
    } catch (error) {
      throw new Error(`Error deleting book: ${error.message}`);
    }
  }
}

module.exports = Book;