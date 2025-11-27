const Book = require('../models/Book');

const getAllBooks = async (req, res) => {
  try {
    const books = await Book.getAll();
    res.json({
      success: true,
      data: books,
      count: books.length
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

const getBookById = async (req, res) => {
  try {
    const { id } = req.params;
    const book = await Book.getById(id);
    res.json({
      success: true,
      data: book
    });
  } catch (error) {
    if (error.message === 'Book not found') {
      return res.status(404).json({
        success: false,
        error: error.message
      });
    }
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

const createBook = async (req, res) => {
  try {
    const { title, author,publishedYear } = req.body;

    // Validation
    if (!title || !author || !publishedYear) {
      return res.status(400).json({
        success: false,
        error: 'Title ,author and publishedYear are required'
      });
    }

    const newBook = await Book.create({ title, author,publishedYear });
    res.status(201).json({
      success: true,
      data: newBook,
      message: 'Book created successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

const updateBook = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, author,publishedYear } = req.body;

    // Validation
    if (!title && !author && !publishedYear) {
      return res.status(400).json({
        success: false,
        error: 'At least one field is required for update'
      });
    }

    const updateData = {};
    if (title) updateData.title = title;
    if (author) updateData.author = author;
    if (publishedYear) updateData.publishedYear = publishedYear;


    const updatedBook = await Book.update(id, updateData);
    res.json({
      success: true,
      data: updatedBook,
      message: 'Book updated successfully'
    });
  } catch (error) {
    if (error.message === 'Book not found') {
      return res.status(404).json({
        success: false,
        error: error.message
      });
    }
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

const deleteBook = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await Book.delete(id);
    res.json({
      success: true,
      data: result
    });
  } catch (error) {
    if (error.message === 'Book not found') {
      return res.status(404).json({
        success: false,
        error: error.message
      });
    }
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

module.exports = {
  getAllBooks,
  getBookById,
  createBook,
  updateBook,
  deleteBook
};