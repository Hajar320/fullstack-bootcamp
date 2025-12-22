// src/components/TaskItem.js
import React, { useState, useRef, useEffect } from "react";
import { useTasks } from "../context/TaskContext";

const TaskItem = ({ task }) => {
  // State for editing
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(task.text);

  // Ref for input focus
  const editInputRef = useRef(null);

  // Get context functions
  const { toggleTask, deleteTask, editTask } = useTasks();

  // Focus input when editing starts
  useEffect(() => {
    if (isEditing && editInputRef.current) {
      editInputRef.current.focus();
      editInputRef.current.select(); // Select all text
    }
  }, [isEditing]);

  // Handle edit save
  const handleSaveEdit = () => {
    if (editText.trim() === "") {
      alert("Task cannot be empty!");
      return;
    }

    editTask(task.id, editText);
    setIsEditing(false);
  };

  // Handle cancel edit
  const handleCancelEdit = () => {
    setEditText(task.text);
    setIsEditing(false);
  };

  // Handle Enter/Escape keys during edit
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSaveEdit();
    } else if (e.key === "Escape") {
      handleCancelEdit();
    }
  };

  return (
    <div className={`task-item ${task.completed ? "completed" : ""}`}>
      {/* Checkbox */}
      <input
        type="checkbox"
        checked={task.completed}
        onChange={() => toggleTask(task.id)}
        className="task-checkbox"
        disabled={isEditing}
      />

      {/* Task Content - Shows different view based on editing state */}
      {isEditing ? (
        // Edit Mode
        <div className="edit-mode">
          <input
            ref={editInputRef}
            type="text"
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            onKeyDown={handleKeyDown}
            className="edit-input"
            placeholder="Edit task..."
          />
          <div className="edit-buttons">
            <button onClick={handleSaveEdit} className="save-btn">
              💾 Save
            </button>
            <button onClick={handleCancelEdit} className="cancel-btn">
              ❌ Cancel
            </button>
          </div>
        </div>
      ) : (
        // View Mode
        <div className="view-mode">
          <span
            className="task-text"
            onDoubleClick={() => !task.completed && setIsEditing(true)}
            style={{ cursor: task.completed ? "default" : "pointer" }}
          >
            {task.text}
          </span>

          <div className="task-actions">
            {!task.completed && (
              <button
                onClick={() => setIsEditing(true)}
                className="edit-button"
                title="Edit task"
              >
                ✏️ Edit
              </button>
            )}

            <button
              onClick={() => deleteTask(task.id)}
              className="delete-button"
              title="Delete task"
            >
              🗑️ Delete
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TaskItem;
