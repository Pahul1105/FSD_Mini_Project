import { createContext, useContext, useEffect, useState } from "react";
import {
  getCurrentUser,
  loginUser,
  logoutUser,
  registerUser,
  seedPortalData,
} from "../services/portalStore";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    seedPortalData();
    setCurrentUser(getCurrentUser());
  }, []);

  function login(email, password) {
    const user = loginUser(email, password);
    setCurrentUser(user);
    return user;
  }

  function register(name, email, password) {
    const user = registerUser(name, email, password);
    setCurrentUser(user);
    return user;
  }

  function logout() {
    logoutUser();
    setCurrentUser(null);
  }

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        isLoggedIn: Boolean(currentUser),
        login,
        logout,
        register,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
