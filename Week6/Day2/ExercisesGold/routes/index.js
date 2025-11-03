import express from 'express';
const router = express.Router();

let blogPosts = [
    {
        id: 1,
        title: "Understanding JavaScript Closures",
        content: "A closure is the combination of a function bundled together (enclosed) with references to its surrounding state (the lexical environment)...",
        timestamp: "2023-01-15T10:00:00Z"
    },
    {
        id: 2,
        title: "A Guide to Responsive Web Design",
        content: "Responsive web design is an approach to web design that makes web pages render well on a variety of devices and window or screen sizes...",
        timestamp: "2023-02-20T14:30:00Z"
    },
    {
        id: 3,
        title: "Introduction to Node.js",
        content: "Node.js is a JavaScript runtime built on Chrome's V8 JavaScript engine. It allows developers to use JavaScript to write server-side code...",
        timestamp: "2023-03-10T09:15:00Z"
    }
];

router.get('/posts', (req, res) => {
    res.json(blogPosts);
});

router.get('/posts/:id', (req, res) => {
    try{
    const postId = parseInt(req.params.id);
    const post = blogPosts.find(p => p.id === postId);
    if (post) {
        res.json(post);
    } else {
        res.status(404).json({ message: "Post not found" });
    }
}catch(error){
    res.status(500).json({ message: "Server error" });
}
});

router.post('/posts', (req, res) => {
    try{
    const { title, content } = req.body;
    if (!title || !content) {
        return res.status(400).json({ message: "Title and content are required" });
    }
    const newPost = {
        id: blogPosts.length + 1,
        title,
        content,
        timestamp: new Date().toISOString()
    };
    blogPosts.push(newPost);
    res.status(201).json({
        message: "Post created successfully",
        post: newPost
    });
}catch(error){
    res.status(500).json({ message: "Server error" });
}
});

router.put('/posts/:id', (req, res) => {
    try{
    const postId = parseInt(req.params.id);
    const { title, content } = req.body;
    const post = blogPosts.find(p => p.id === postId);
    if (post) {
        post.title = title || post.title;
        post.content = content || post.content;
        res.json({
            message: "Post updated successfully",
            post: post
        });
    } else {
        res.status(404).json({ message: "Post not found" });
    }
}catch(error){
    res.status(500).json({ message: "Server error" });
}
});

router.delete('/posts/:id', (req, res) => {
    try{
    const postId = parseInt(req.params.id);
    const post = blogPosts.findIndex(p => p.id === postId);
    if (post !== -1) {
        blogPosts.splice(post, 1);
        res.json({ message: "Post deleted successfully" });
    } else {
        res.status(404).json({ message: "Post not found" });
    }
}catch(error){
    res.status(500).json({ message: "Server error" });
}
});
export default router;