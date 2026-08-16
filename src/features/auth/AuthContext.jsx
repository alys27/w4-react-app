import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext(null);
const TOKEN_TTL = 15 * 60 * 1000; // 15 dəqiqə

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => {
    const savedToken = localStorage.getItem("token");
    const expiresAt = localStorage.getItem("expiresAt");
    if (savedToken && expiresAt && Date.now() < Number(expiresAt)) {
      return savedToken;
    }
    localStorage.removeItem("token");
    localStorage.removeItem("expiresAt");
    return null;
  });

  const login = (newToken) => {
    const expiresAt = Date.now() + TOKEN_TTL;
    localStorage.setItem("token", newToken);
    localStorage.setItem("expiresAt", String(expiresAt));
    setToken(newToken);
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("expiresAt");
    setToken(null);
  };

  useEffect(() => {
    if (!token) return;

    const expiresAt = Number(localStorage.getItem("expiresAt"));
    const timeLeft = expiresAt - Date.now();

    if (timeLeft <= 0) {
      logout();
      return;
    }

    const timer = setTimeout(() => {
      logout();
    }, timeLeft);

    return () => clearTimeout(timer);
  }, [token]);

  const value = { token, isAuthenticated: !!token, login, logout };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}