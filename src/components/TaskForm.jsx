import { useState } from "react";
import { useTasks } from "../context/TaskContext";

function TaskForm() {
  const [title, setTitle] = useState("");
  const [error, setError] = useState("");
  const { dispatch } = useTasks();

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

    dispatch({
      type: "ADD_TASK",
      payload: { id: Date.now(), title: trimmedTitle, completed: false },
    });

    setTitle("");
    setError("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Enter task title"
        value={title}
        onChange={(e) => {
          setTitle(e.target.value);
          if (error) setError("");
        }}
      />
      <button type="submit">Add Task</button>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </form>
  );
}

export default TaskForm;