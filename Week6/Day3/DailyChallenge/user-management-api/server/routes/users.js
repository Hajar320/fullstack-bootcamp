const express = require('express');
const router = express.Router();
const UserController = require('../controllers/userController');
const { authenticateToken } = require('../middleware/auth');

// Public routes
router.post('/register', UserController.register);
router.post('/login', UserController.login);

// Protected routes (require authentication)
router.get('/users', authenticateToken, UserController.getAllUsers);
router.get('/users/:id', authenticateToken, UserController.getUserById);
router.put('/users/:id', authenticateToken, UserController.updateUser);

module.exports = router;