import React, { createContext, useContext, useState, useEffect } from "react";

const LanguageContext = createContext({});

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState(() => {
    // Récupérer la langue sauvegardée ou détecter la langue du navigateur
    const savedLanguage = localStorage.getItem("language");
    if (savedLanguage) return savedLanguage;

    const browserLanguage = navigator.language || navigator.userLanguage;
    return browserLanguage.startsWith("fr") ? "fr" : "en";
  });

  useEffect(() => {
    localStorage.setItem("language", language);
  }, [language]);

  const changeLanguage = (newLanguage) => {
    setLanguage(newLanguage);
  };

  const value = {
    language,
    changeLanguage,
    isEnglish: language === "en",
    isFrench: language === "fr",
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};
