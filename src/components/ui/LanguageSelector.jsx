import React from "react";
import { motion } from "framer-motion";
import { useLanguage } from "../../context/LanguageContext";
import { Globe } from "lucide-react";

const LanguageSelector = ({ className = "" }) => {
  const { language, changeLanguage } = useLanguage();

  const languages = [
    { code: "fr", label: "Français", flag: "🇫🇷" },
    { code: "en", label: "English", flag: "🇺🇸" },
  ];

  const currentLanguage = languages.find((lang) => lang.code === language);

  return (
    <div className={`relative group ${className}`}>
      <motion.button
        className="flex items-center space-x-2 px-3 py-2 bg-white/10 hover:bg-white/20 border border-white/20 rounded-lg text-white transition-all duration-200"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <Globe className="w-4 h-4" />
        <span className="text-sm">{currentLanguage?.flag}</span>
        <span className="hidden sm:block text-sm">
          {currentLanguage?.label}
        </span>
      </motion.button>

      {/* Dropdown */}
      <div className="absolute top-full right-0 mt-2 bg-white/10 backdrop-blur-lg border border-white/20 rounded-lg shadow-xl opacity-0 group-hover:opacity-100 transform scale-95 group-hover:scale-100 transition-all duration-200 z-50">
        <div className="p-2 min-w-[120px]">
          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => changeLanguage(lang.code)}
              className={`w-full flex items-center space-x-3 px-3 py-2 rounded-md text-sm transition-colors ${
                language === lang.code
                  ? "bg-blue-500/20 text-blue-300"
                  : "text-white hover:bg-white/10"
              }`}
            >
              <span>{lang.flag}</span>
              <span>{lang.label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LanguageSelector;
