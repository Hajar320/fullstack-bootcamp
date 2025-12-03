import express from 'express';
import fs from 'fs'; 

const router = express.Router();

router.get('/tasks', (req, res) => {
    const jsonData = fs.readFileSync("tasks.json");
    const data = JSON.parse(jsonData);
    res.json(data.tasks);
});

router.get('/tasks/:id', (req, res) => {
    try{
    const taskId = parseInt(req.params.id);
    const jsonData = fs.readFileSync("tasks.json");
    const data = JSON.parse(jsonData);
    const task = data.tasks.find(p => p.id === taskId);
    if (task) {
        res.json(task);
    } else {
        res.status(404).json({ message: "task not found" });
    }
}catch(error){
    res.status(500).json({ message: "Server error" });
}
});

router.post('/tasks', (req, res) => {
    try{
    const { title, content } = req.body;
    if (!title || !content) {
        return res.status(400).json({ message: "Title and content are required" });
    }
     const jsonData = fs.readFileSync("tasks.json", 'utf-8');
    const data = JSON.parse(jsonData);
    const newtask = {
        id: data.tasks.length + 1,
        title,
        content,
        timestamp: new Date().toISOString()
    };
    data.tasks.push(newtask);
    fs.writeFileSync("tasks.json", JSON.stringify(data, null, 2));
    res.status(201).json({
        message: "task created successfully",
        task: newtask
    });
}catch(error){
    res.status(500).json({ message: "Server error" });
}
});

router.put('/tasks/:id', (req, res) => {
    try{
    const taskId = parseInt(req.params.id);
    const { title, content } = req.body;
    const jsonData = fs.readFileSync("tasks.json");
    const data = JSON.parse(jsonData);
    const task = data.tasks.find(p => p.id === taskId);
    if (task) {
        task.title = title || task.title;
        task.content = content || task.content;
        fs.writeFileSync("tasks.json", JSON.stringify(data, null, 2));
        res.json({
            message: "task updated successfully",
            task: task
        });
    } else {
        res.status(404).json({ message: "task not found" });
    }
}catch(error){
    res.status(500).json({ message: "Server error" });
}
});

router.delete('/tasks/:id', (req, res) => {
    try{
    const taskId = parseInt(req.params.id);
    const jsonData = fs.readFileSync("tasks.json");
    const data = JSON.parse(jsonData);
    const task = data.tasks.findIndex(p => p.id === taskId);
    if (task !== -1) {
        data.tasks.splice(task, 1);
        fs.writeFileSync("tasks.json", JSON.stringify(data, null, 2));
        res.json({ message: "task deleted successfully" });
    } else {
        res.status(404).json({ message: "task not found" });
    }
}catch(error){
    res.status(500).json({ message: "Server error" });
}
});
export default router;