// src/components/TaskFilter.js
import React from "react";
import { useTasks } from "../context/TaskContext";

const TaskFilter = () => {
  const { filter, setFilter } = useTasks();

  const filters = [
    { key: "all", label: "All Tasks", emoji: "📋" },
    { key: "active", label: "Active", emoji: "⚡" },
    { key: "completed", label: "Completed", emoji: "✅" },
  ];

  return (
    <div className="task-filter">
      <h3>Filter Tasks</h3>
      <div className="filter-buttons">
        {filters.map(({ key, label, emoji }) => (
          <button
            key={key}
            onClick={() => setFilter(key)}
            className={`filter-button ${filter === key ? "active" : ""}`}
          >
            {emoji} {label}
          </button>
        ))}
      </div>

      <div className="filter-info">
        <span>
          Current filter: <strong>{filter}</strong>
        </span>
      </div>
    </div>
  );
};

export default TaskFilter;
