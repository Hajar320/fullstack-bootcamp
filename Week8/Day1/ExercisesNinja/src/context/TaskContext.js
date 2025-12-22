// src/context/TaskContext.js
import React, { createContext, useReducer, useContext } from "react";
import { taskReducer, initialState } from "./TaskReducer";

// Step 1: Create the Context
export const TaskContext = createContext();

// Step 2: Create the Provider Component
export const TaskProvider = ({ children }) => {
  // useReducer hook connects our reducer with state
  const [state, dispatch] = useReducer(taskReducer, initialState);

  // Step 3: Create helper functions for components to use
  const addTask = (text) => {
    dispatch({ type: "ADD_TASK", payload: text });
  };

  const toggleTask = (id) => {
    dispatch({ type: "TOGGLE_TASK", payload: id });
  };

  const deleteTask = (id) => {
    dispatch({ type: "DELETE_TASK", payload: id });
  };

  // Step 4: What data/functions will be available to all components
  const contextValue = {
    tasks: state.tasks, // The array of tasks
    addTask, // Function to add task
    toggleTask, // Function to toggle completion
    deleteTask, // Function to delete task
  };

  // Step 5: Provide the context to all child components
  return (
    <TaskContext.Provider value={contextValue}>{children}</TaskContext.Provider>
  );
};

// Step 6: Custom hook for easy context access
export const useTasks = () => {
  const context = useContext(TaskContext);

  // Error handling - if used outside TaskProvider
  if (!context) {
    throw new Error("useTasks must be used within a TaskProvider");
  }

  return context;
};
