// src/context/TaskReducer.js

// Initial state - what our data looks like at the beginning
export const initialState = {
  tasks: [
    { id: 1, text: "Learn React", completed: false },
    { id: 2, text: "Build a project", completed: true },
    { id: 3, text: "Deploy to GitHub", completed: false },
  ],
};

// The reducer function - handles all state updates
export const taskReducer = (state, action) => {
  switch (action.type) {
    // Case 1: ADD_TASK - Add a new task
    case "ADD_TASK":
      const newTask = {
        id: Date.now(), // Creates unique ID using current timestamp
        text: action.payload,
        completed: false,
      };
      return {
        ...state, // Keep all other state properties
        tasks: [...state.tasks, newTask], // Add new task to tasks array
      };

    // Case 2: TOGGLE_TASK - Mark task as completed/not completed
    case "TOGGLE_TASK":
      return {
        ...state,
        tasks: state.tasks.map(
          (task) =>
            task.id === action.payload // If this is the task we want to toggle
              ? { ...task, completed: !task.completed } // Flip the completed status
              : task // Leave other tasks unchanged
        ),
      };

    // Case 3: DELETE_TASK - Remove a task
    case "DELETE_TASK":
      return {
        ...state,
        tasks: state.tasks.filter((task) => task.id !== action.payload),
        // Keep only tasks where ID doesn't match the one to delete
      };

    // Default case: if action type doesn't match, return current state
    default:
      return state;
  }
};
