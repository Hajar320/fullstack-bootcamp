class todoList{
    constructor(tasks=[]){
        this.tasks =tasks;
    }

    addTask(newTask){
        
        this.tasks.push({
            task:newTask,
            completed:false}

        );
        console.log(`Added : ${newTask}`);
        
    }

    taskComleted(taskIndex){
        if(this.tasks[taskIndex]){
            this.tasks[taskIndex].completed = true;
        }

    }
    listTasks() {
        console.log("\n--- Todo List ---");
        this.tasks.forEach((item, index) => {
            const status = item.completed ? "✅" : "❌";
            console.log(`${index + 1}. ${status} ${item.task}`);
        });
    }


}


module.exports= todoList
