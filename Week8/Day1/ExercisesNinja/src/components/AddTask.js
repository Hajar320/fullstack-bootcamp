// src/components/AddTask.js
import React, { useState } from "react";
import { useTasks } from "../context/TaskContext";

const AddTask = () => {
  // State for the input field
  const [taskText, setTaskText] = useState("");

  // Get the addTask function from context
  const { addTask } = useTasks();

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent page refresh

    // Don't add empty tasks
    if (taskText.trim() === "") return;

    // Add the task to our global state
    addTask(taskText);

    // Clear the input field
    setTaskText("");
  };

  return (
    <div className="add-task">
      <h2>Add New Task</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={taskText}
          onChange={(e) => setTaskText(e.target.value)}
          placeholder="What needs to be done?"
          className="task-input"
        />
        <button type="submit" className="add-button">
          Add Task
        </button>
      </form>
    </div>
  );
};

export default AddTask;
