// src/components/TaskList.js
import React from "react";
import { useTasks } from "../context/TaskContext";
import TaskItem from "./TaskItem";

const TaskList = () => {
  // Get tasks from context
  const { tasks } = useTasks();

  return (
    <div className="task-list">
      <h2>Tasks ({tasks.length})</h2>

      {tasks.length === 0 ? (
        <p className="no-tasks">No tasks yet. Add one above!</p>
      ) : (
        <div className="tasks-container">
          {tasks.map((task) => (
            <TaskItem key={task.id} task={task} />
          ))}
        </div>
      )}

      {/* Task statistics */}
      <div className="task-stats">
        <p>
          Completed: {tasks.filter((t) => t.completed).length} / {tasks.length}
        </p>
      </div>
    </div>
  );
};

export default TaskList;
