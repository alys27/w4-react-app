import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useTasks } from "../context/TaskContext";
import TaskForm from "../components/TaskForm";

function Dashboard() {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const { state } = useTasks();

  const handleLogout = () => {
    logout();
    navigate("/login", { replace: true });
  };

  return (
    <div>
      <h1>Dashboard (Protected)</h1>
      <button onClick={handleLogout}>Logout</button>

      <hr />

      <TaskForm />

      <ul>
        {state.tasks.map((task) => (
          <li key={task.id}>{task.title}</li>
        ))}
      </ul>
    </div>
  );
}

export default Dashboard;