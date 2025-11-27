const  {createquestionsTable} = require('./config/migrations');
const { createoptionsTable} = require('./config/migrations');
const { createquestions_optionsTable } = require('./config/migrations');


const express = require('express');
const cors = require('cors');
const path = require('path');

const questionRoutes = require('./routes/questions');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, '../public')));

// Routes
app.use('/api/questions', questionRoutes);

// Serve the main page
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

// Start server
async function startServer() {
  try {
    // Create posts table if it doesn't exist
    await createquestionsTable();
    await createoptionsTable();
    await createquestions_optionsTable();
    
    app.listen(PORT, () => {
      console.log(`🚀 Server is running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
}

startServer();