const express = require('express');
const { createBooksTable } = require('./server/config/migrations');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/books', require('./server/routes/books'));

// Home route
app.get('/', (req, res) => {
  res.json({
    message: 'Books API Server is running!',
    endpoints: {
      'GET /books': 'Get all books',
      'GET /books/:id': 'Get book by ID',
      'POST /books': 'Create new book',
      'PUT /books/:id': 'Update book',
      'DELETE /books/:id': 'Delete book'
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
    await createBooksTable();
    
    app.listen(PORT, () => {
      console.log(`🚀 Server is running on http://localhost:${PORT}`);
      console.log(`📝 Book API endpoints are available at http://localhost:${PORT}/posts`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
}

startServer();