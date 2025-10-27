import express from "express";

const app = express();
app.use(express.json());

const PORT = 4000;

// Sample initial data
let posts = [
  {"id": 1, "title": "Hello", "content": "hello everyone"},
  {"id": 2, "title": "Goodbye", "content": "bye everyone"}
];

let nextId = 3;

// GET / - Root endpoint
app.get('/', (req, res) => {
  res.json({
    success: true,
    message: "Blog API Server is running!",
    timestamp: new Date().toISOString(),
    endpoints: {
      getAllPosts: "GET /posts",
      getPost: "GET /posts/:id", 
      createPost: "POST /posts",
      updatePost: "PUT /posts/:id",
      deletePost: "DELETE /posts/:id"
    },
    totalPosts: posts.length
  });
});

// GET /posts - Get all posts
app.get('/posts', (req, res) => {
  try {
    console.log("GET /posts route hit"); 
    res.json({ 
      success: true, 
      count: posts.length,
      data: posts 
    });
  } catch (error) {
    console.error("Error fetching posts:", error);
    res.status(500).json({ 
      success: false, 
      message: "Error fetching posts",
      error: error.message 
    });
  }
});

// GET /posts/:id - Get a post
app.get('/posts/:id', (req, res) => {
  try {
    const id = parseInt(req.params.id);
    console.log(`🔍 GET /posts/${id} route hit`);
    
    const post = posts.find(post => post.id === id);
    
    if (post) {
      res.json({ 
        success: true, 
        message: 'Post found successfully',
        data: post
      });
    } else {
      res.status(404).json({ 
        success: false, 
        message: `Post with ID ${id} not found`
      });
    }
  } catch (error) {
    console.error("Error fetching post:", error); 
    res.status(500).json({ 
      success: false, 
      message: "Error fetching post", 
      error: error.message 
    });
  }
});

// POST /posts - Create new post
app.post('/posts', (req, res) => {
  try {
    console.log("POST /posts route hit", req.body); 
    const { title, content } = req.body;
    
    if (!title || !content) {
      return res.status(400).json({
        success: false,
        message: "Title and content are required"
      });
    }
    
    const newPost = {
      id: nextId++,
      title,
      content,
      createdAt: new Date().toISOString() 
    };
    
    posts.push(newPost);
    
    res.status(201).json({ 
      success: true, 
      message: "Post created successfully",
      data: newPost 
    });
  } catch (error) {
    console.error("Error creating post:", error);
    res.status(500).json({ 
      success: false, 
      message: "Error creating post",
      error: error.message 
    });
  }
});

// PUT /posts/:id - update a post
app.put('/posts/:id', (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const post = posts.find(post => post.id === id);
    console.log("PUT /posts route hit", req.body); 
    const { title, content } = req.body;
    
    if(post){
      if (title !== undefined) post.title = title;
      if (content !== undefined) post.content = content;
      
      
      res.json({
        success: true, 
        message: "Post updated successfully",
        data: post
      });
    } else {
      return res.status(404).json({
        success: false,
        message: `Post with ID ${id} not found` 
      });
    }  
  } catch (error) {
    console.error("Error updating post:", error);
    res.status(500).json({ 
      success: false, 
      message: "Error updating post",
      error: error.message 
    });
  }
});

// DELETE /posts/:id - Delete post
app.delete('/posts/:id', (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const post = posts.find(post => post.id === id);
    
    if(!post){
      return res.status(404).json({
        success: false,
        message: `Post with ID ${id} not found`
      });
    }
    
    posts = posts.filter(post => post.id !== id);
    
    res.json({
      success: true, 
      message: "Post deleted successfully",
      data: post,  
      remainingCount: posts.length 
    });
  } catch(error) {
    console.error("Error deleting post:", error);
    res.status(500).json({ 
      success: false, 
      message: "Error deleting post",
      error: error.message 
    });
  }
});



// 404 Handler - 
app.use((req, res) => {
  // This will only run if no other routes matched
  res.status(404).json({
    success: false,
    error: {
      code: "ROUTE_NOT_FOUND",
      message: `Route not found: ${req.method} ${req.originalUrl}`,
      timestamp: new Date().toISOString()
    },
    availableRoutes: [
      'GET /',
      'GET /posts',
      'GET /posts/:id',
      'POST /posts',
      'PUT /posts/:id', 
      'DELETE /posts/:id'
    ],
    suggestion: "Check the available routes above"
  });
});

// Global Error Handler (optional but recommended)
app.use((error, req, res, next) => {
  console.error('🚨 Unhandled Error:', error);
  res.status(500).json({
    success: false,
    message: "Internal server error",
    error: error.message
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
  console.log('📚 Available endpoints:'); 
  console.log('   GET  /              - Server info');
  console.log('   GET  /posts         - Get all posts');
  console.log('   GET  /posts/:id     - Get single post');
  console.log('   POST /posts         - Create new post');
  console.log('   PUT  /posts/:id     - Update post');
  console.log('   DELETE /posts/:id   - Delete post');
});