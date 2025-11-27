const express = require('express');
const router = express.Router();
const {
  getAllPosts,
  getPostById,
  createPost,
  updatePost,
  deletePost
} = require('../controllers/postsController');

// GET /posts - Get all posts
router.get('/', getAllPosts);

// GET /posts/:id - Get post by ID
router.get('/:id', getPostById);

// POST /posts - Create new post
router.post('/', createPost);

// PUT /posts/:id - Update post
router.put('/:id', updatePost);

// DELETE /posts/:id - Delete post
router.delete('/:id', deletePost);

module.exports = router;