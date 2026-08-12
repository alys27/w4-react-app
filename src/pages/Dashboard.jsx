import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Dashboard() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login", { replace: true });
  };

  return (
    <div>
      <h1>Dashboard (Protected)</h1>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}

export default Dashboard;