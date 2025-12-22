// src/App.js
import React from "react";
import AddTask from "./components/AddTask";
import TaskList from "./components/TaskList";
import { TaskProvider } from "./context/TaskContext";
import "./App.css";

function App() {
  return (
    // Wrap everything in TaskProvider so all components can access context
    <TaskProvider>
      <div className="App">
        <header className="App-header">
          <h1>📝 Task Manager</h1>
          <p>Using React Context + Reducer</p>
        </header>

        <main className="container">
          <AddTask />
          <TaskList />
        </main>

        <footer>
          <p>Made with React Hooks: useContext & useReducer</p>
        </footer>
      </div>
    </TaskProvider>
  );
}

export default App;
