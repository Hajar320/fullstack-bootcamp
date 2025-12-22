// src/context/TaskContext.js
import React, { createContext, useReducer, useContext } from "react";
import { taskReducer, initialState, getFilteredTasks } from "./TaskReducer";

// Create Context
export const TaskContext = createContext();

// Create Provider
export const TaskProvider = ({ children }) => {
  const [state, dispatch] = useReducer(taskReducer, initialState);

  // Helper functions
  const addTask = (text) => {
    dispatch({ type: "ADD_TASK", payload: text });
  };

  const toggleTask = (id) => {
    dispatch({ type: "TOGGLE_TASK", payload: id });
  };

  const deleteTask = (id) => {
    dispatch({ type: "DELETE_TASK", payload: id });
  };

  // NEW: Edit task function
  const editTask = (id, text) => {
    dispatch({
      type: "EDIT_TASK",
      payload: { id, text },
    });
  };

  // NEW: Set filter function
  const setFilter = (filterType) => {
    dispatch({
      type: "FILTER_TASKS",
      payload: filterType,
    });
  };

  // Get filtered tasks
  const filteredTasks = getFilteredTasks(state.tasks, state.filter);

  // Context value
  const contextValue = {
    tasks: state.tasks, // All tasks
    filteredTasks, // Filtered tasks
    filter: state.filter, // Current filter
    addTask,
    toggleTask,
    deleteTask,
    editTask, // NEW
    setFilter, // NEW
  };

  return (
    <TaskContext.Provider value={contextValue}>{children}</TaskContext.Provider>
  );
};

// Custom hook
export const useTasks = () => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error("useTasks must be used within a TaskProvider");
  }
  return context;
};
