import React from "react";
import { motion } from "framer-motion";
import { Bot, User } from "lucide-react";

const MessageBubble = ({ message, index }) => {
  const formatMessage = (content) => {
    // Remplacer les **text** par du gras
    content = content.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");

    // Remplacer les `code` par du code inline
    content = content.replace(
      /`([^`]+)`/g,
      '<code class="bg-gray-800 px-1 py-0.5 rounded text-orange-400">$1</code>'
    );

    // Gérer les blocs de code ```
    content = content.replace(
      /```(\w+)?\n([\s\S]*?)```/g,
      '<pre class="bg-gray-900 p-4 rounded-lg overflow-x-auto my-3"><code class="text-green-400">$2</code></pre>'
    );

    // Remplacer les nouvelles lignes par des <br>
    content = content.replace(/\n/g, "<br>");

    return content;
  };

  return (
    <motion.div
      className={`flex ${message.isBot ? "justify-start" : "justify-end"}`}
      initial={{ opacity: 0, y: 20, scale: 0.8 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{
        type: "spring",
        stiffness: 500,
        damping: 30,
        delay: index * 0.1,
      }}
    >
      <div className={`max-w-lg ${message.isBot ? "mr-auto" : "ml-auto"}`}>
        <div
          className={`flex items-start space-x-3 ${
            message.isBot ? "" : "flex-row-reverse space-x-reverse"
          }`}
        >
          <motion.div
            className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
              message.isBot
                ? "bg-gradient-to-r from-green-500 to-blue-500"
                : "bg-gradient-to-r from-orange-500 to-red-500"
            }`}
            whileHover={{ scale: 1.1 }}
            transition={{ type: "spring", stiffness: 400 }}
          >
            {message.isBot ? (
              <Bot className="w-4 h-4 text-white" />
            ) : (
              <User className="w-4 h-4 text-white" />
            )}
          </motion.div>

          <motion.div
            className={`rounded-2xl p-4 shadow-lg ${
              message.isBot
                ? "bg-white/10 backdrop-blur-lg border border-white/20"
                : "bg-gradient-to-r from-blue-600 to-purple-600"
            }`}
            whileHover={{
              scale: 1.02,
              boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5)",
            }}
            transition={{ type: "spring", stiffness: 400 }}
          >
            <div
              className="text-white leading-relaxed"
              dangerouslySetInnerHTML={{
                __html: formatMessage(message.content),
              }}
            />
            <p className="text-xs text-gray-400 mt-2">
              {new Date(message.timestamp).toLocaleTimeString()}
            </p>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default MessageBubble;
