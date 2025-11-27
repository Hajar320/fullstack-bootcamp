const Post = require('../models/Post');

// Get all posts
const getAllPosts = async (req, res) => {
  try {
    const posts = await Post.getAll();
    res.json({
      success: true,
      data: posts,
      count: posts.length
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

// Get post by ID
const getPostById = async (req, res) => {
  try {
    const { id } = req.params;
    const post = await Post.getById(id);
    res.json({
      success: true,
      data: post
    });
  } catch (error) {
    if (error.message === 'Post not found') {
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

// Create new post
const createPost = async (req, res) => {
  try {
    const { title, content } = req.body;

    // Validation
    if (!title || !content) {
      return res.status(400).json({
        success: false,
        error: 'Title and content are required'
      });
    }

    const newPost = await Post.create({ title, content });
    res.status(201).json({
      success: true,
      data: newPost,
      message: 'Post created successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

// Update post
const updatePost = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, content } = req.body;

    // Validation
    if (!title && !content) {
      return res.status(400).json({
        success: false,
        error: 'At least one field (title or content) is required for update'
      });
    }

    const updateData = {};
    if (title) updateData.title = title;
    if (content) updateData.content = content;

    const updatedPost = await Post.update(id, updateData);
    res.json({
      success: true,
      data: updatedPost,
      message: 'Post updated successfully'
    });
  } catch (error) {
    if (error.message === 'Post not found') {
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

// Delete post
const deletePost = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await Post.delete(id);
    res.json({
      success: true,
      data: result
    });
  } catch (error) {
    if (error.message === 'Post not found') {
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
  getAllPosts,
  getPostById,
  createPost,
  updatePost,
  deletePost
};