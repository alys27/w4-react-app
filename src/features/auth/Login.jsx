import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const MOCK_USERS = [
  { username: "admin", password: "admin123" },
  { username: "test", password: "test1234" },
];

const handleSubmit = (e) => {
    e.preventDefault();

    if (!username || !password) {
      setError("Please fill in both fields");
      return;
    }

    const foundUser = MOCK_USERS.find(
      (u) => u.username === username && u.password === password
    );

    if (!foundUser) {
      setError("Invalid username or password");
      return;
    }

    const fakeToken = "fake-jwt-token-" + Date.now();
    login(fakeToken);
    navigate("/dashboard");
  };
  const particles = [
    { left: "10%", size: 6, duration: 14, delay: 0 },
    { left: "25%", size: 4, duration: 18, delay: 3 },
    { left: "40%", size: 8, duration: 12, delay: 1 },
    { left: "60%", size: 5, duration: 16, delay: 5 },
    { left: "75%", size: 7, duration: 20, delay: 2 },
    { left: "88%", size: 4, duration: 15, delay: 4 },
  ];

return (
  <div className="auth-container">
    {particles.map((p, i) => (
        <span
          key={i}
          className="particle"
          style={{
            left: p.left,
            bottom: "-20px",
            width: p.size,
            height: p.size,
            animationDuration: `${p.duration}s`,
            animationDelay: `${p.delay}s`,
          }}
        />
      ))}
      
    <div className="auth-card">
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input
            id="username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        {error && <p className="error-text">{error}</p>}
        <button type="submit" className="btn-primary">Login</button>
      </form>
    </div>
  </div>
);
}

export default Login;