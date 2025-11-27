const db = require('../config/database');

class Post {
  // Get all posts
  static async getAll() {
    try {
      return await db('posts').select('*').orderBy('created_at', 'desc');
    } catch (error) {
      throw new Error(`Error fetching posts: ${error.message}`);
    }
  }

  // Get post by ID
  static async getById(id) {
    try {
      const post = await db('posts').where({ id }).first();
      if (!post) {
        throw new Error('Post not found');
      }
      return post;
    } catch (error) {
      throw new Error(`Error fetching post: ${error.message}`);
    }
  }

  // Create new post
  static async create(postData) {
    try {
      const [post] = await db('posts').insert(postData).returning('*');
      return post;
    } catch (error) {
      throw new Error(`Error creating post: ${error.message}`);
    }
  }

  // Update post
  static async update(id, postData) {
    try {
      const [post] = await db('posts')
        .where({ id })
        .update(postData)
        .returning('*');
      
      if (!post) {
        throw new Error('Post not found');
      }
      return post;
    } catch (error) {
      throw new Error(`Error updating post: ${error.message}`);
    }
  }

  // Delete post
  static async delete(id) {
    try {
      const deleted = await db('posts').where({ id }).del();
      if (!deleted) {
        throw new Error('Post not found');
      }
      return { message: 'Post deleted successfully' };
    } catch (error) {
      throw new Error(`Error deleting post: ${error.message}`);
    }
  }
}

module.exports = Post;