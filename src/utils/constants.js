// API Configuration
export const API_BASE_URL = "http://localhost:8000/api";

// Authentication
export const TOKEN_KEY = "token";
export const USER_KEY = "user";

// Java Learning Levels
export const JAVA_LEVELS = {
  BEGINNER: "beginner",
  INTERMEDIATE: "intermediate",
  ADVANCED: "advanced",
};

export const LEVEL_LABELS = {
  [JAVA_LEVELS.BEGINNER]: "Débutant",
  [JAVA_LEVELS.INTERMEDIATE]: "Intermédiaire",
  [JAVA_LEVELS.ADVANCED]: "Avancé",
};

// Exercise Difficulties
export const EXERCISE_DIFFICULTIES = {
  EASY: "easy",
  MEDIUM: "medium",
  HARD: "hard",
};

// Exercise Topics
export const EXERCISE_TOPICS = {
  VARIABLES: "variables",
  LOOPS: "loops",
  CONDITIONS: "conditions",
  OOP: "oop",
  COLLECTIONS: "collections",
  EXCEPTIONS: "exceptions",
};

// UI Constants
export const TOAST_DURATION = 4000;

export const ANIMATION_DURATIONS = {
  FAST: 0.2,
  MEDIUM: 0.3,
  SLOW: 0.5,
};

// Regex Patterns
export const PATTERNS = {
  EMAIL: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  PASSWORD: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d@$!%*?&]{8,}$/,
  USERNAME: /^[a-zA-Z0-9_]{3,20}$/,
};

// Default Messages
export const DEFAULT_MESSAGES = {
  WELCOME: "Bienvenue sur JavaMentor ! 👋",
  ERROR_GENERAL: "Une erreur inattendue s'est produite",
  ERROR_NETWORK: "Erreur de connexion. Vérifiez votre connexion internet.",
  SUCCESS_LOGIN: "Connexion réussie !",
  SUCCESS_REGISTER: "Compte créé avec succès !",
};
