import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";
import { useTasks } from "./TaskContext";
import TaskForm from "./TaskForm";

function Dashboard() {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const { state, deleteTask, toggleTask, updateTaskTitle } = useTasks();
  const [editingId, setEditingId] = useState(null);
  const [editValue, setEditValue] = useState("");

  const [crash, setCrash] = useState(false);
    if (crash) throw new Error("Simulated crash for testing Error Boundary");

  const handleLogout = () => {
    logout();
    navigate("/login", { replace: true });
  };

  const startEdit = (task) => {
    setEditingId(task.id);
    setEditValue(task.title);
  };

  const saveEdit = (task) => {
    if (editValue.trim()) {
      updateTaskTitle(task, editValue.trim());
    }
    setEditingId(null);
  };

  return (
    <div className="dashboard-page">
      <div className="dashboard-container">
        <div className="dashboard-header">
          <h1>My Tasks</h1>
          <button onClick={handleLogout} className="btn-secondary">
            Logout
          </button>

          <button onClick={() => setCrash(true)} className="btn-secondary">
            Simulate Crash
          </button>
        </div>

        <TaskForm />

        <ul className="task-list">
          {state.tasks.map((task) => (
            <li key={task.id} className="task-item">
              {editingId === task.id ? (
                <input
                  value={editValue}
                  onChange={(e) => setEditValue(e.target.value)}
                  onBlur={() => saveEdit(task)}
                  onKeyDown={(e) => e.key === "Enter" && saveEdit(task)}
                  autoFocus
                />
              ) : (
                <span
                  className={`task-title ${task.completed ? "completed" : ""}`}
                  onClick={() => toggleTask(task)}
                  onDoubleClick={() => startEdit(task)}
                >
                  {task.title}
                </span>
              )}
              <button
                onClick={() => deleteTask(task.id)}
                className="btn-delete"
              >
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