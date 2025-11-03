import expres from 'express';

const router = expres.Router();

const todos = [
  {
    id: 1,
    text: "Learn JavaScript",
    completed: false,
    priority: "high"
  },
  {
    id: 2,
    text: "Build a todo app",
    completed: true,
    priority: "medium",
   
  },
  {
    id: 3,
    text: "Read documentation",
    completed: false,
    priority: "low",

  }
];

router.get('/todos', (req, res)=> {

    res.json(todos);
});

router.get('/todos/:id', (req, res)=> {
    const todoId = parseInt(req.params.id);
    const todo = todos.find(t => t.id === todoId);
    if (todo) {
        res.json(todo);
    } else {
        res.status(404).json({message: 'Todo not found'});
    }
});

router.post('/todos', (req, res)=> {
     
    const { text, completed, priority } =req.body;
    if (!text || !priority){
        return res.status(400).json({message: 'Text and priority are required'});
    } 
    const newtodo = { 
        id : todos.length + 1,
        text,
        completed : completed || false,
        priority
    };
    todos.push(newtodo);
    res.status(201).json({
        message : 'Todo added successfully',
        todo : newtodo
    }
    );});

router.put('/todos/:id', (req, res)=> {

    const todoId = parseInt(req.params.id);
    const todo = todos.find(t => t.id === todoId);
    if (todo) {
        todo.text = req.body.text || todo.text;
        todo.completed = req.body.completed || todo.completed;
        todo.priority = req.body.priority || todo.priority;
        res.json({
            message: 'Todo updated successfully',
            todo : todo
        });
    } else {
        res.status(404).json({message: 'Todo not found'});
    }
});

router.delete('/todos/:id', (req, res)=> {
    const todoId = parseInt(req.params.id);
    const index = todos.findIndex(t => t.id === todoId);
    if (index !== -1) {
        todos.splice(index, 1);
        res.json({message: 'Todo deleted successfully'});
    } else {
        res.status(404).json({message: 'Todo not found'});
    }
});

export default router;