// src/components/TaskList.js
import React from "react";
import { useTasks } from "../context/TaskContext";
import TaskItem from "./TaskItem";

const TaskList = () => {
  const { filteredTasks, tasks, filter } = useTasks();

  // Task statistics
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter((t) => t.completed).length;
  const activeTasks = totalTasks - completedTasks;

  // Get filter message
  const getFilterMessage = () => {
    switch (filter) {
      case "active":
        return `Showing active tasks (${activeTasks})`;
      case "completed":
        return `Showing completed tasks (${completedTasks})`;
      default:
        return `Showing all tasks (${totalTasks})`;
    }
  };

  return (
    <div className="task-list">
      <div className="list-header">
        <h2>Your Tasks</h2>
        <span className="filter-message">{getFilterMessage()}</span>
      </div>

      {/* Task Statistics */}
      <div className="task-statistics">
        <div className="stat-item">
          <span className="stat-number">{totalTasks}</span>
          <span className="stat-label">Total</span>
        </div>
        <div className="stat-item">
          <span className="stat-number">{activeTasks}</span>
          <span className="stat-label">Active</span>
        </div>
        <div className="stat-item">
          <span className="stat-number">{completedTasks}</span>
          <span className="stat-label">Completed</span>
        </div>
        <div className="stat-item">
          <span className="stat-number">
            {totalTasks > 0
              ? Math.round((completedTasks / totalTasks) * 100)
              : 0}
            %
          </span>
          <span className="stat-label">Done</span>
        </div>
      </div>

      {/* Tasks Container */}
      {filteredTasks.length === 0 ? (
        <div className="no-tasks-message">
          {filter === "all" && tasks.length === 0 ? (
            <>
              <div className="emoji">📝</div>
              <h3>No tasks yet!</h3>
              <p>Add your first task above to get started.</p>
            </>
          ) : filter === "active" ? (
            <>
              <div className="emoji">🎉</div>
              <h3>No active tasks!</h3>
              <p>All tasks are completed. Great job!</p>
            </>
          ) : (
            <>
              <div className="emoji">🚀</div>
              <h3>No completed tasks!</h3>
              <p>Complete some tasks to see them here.</p>
            </>
          )}
        </div>
      ) : (
        <div className="tasks-container">
          {filteredTasks.map((task) => (
            <TaskItem key={task.id} task={task} />
          ))}
        </div>
      )}
    </div>
  );
};

export default TaskList;
