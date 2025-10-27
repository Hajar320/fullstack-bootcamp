// Import express module
import express from 'express';

// Import dataService module
import fetchPosts from './data/dataService.js';

// Create an instance of Express app
const app = express();

// Middleware to parse JSON
app.use(express.json());

// Define port
const PORT = 5000;

// GET endpoint to fetch all posts
app.get('/posts', async (req, res) => {
  try {
    console.log('Fetching posts from JSONPlaceholder API...');
    
    // Use fetchPosts function from dataService module
    const posts = await fetchPosts();
    
    console.log('Data successfully retrieved and sent as response');
    
    // Send the fetched data as response
    res.status(200).json({
      success: true,
      count: posts.length,
      data: posts
    });
  } catch (error) {
    console.error('Error occurred while fetching posts:', error.message);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch posts',
      error: error.message
    });
  }
});

// Root endpoint
app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to CRUD API',
    endpoints: {
      posts: '/posts'
    }
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`Access the API at: http://localhost:${PORT}`);
  console.log(`Get posts at: http://localhost:${PORT}/posts`);
});