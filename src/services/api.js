import axios from "axios";

const API_BASE_URL =
  process.env.REACT_APP_API_URL || "http://localhost:8000/api";

// Create an Axios instance with a base URL
const api = axios.create({
  baseURL: API_BASE_URL,
});

// Interceptor to automatically add the token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    console.log("🔍 Token retrieved:", token ? "Token present" : "No token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
      console.log("✅ Authorization header added");
    } else {
      console.log("❌ No token found in localStorage");
    }

    console.log("📤 Final headers:", config.headers);
    return config;
  },
  (error) => {
    console.error("❌ Error in interceptor:", error);
    return Promise.reject(error);
  }
);

// Response interceptor to handle authentication errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      console.log("🚨 Token expired, redirecting to login");
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

// Chat API - Version with explicit headers for debugging
export const chatAPI = {
  sendMessage: (message, conversationId = null) => {
    const token = localStorage.getItem("token");
    console.log("🔄 Sending message with token:", token ? "present" : "absent");

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
          title: "Basic Variables",
          description: "Learn how to declare and use variables in Java",
          difficulty: "beginner",
          topic: "variables",
        },
        {
          id: 2,
          title: "For Loops",
          description: "Master for loops in Java",
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
