import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext(null);
const TOKEN_TTL = 2 * 60 * 1000; // 2 dəqiqə — demo/test üçün qısa saxlanılıb

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

  const isExpired = () => {
    const expiresAt = Number(localStorage.getItem("expiresAt"));
    return !expiresAt || Date.now() >= expiresAt;
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

  const value = { token, isAuthenticated: !!token, login, logout, isExpired };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}