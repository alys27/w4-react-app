import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";
import { useTasks } from "./TaskContext";
import TaskForm from "./TaskForm";

function Dashboard() {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const { state, deleteTask, toggleTask } = useTasks();

  const handleLogout = () => {
    logout();
    navigate("/login", { replace: true });
  };

  return (
  <div className="dashboard-page">
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1>My Tasks</h1>
        <button onClick={handleLogout} className="btn-secondary">Logout</button>
      </div>

      <TaskForm />

      <ul className="task-list">
        {state.tasks.map((task) => (
          <li key={task.id} className="task-item">
            <span
              className={`task-title ${task.completed ? "completed" : ""}`}
              onClick={() => toggleTask(task)}
            >
              {task.title}
            </span>
            <button onClick={() => deleteTask(task.id)} className="btn-delete">
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  </div>
);
}

export default Dashboard;