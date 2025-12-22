// src/App.js
import React from "react";
import AddTask from "./components/AddTask";
import TaskList from "./components/TaskList";
import TaskFilter from "./components/TaskFilter";
import { TaskProvider } from "./context/TaskContext";
import "./App.css";

function App() {
  return (
    <TaskProvider>
      <div className="App">
        <header className="App-header">
          <h1>✨ Enhanced Task Manager</h1>
          <p>Edit tasks, filter views, and track your progress!</p>
        </header>

        <main className="container">
          <div className="left-panel">
            <AddTask />
            <TaskFilter />
          </div>

          <div className="right-panel">
            <TaskList />
          </div>
        </main>

        <footer className="App-footer">
          <div className="footer-content">
            <p>
              <strong>Features:</strong> Add • Edit • Delete • Toggle • Filter
            </p>
            <p className="tech-stack">
              Built with React Hooks: useContext • useReducer • useRef
            </p>
            <p className="tips">
              💡 Tip: Double-click on a task to edit it quickly!
            </p>
          </div>
        </footer>
      </div>
    </TaskProvider>
  );
}

export default App;
