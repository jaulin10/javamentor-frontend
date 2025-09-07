import React, { createContext, useContext, useState, useEffect } from "react";
import toast from "react-hot-toast";
import { authAPI } from "../services/api";

const AuthContext = createContext({});

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Vérifier le token au chargement
  useEffect(() => {
    const checkAuth = async () => {
      setLoading(true);
      const token = localStorage.getItem("token");
      const savedUser = localStorage.getItem("user");

      if (token && savedUser) {
        try {
          const userData = JSON.parse(savedUser);
          setUser(userData);
          setIsAuthenticated(true);
        } catch (error) {
          localStorage.removeItem("token");
          localStorage.removeItem("user");
        }
      }
      setLoading(false);
    };

    checkAuth();
  }, []);

  const login = async (credentials) => {
    try {
      setLoading(true);

      // Login via backend
      const response = await authAPI.login(credentials);
      const { access_token } = response.data;

      localStorage.setItem("token", access_token);

      // Récupérer les infos utilisateur
      const userResponse = await authAPI.getProfile();
      const userData = userResponse.data;

      localStorage.setItem("user", JSON.stringify(userData));
      setUser(userData);
      setIsAuthenticated(true);

      toast.success(`Bienvenue ${userData.username} !`);
      return { success: true };
    } catch (error) {
      const message = error.response?.data?.detail || "Erreur de connexion";
      toast.error(message);
      return { success: false, error: message };
    } finally {
      setLoading(false);
    }
  };

  const register = async (userData) => {
    try {
      setLoading(true);

      // Inscription via backend
      await authAPI.register(userData);

      // Connexion automatique après inscription
      const loginResult = await login({
        username: userData.username,
        password: userData.password,
      });

      if (loginResult.success) {
        toast.success("Compte créé avec succès ! 🚀");
      }

      return loginResult;
    } catch (error) {
      const message =
        error.response?.data?.detail || "Erreur lors de la création du compte";
      toast.error(message);
      return { success: false, error: message };
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    setIsAuthenticated(false);
    toast.success("Déconnexion réussie ! 👋");
  };

  const updateUserLevel = (newLevel) => {
    if (user) {
      const updatedUser = { ...user, java_level: newLevel };
      setUser(updatedUser);
      localStorage.setItem("user", JSON.stringify(updatedUser));
    }
  };

  const value = {
    user,
    loading,
    isAuthenticated,
    login,
    register,
    logout,
    updateUserLevel,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
