// app.js
import express from 'express';
import axios from 'axios';

const app = express();
const PORT = 5000;
const API_URL = 'https://jsonplaceholder.typicode.com';

app.use(express.json());

// GET all posts
app.get('/api/posts', async (req, res) => {
    try {
        const response = await axios.get(`${API_URL}/posts`);
        res.json({ success: true, data: response.data });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

// GET single post
app.get('/api/posts/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const response = await axios.get(`${API_URL}/posts/${id}`);
        res.json({ success: true, data: response.data });
    } catch (error) {
        res.status(404).json({ success: false, error: 'Post not found' });
    }
});

// CREATE post
app.post('/api/posts', async (req, res) => {
    try {
        const { title, body, userId } = req.body;
        const response = await axios.post(`${API_URL}/posts`, { title, body, userId });
        res.status(201).json({ success: true, data: response.data });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

// UPDATE post
app.put('/api/posts/:id', async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const response =await axios.get(`${API_URL}/posts/${id}`);
    const post = response.data

   // const post = posts.find(post => post.id === id);
    console.log("PUT /posts route hit", req.body); // ✅ Fixed log message
    const { title, body } = req.body;
    
    if(post){
      if (title !== undefined) post.title = title;
      if (body !== undefined) post.body = body;
      
      // ✅ Add success flag and remove allPosts (too much data)
      res.json({
        success: true, // ✅ Added success flag
        message: "Post updated successfully",
        data: post
      });
    } else {
      return res.status(404).json({
        success: false,
        message: `Post with ID ${id} not found` // ✅ Better message
      });
    }  
  } catch (error) {
    console.error("Error updating post:", error);
    res.status(500).json({ 
      success: false, 
      message: "Error updating post", // ✅ Fixed message
      error: error.message 
    });
  }
});


// DELETE post
app.delete('/api/posts/:id', async (req, res) => {
    try {
        const { id } = req.params;
        await axios.delete(`${API_URL}/posts/${id}`);
        res.json({ success: true, message: 'Post deleted' });
    } catch (error) {
        res.status(404).json({ success: false, error: 'Post not found' });
    }
});

// Home route
app.get('/', (req, res) => {
    res.json({ message: 'CRUD API is working!' });
});

app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
});