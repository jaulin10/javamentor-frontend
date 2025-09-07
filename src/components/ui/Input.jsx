import React, { useState } from "react";
import { motion } from "framer-motion";
import { Eye, EyeOff } from "lucide-react";

const Input = ({
  label,
  type = "text",
  placeholder,
  value,
  onChange,
  error,
  icon: Icon,
  className = "",
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const inputType = type === "password" && showPassword ? "text" : type;

  return (
    <div className={`relative ${className}`}>
      {label && (
        <motion.label
          className={`block text-sm font-medium mb-2 transition-colors duration-200 ${
            error
              ? "text-red-400"
              : isFocused
              ? "text-blue-400"
              : "text-gray-300"
          }`}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {label}
        </motion.label>
      )}

      <div className="relative">
        {Icon && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Icon
              className={`h-5 w-5 transition-colors duration-200 ${
                error
                  ? "text-red-400"
                  : isFocused
                  ? "text-blue-400"
                  : "text-gray-400"
              }`}
            />
          </div>
        )}

        <motion.input
          type={inputType}
          className={`
            block w-full rounded-lg border-0 bg-white/10 backdrop-blur-lg
            py-3 pl-${Icon ? "10" : "4"} pr-${type === "password" ? "12" : "4"}
            text-white placeholder-gray-400
            ring-1 ring-inset transition-all duration-200
            focus:ring-2 focus:ring-inset focus:outline-none
            ${
              error
                ? "ring-red-500 focus:ring-red-500"
                : isFocused
                ? "ring-blue-500 focus:ring-blue-500"
                : "ring-gray-600 focus:ring-blue-500 hover:ring-gray-500"
            }
            ${Icon ? "pl-10" : "pl-4"}
            ${type === "password" ? "pr-12" : "pr-4"}
          `}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          whileFocus={{ scale: 1.02 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          {...props}
        />

        {type === "password" && (
          <button
            type="button"
            className="absolute inset-y-0 right-0 pr-3 flex items-center"
            onClick={() => setShowPassword(!showPassword)}
          >
            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
              {showPassword ? (
                <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-300" />
              ) : (
                <Eye className="h-5 w-5 text-gray-400 hover:text-gray-300" />
              )}
            </motion.div>
          </button>
        )}
      </div>

      {error && (
        <motion.p
          className="mt-2 text-sm text-red-400"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {error}
        </motion.p>
      )}
    </div>
  );
};

export default Input;
