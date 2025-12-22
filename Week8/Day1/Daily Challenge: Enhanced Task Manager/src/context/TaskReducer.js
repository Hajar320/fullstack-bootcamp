// src/context/TaskReducer.js

// Initial state with filter option
export const initialState = {
  tasks: [
    { id: 1, text: "Learn React", completed: false },
    { id: 2, text: "Build a project", completed: true },
    { id: 3, text: "Deploy to GitHub", completed: false },
  ],
  filter: "all", // 'all', 'active', 'completed'
};

// The reducer function
export const taskReducer = (state, action) => {
  switch (action.type) {
    // ADD_TASK - Add a new task
    case "ADD_TASK":
      const newTask = {
        id: Date.now(),
        text: action.payload,
        completed: false,
      };
      return {
        ...state,
        tasks: [...state.tasks, newTask],
      };

    // TOGGLE_TASK - Mark as completed/not completed
    case "TOGGLE_TASK":
      return {
        ...state,
        tasks: state.tasks.map((task) =>
          task.id === action.payload
            ? { ...task, completed: !task.completed }
            : task
        ),
      };

    // DELETE_TASK - Remove a task
    case "DELETE_TASK":
      return {
        ...state,
        tasks: state.tasks.filter((task) => task.id !== action.payload),
      };

    // EDIT_TASK - NEW: Update task text
    case "EDIT_TASK":
      return {
        ...state,
        tasks: state.tasks.map((task) =>
          task.id === action.payload.id
            ? { ...task, text: action.payload.text }
            : task
        ),
      };

    // FILTER_TASKS - NEW: Set filter type
    case "FILTER_TASKS":
      return {
        ...state,
        filter: action.payload,
      };

    // Default case
    default:
      return state;
  }
};

// Helper function to get filtered tasks
export const getFilteredTasks = (tasks, filter) => {
  switch (filter) {
    case "active":
      return tasks.filter((task) => !task.completed);
    case "completed":
      return tasks.filter((task) => task.completed);
    case "all":
    default:
      return tasks;
  }
};
