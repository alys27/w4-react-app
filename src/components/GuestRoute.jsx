import { Navigate } from "react-router-dom";
import { useAuth } from "../features/auth/AuthContext";

export function GuestRoute({ children }) {
  const { isAuthenticated } = useAuth();

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
}