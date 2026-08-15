import { useState } from "react";
import { useTasks } from "./TaskContext";

function TaskForm() {
  const [title, setTitle] = useState("");
  const [error, setError] = useState("");
  const { addTask } = useTasks();

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmedTitle = title.trim();

    if (!trimmedTitle) {
      setError("Task title cannot be empty");
      return;
    }
    if (trimmedTitle.length < 3) {
      setError("Task title must be at least 3 characters");
      return;
    }

    addTask(trimmedTitle);
    setTitle("");
    setError("");
  };

  return (
    <form onSubmit={handleSubmit} className="task-form">
      <input
        type="text"
        placeholder="Enter task title"
        value={title}
        onChange={(e) => {
          setTitle(e.target.value);
          if (error) setError("");
        }}
      />
      <button type="submit" className="btn-primary" style={{ width: "auto" }}>
        Add
      </button>
      {error && <p className="error-text">{error}</p>}
    </form>
  );
}

export default TaskForm;