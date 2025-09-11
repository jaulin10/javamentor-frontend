import React from "react";
import { motion } from "framer-motion";
import { Bot, User } from "lucide-react";

const MessageBubble = ({ message, index }) => {
  const formatMessage = (content) => {
    content = content.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");
    content = content.replace(
      /`([^`]+)`/g,
      '<code class="bg-gray-800 px-1 py-0.5 rounded text-orange-400">$1</code>'
    );
    content = content.replace(
      /```(\w+)?\n([\s\S]*?)```/g,
      '<pre class="bg-gray-900 p-3 rounded-lg overflow-x-auto my-2 text-xs sm:text-sm"><code class="text-green-400">$2</code></pre>'
    );
    content = content.replace(/\n/g, "<br>");
    return content;
  };

  return (
    <motion.div
      className={`flex ${message.isBot ? "justify-start" : "justify-end"} my-1`}
      initial={{ opacity: 0, y: 20, scale: 0.8 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{
        type: "spring",
        stiffness: 500,
        damping: 30,
        delay: index * 0.05,
      }}
    >
      <div
        className={`max-w-sm sm:max-w-md ${
          message.isBot ? "mr-auto" : "ml-auto"
        }`}
      >
        <div
          className={`flex items-start gap-2 sm:gap-3 ${
            message.isBot ? "" : "flex-row-reverse"
          }`}
        >
          <motion.div
            className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
              message.isBot
                ? "bg-gradient-to-r from-green-500 to-blue-500"
                : "bg-gradient-to-r from-orange-500 to-red-500"
            }`}
            whileHover={{ scale: 1.1 }}
            transition={{ type: "spring", stiffness: 400 }}
          >
            {message.isBot ? (
              <Bot className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white" />
            ) : (
              <User className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white" />
            )}
          </motion.div>

          <motion.div
            className={`rounded-xl p-2 sm:p-3 shadow-md ${
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
              className="text-white text-xs sm:text-sm leading-snug sm:leading-relaxed break-words"
              dangerouslySetInnerHTML={{
                __html: formatMessage(message.content),
              }}
            />
            <p className="text-[10px] sm:text-xs text-gray-400 mt-1 text-right">
              {new Date(message.timestamp).toLocaleTimeString()}
            </p>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default MessageBubble;
