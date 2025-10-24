const todoList =require('./todo.js')


const myTodoList = new todoList()

myTodoList.addTask("Learn JavaScript classes");
myTodoList.addTask("Learn Express.js ");
myTodoList.addTask("Learn React ");
myTodoList.addTask("Learn Node.js ");
myTodoList.addTask("Learn CSS");

myTodoList.taskComleted(2)
myTodoList.taskComleted(4)

myTodoList.listTasks()