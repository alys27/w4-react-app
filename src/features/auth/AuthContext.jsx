import { createContext, useContext, useReducer, useEffect } from "react";

const AuthContext = createContext(null);
const TOKEN_TTL = 2 * 60 * 1000;

function getStoredSession() {
  const savedToken = localStorage.getItem("token");
  const expiresAt = localStorage.getItem("expiresAt");
  if (savedToken && expiresAt && Date.now() < Number(expiresAt)) {
    return { token: savedToken, expiresAt: Number(expiresAt) };
  }
  localStorage.removeItem("token");
  localStorage.removeItem("expiresAt");
  return { token: null, expiresAt: null };
}

function authReducer(state, action) {
  switch (action.type) {
    case "LOGIN":
      return { token: action.payload.token, expiresAt: action.payload.expiresAt };
    case "LOGOUT":
      return { token: null, expiresAt: null };
    default:
      return state;
  }
}

export function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(authReducer, null, getStoredSession);

  const login = (newToken) => {
    const expiresAt = Date.now() + TOKEN_TTL;
    localStorage.setItem("token", newToken);
    localStorage.setItem("expiresAt", String(expiresAt));
    dispatch({ type: "LOGIN", payload: { token: newToken, expiresAt } });
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("expiresAt");
    dispatch({ type: "LOGOUT" });
  };

  const isExpired = () => !state.expiresAt || Date.now() >= state.expiresAt;

  useEffect(() => {
    if (!state.token) return;

    const timeLeft = state.expiresAt - Date.now();
    if (timeLeft <= 0) {
      logout();
      return;
    }

    const timer = setTimeout(() => logout(), timeLeft);
    return () => clearTimeout(timer);
  }, [state.token, state.expiresAt]);

  const value = {
    token: state.token,
    isAuthenticated: !!state.token,
    login,
    logout,
    isExpired,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}