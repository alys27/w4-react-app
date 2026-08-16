import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div style={{ textAlign: "center", padding: "60px 20px" }}>
      <h1>404</h1>
      <p>Page not found.</p>
      <Link to="/login">Go back to Login</Link>
    </div>
  );
}

export default NotFound;