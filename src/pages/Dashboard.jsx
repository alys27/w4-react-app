import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useTasks } from "../context/TaskContext";

function Dashboard() {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const { state, dispatch } = useTasks();

  const handleLogout = () => {
    logout();
    navigate("/login", { replace: true });
  };

  const addTestTask = () => {
    dispatch({
      type: "ADD_TASK",
      payload: { id: Date.now(), title: "Test task", completed: false },
    });
  };

  return (
    <div>
      <h1>Dashboard (Protected)</h1>
      <button onClick={handleLogout}>Logout</button>

      <hr />

      <button onClick={addTestTask}>Add Test Task</button>
      <ul>
        {state.tasks.map((task) => (
          <li key={task.id}>{task.title}</li>
        ))}
      </ul>
    </div>
  );
}

export default Dashboard;