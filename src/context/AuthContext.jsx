import { createContext, useState, useContext, useEffect } from "react";
import { registerRequest, loginRequest } from "../api/Auth";

export const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const loggedUser = window.localStorage.getItem("loggedUserJSON");
    if (loggedUser) {
      const loggedUserObject = JSON.parse(loggedUser);
      setUser(loggedUserObject.newUser);
      setIsAuthenticated(true);
    }
  }, []);

  const signup = async (user) => {
    try {
      const res = await registerRequest(user);
      setUser(res.data);
      setIsAuthenticated(true);
    } catch (error) {
      console.error(error);
    }
  };

  const signin = async (user) => {
    try {
      const res = await loginRequest(user);
      setUser(res.data.newUser);
      setIsAuthenticated(true);
      window.localStorage.setItem("loggedUserJSON", JSON.stringify(res.data));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        signup,
        signin,
        user,
        isAuthenticated,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
