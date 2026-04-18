import React, { createContext, useContext, useEffect, useState } from "react";
import { getProfile } from "../api/auth";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  
  const fetchUser = async () => {
    const token = localStorage.getItem("token");
  
    if (!token) {
      setLoading(false);
      return;
    }

    try {
      const res = await getProfile();
      setUser(res.data.data.user);
    } catch (err) {
      setUser(null);
      localStorage.removeItem("token");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const login = async (token) => {
    localStorage.setItem("token", token);
    await fetchUser();
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
