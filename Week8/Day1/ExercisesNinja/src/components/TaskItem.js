// src/components/TaskItem.js
import React from "react";
import { useTasks } from "../context/TaskContext";

const TaskItem = ({ task }) => {
  // Get functions from context
  const { toggleTask, deleteTask } = useTasks();

  return (
    <div className={`task-item ${task.completed ? "completed" : ""}`}>
      {/* Checkbox to toggle completion */}
      <input
        type="checkbox"
        checked={task.completed}
        onChange={() => toggleTask(task.id)}
        className="task-checkbox"
      />

      {/* Task text - strikethrough if completed */}
      <span className="task-text">{task.text}</span>

      {/* Delete button */}
      <button onClick={() => deleteTask(task.id)} className="delete-button">
        Delete
      </button>
    </div>
  );
};

export default TaskItem;
