const express = require('express');
const cors = require('cors');
const  { createusersTable,createhashpwdTable} = require('./config/migrations');

const userRoutes = require('./routes/users');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api', userRoutes);

// Health check route
app.get('/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    message: 'User Management API is running',
    timestamp: new Date().toISOString()
  });
});

// 404 handler
app.use('/any', (req, res) => {
  res.status(404).json({
    error: 'Route not found'
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    error: 'Something went wrong!'
  });
});

// Start server
async function startServer() {
  try {
    // Create posts table if it doesn't exist
    await createusersTable();
    await createhashpwdTable();
    
    app.listen(PORT, () => {
      console.log(`🚀 Server is running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
}

startServer();