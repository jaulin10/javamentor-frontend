import axios from "axios";

const API_BASE_URL =
  process.env.REACT_APP_API_URL || "http://localhost:8000/api";

// Création d'une instance Axios avec une base URL
const api = axios.create({
  baseURL: API_BASE_URL,
});

// Intercepteur pour ajouter automatiquement le token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    console.log("🔍 Token récupéré:", token ? "Token présent" : "Aucun token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
      console.log("✅ Header Authorization ajouté");
    } else {
      console.log("❌ Aucun token trouvé dans localStorage");
    }

    console.log("📤 Headers finaux:", config.headers);
    return config;
  },
  (error) => {
    console.error("❌ Erreur dans l'intercepteur:", error);
    return Promise.reject(error);
  }
);

// Intercepteur de réponse pour gérer les erreurs d'authentification
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      console.log("🚨 Token expiré, redirection vers login");
      localStorage.removeItem("token");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

// Auth API
export const authAPI = {
  register: (userData) => api.post("/auth/register", userData),
  login: (credentials) => api.post("/auth/login", credentials),
  getProfile: () => api.get("/auth/me"),
};

// Chat API - Version avec headers explicites pour débogage
export const chatAPI = {
  sendMessage: (message, conversationId = null) => {
    const token = localStorage.getItem("token");
    console.log("🔄 Envoi message avec token:", token ? "présent" : "absent");

    return api.post(
      "/chat/send",
      {
        message,
        conversation_id: conversationId,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
  },

  getConversations: () => api.get("/chat/conversations"),

  getConversation: (id) => api.get(`/chat/conversations/${id}`),

  deleteConversation: (id) => api.delete(`/chat/conversations/${id}`),
};

// Exercises API
export const exercisesAPI = {
  getExercises: async (difficulty = null, topic = null) => {
    await new Promise((resolve) => setTimeout(resolve, 800));

    return {
      data: [
        {
          id: 1,
          title: "Variables de base",
          description: "Apprenez à déclarer et utiliser des variables en Java",
          difficulty: "beginner",
          topic: "variables",
        },
        {
          id: 2,
          title: "Boucles for",
          description: "Maîtrisez les boucles for en Java",
          difficulty: "beginner",
          topic: "loops",
        },
      ],
    };
  },
};

export default {
  authAPI,
  chatAPI,
  exercisesAPI,
};
