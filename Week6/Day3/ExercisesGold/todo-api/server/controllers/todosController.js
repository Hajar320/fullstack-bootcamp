const Todos = require('../models/todos');

const getAllTodos = async (req, res) => {
  try {
    const todos = await Todos.getAll();
    res.json({
      success: true,
      data: todos,
      count: todos.length
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

const getTodosById = async (req, res) => {
  try {
    const { id } = req.params;
    const todo = await Todos.getById(id);
    res.json({
      success: true,
      data: todo
    });
  } catch (error) {
    if (error.message === 'todo not found') {
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

const createTodo = async (req, res) => {
  try {
    const { title, completed } = req.body;

    // Validation
    if (!title || !completed) {
      return res.status(400).json({
        success: false,
        error: 'Title and completed are required'
      });
    }

    const newTodo = await Todos.create({ title, completed });
    res.status(201).json({
      success: true,
      data: newTodo,
      message: 'todo created successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

const updateTodo = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, completed } = req.body;

    // Validation
    if (!title && !completed) {
      return res.status(400).json({
        success: false,
        error: 'At least one field (title or completed) is required for update'
      });
    }

    const updateData = {};
    if (title) updateData.title = title;
    if (completed) updateData.completed = completed;

    const updatedTodo = await Todos.update(id, updateData);
    res.json({
      success: true,
      data: updatedTodo,
      message: 'todo updated successfully'
    });
  } catch (error) {
    if (error.message === 'todo not found') {
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

const deleteTodo = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await Todos.delete(id);
    res.json({
      success: true,
      data: result
    });
  } catch (error) {
    if (error.message === 'Todo not found') {
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
  getAllTodos,
  getTodosById,
  createTodo,
  updateTodo,
  deleteTodo
};