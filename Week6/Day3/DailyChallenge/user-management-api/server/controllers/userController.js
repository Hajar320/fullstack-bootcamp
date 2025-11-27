const dotenv =require('dotenv')
const User = require('../models/User');
const jwt = require('jsonwebtoken');

dotenv.config()

class UserController {
  // Register new user
  static async register(req, res) {
    try {
      const { email, username, password, first_name, last_name } = req.body;
      
      // Validate required fields
      if (!email || !username || !password || !first_name || !last_name) {
        return res.status(400).json({
          error: 'All fields (email, username, password, first_name, last_name) are required'
        });
      }
      
      // Check if user already exists
      const existingUser = await User.findByUsername(username);
      if (existingUser) {
        return res.status(409).json({
          error: 'Username already exists'
        });
      }
      
      // Create new user
      const user = await User.create({
        email,
        username,
        password,
        first_name,
        last_name
      });
      
      // Remove password from response
      const { password: _, ...userWithoutPassword } = user;
      
      res.status(201).json({
        message: 'User registered successfully',
        user: userWithoutPassword
      });
    } catch (error) {
      console.error('Registration error:', error);
      
      if (error.code === '23505') { // PostgreSQL unique violation
        return res.status(409).json({
          error: 'Email or username already exists'
        });
      }
      
      res.status(500).json({
        error: 'Internal server error during registration'
      });
    }
  }

  // Login user
  static async login(req, res) {
    try {
      const { username, password } = req.body;
      
      // Validate required fields
      if (!username || !password) {
        return res.status(400).json({
          error: 'Username and password are required'
        });
      }
      
      // Find user by username
      const user = await User.findByUsername(username);
      if (!user) {
        return res.status(401).json({
          error: 'Invalid username or password'
        });
      }
      
      // Verify password
      const isPasswordValid = await User.verifyPassword(password, user.password);
      if (!isPasswordValid) {
        return res.status(401).json({
          error: 'Invalid username or password'
        });
      }
      
      // Generate JWT token
      const token = jwt.sign(
        { 
          userId: user.id, 
          username: user.username 
        },
        process.env.JWT_SECRET,
        { expiresIn: '24h' }
      );
      
      // Remove password from response
      const { password: _, ...userWithoutPassword } = user;
      
      res.json({
        message: 'Login successful',
        token,
        user: userWithoutPassword
      });
    } catch (error) {
      console.error('Login error:', error);
      res.status(500).json({
        error: 'Internal server error during login'
      });
    }
  }

  // Get all users
  static async getAllUsers(req, res) {
    try {
      const users = await User.getAll();
      res.json(users);
    } catch (error) {
      console.error('Get users error:', error);
      res.status(500).json({
        error: 'Failed to retrieve users'
      });
    }
  }

  // Get user by ID
  static async getUserById(req, res) {
    try {
      const { id } = req.params;
      const user = await User.findById(parseInt(id));
      
      if (!user) {
        return res.status(404).json({
          error: 'User not found'
        });
      }
      
      res.json(user);
    } catch (error) {
      console.error('Get user error:', error);
      res.status(500).json({
        error: 'Failed to retrieve user'
      });
    }
  }

  // Update user
  static async updateUser(req, res) {
    try {
      const { id } = req.params;
      const { email, first_name, last_name } = req.body;
      
      // Validate required fields
      if (!email || !first_name || !last_name) {
        return res.status(400).json({
          error: 'Email, first_name, and last_name are required'
        });
      }
      
      const updateData = { email, first_name, last_name };
      
      const updatedUser = await User.update(parseInt(id), updateData);
      
      if (!updatedUser) {
        return res.status(404).json({
          error: 'User not found'
        });
      }
      
      res.json({
        message: 'User updated successfully',
        user: updatedUser
      });
    } catch (error) {
      console.error('Update user error:', error);
      
      if (error.code === '23505') { // PostgreSQL unique violation
        return res.status(409).json({
          error: 'Email already exists'
        });
      }
      
      res.status(500).json({
        error: 'Failed to update user'
      });
    }
  }
}

module.exports = UserController;