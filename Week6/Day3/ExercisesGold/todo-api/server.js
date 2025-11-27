const express = require('express');
const { createTodosTable  } = require('./server/config/migrations');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/todos', require('./server/routes/todos'));

// Home route
app.get('/', (req, res) => {
  res.json({
    message: 'todos API Server is running!',
    endpoints: {
      'GET /todos': 'Get all todos',
      'GET /todos/:id': 'Get todo by ID',
      'POST /todos': 'Create new todo',
      'PUT /todos/:id': 'Update todo',
      'DELETE /todos/:id': 'Delete todo'
    }
  });
});

// 404 handler for invalid routes
app.use( (req, res,next) => {
  res.status(404).json({
    success: false,
    error: `Route ${req.originalUrl} not found`
  });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error('Server Error:', err);
  res.status(500).json({
    success: false,
    error: 'Internal Server Error'
  });
});

// Initialize database and start server
async function startServer() {
  try {
    // Create posts table if it doesn't exist
    await createTodosTable();
    
    app.listen(PORT, () => {
      console.log(`🚀 Server is running on http://localhost:${PORT}`);
      console.log(`📝 Book API endpoints are available at http://localhost:${PORT}/todos`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
}

startServer();