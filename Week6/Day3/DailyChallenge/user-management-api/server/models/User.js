const db = require('../config/database');
const bcrypt = require('bcryptjs');

class User {
  // Create a new user with transaction
  static async create(userData) {
    const { email, username, password, first_name, last_name } = userData;
    
    // Start a transaction
    const trx = await db.transaction();
    
    try {
      // Insert into users table
      const [user] = await trx('users').insert({
        email,
        username,
        first_name,
        last_name
      }).returning('*');
      
      // Hash password and insert into hashpwd table
      const hashedPassword = await bcrypt.hash(password, 10);
      await trx('hashpwd').insert({
        username,
        password: hashedPassword
      });
      
      // Commit the transaction
      await trx.commit();
      
      return user;
    } catch (error) {
      // Rollback the transaction in case of error
      await trx.rollback();
      throw error;
    }
  }

  // Find user by username
  static async findByUsername(username) {
    try {
      const user = await db('users')
        .where({ username })
        .first();
      
      if (user) {
        const passwordData = await db('hashpwd')
          .where({ username })
          .first();
        
        user.password = passwordData ? passwordData.password : null;
      }
      
      return user;
    } catch (error) {
      throw error;
    }
  }

  // Find user by ID
  static async findById(id) {
    try {
      const user = await db('users')
        .where({ id })
        .first();
      
      return user;
    } catch (error) {
      throw error;
    }
  }

  // Get all users
  static async getAll() {
    try {
      const users = await db('users')
        .select('id', 'email', 'username', 'first_name', 'last_name', 'created_at')
        .orderBy('id');
      
      return users;
    } catch (error) {
      throw error;
    }
  }

  // Update user
  static async update(id, userData) {
    try {
      const [updatedUser] = await db('users')
        .where({ id })
        .update(userData)
        .returning('*');
      
      return updatedUser;
    } catch (error) {
      throw error;
    }
  }

  // Verify password
  static async verifyPassword(plainPassword, hashedPassword) {
    return await bcrypt.compare(plainPassword, hashedPassword);
  }

  // Update password
  static async updatePassword(username, newPassword) {
    try {
      const hashedPassword = await bcrypt.hash(newPassword, 10);
      await db('hashpwd')
        .where({ username })
        .update({ password: hashedPassword });
      
      return true;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = User;