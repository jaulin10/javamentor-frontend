import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import Button from "../components/ui/Button";
import { chatAPI } from "../services/api";
import MessageBubble from "../components/chat/MessageBubble";
import {
  Send,
  User,
  Bot,
  Code,
  LogOut,
  Sidebar,
  Plus,
  MessageCircle,
  Loader2,
  Trash2,
  MoreVertical,
} from "lucide-react";

const Chat = () => {
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  // State for conversations - start empty
  const [conversations, setConversations] = useState([]);
  const [currentConversationId, setCurrentConversationId] = useState(null);
  const [currentMessage, setCurrentMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showDeleteMenu, setShowDeleteMenu] = useState(null);
  const messagesEndRef = useRef(null);
  const textareaRef = useRef(null);

  // Get current conversation
  const currentConversation = conversations.find(
    (conv) => conv.id === currentConversationId
  );
  const messages = currentConversation?.messages || [];

  // Redirect if not authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated, navigate]);

  // Load existing conversations on startup
  useEffect(() => {
    const loadConversations = async () => {
      if (!isAuthenticated) return;

      try {
        const response = await chatAPI.getConversations();
        const serverConversations = response.data;

        if (serverConversations.length > 0) {
          // Convert server conversations to frontend format
          const formattedConversations = serverConversations.map((conv) => ({
            id: conv.id,
            title: conv.title || `Conversation ${conv.id}`,
            messages:
              conv.messages?.map((msg) => ({
                id: msg.id,
                content: msg.content,
                isBot: msg.is_bot,
                timestamp: msg.timestamp,
              })) || [],
            createdAt: conv.created_at,
          }));

          setConversations(formattedConversations);
          setCurrentConversationId(formattedConversations[0].id);
        } else {
          // Create a welcome conversation if no conversations exist
          createWelcomeConversation();
        }
      } catch (error) {
        console.error("Error loading conversations:", error);
        // In case of error, create a welcome conversation
        createWelcomeConversation();
      }
    };

    loadConversations();
  }, [isAuthenticated, user]);

  // Create a welcome conversation
  const createWelcomeConversation = () => {
    const welcomeConversation = {
      id: "welcome",
      title: "New conversation",
      messages: [
        {
          id: "welcome-msg",
          content: `Hello ${
            user?.username || "user"
          }!\n\nI'm **JavaMentor**, your personal assistant for learning Java. I'm here to help you master this language step by step.\n\n**How can I help you today?**\n- Explain Java concepts\n- Suggest adapted exercises\n- Correct your code\n- Answer your questions\n\nWhat would you like to learn first?`,
          isBot: true,
          timestamp: new Date().toISOString(),
        },
      ],
      createdAt: new Date().toISOString(),
    };

    setConversations([welcomeConversation]);
    setCurrentConversationId("welcome");
  };

  // Delete conversation function
  const handleDeleteConversation = async (conversationId, e) => {
    e.stopPropagation(); // Prevent conversation selection

    if (
      conversationId === "welcome" ||
      conversationId.toString().startsWith("new-")
    ) {
      // For local conversations, just remove from state
      setConversations((prev) =>
        prev.filter((conv) => conv.id !== conversationId)
      );

      // If deleting current conversation, switch to another one or create welcome
      if (conversationId === currentConversationId) {
        const remaining = conversations.filter(
          (conv) => conv.id !== conversationId
        );
        if (remaining.length > 0) {
          setCurrentConversationId(remaining[0].id);
        } else {
          createWelcomeConversation();
        }
      }

      setShowDeleteMenu(null);
      return;
    }

    try {
      await chatAPI.deleteConversation(conversationId);

      // Remove from local state
      setConversations((prev) =>
        prev.filter((conv) => conv.id !== conversationId)
      );

      // If deleting current conversation, switch to another one or create welcome
      if (conversationId === currentConversationId) {
        const remaining = conversations.filter(
          (conv) => conv.id !== conversationId
        );
        if (remaining.length > 0) {
          setCurrentConversationId(remaining[0].id);
        } else {
          createWelcomeConversation();
        }
      }

      setShowDeleteMenu(null);
      console.log("✅ Conversation deleted successfully");
    } catch (error) {
      console.error("❌ Error deleting conversation:", error);
      // You could show a toast notification here
    }
  };

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [currentMessage]);

  const handleSendMessage = async () => {
    if (!currentMessage.trim()) return;

    console.log("🔄 Sending message:", currentMessage);
    console.log("🆔 Current conversation ID:", currentConversationId);

    // Create user message for immediate display
    const userMessage = {
      id: `user-${Date.now()}`,
      content: currentMessage,
      isBot: false,
      timestamp: new Date().toISOString(),
    };

    // Add message to interface immediately
    setConversations((prev) =>
      prev.map((conv) =>
        conv.id === currentConversationId
          ? { ...conv, messages: [...conv.messages, userMessage] }
          : conv
      )
    );

    const messageToSend = currentMessage;
    setCurrentMessage("");
    setIsTyping(true);

    try {
      // Send to API - use null if it's the welcome conversation
      const conversationIdToSend =
        currentConversationId === "welcome" ||
        currentConversationId.toString().startsWith("new-")
          ? null
          : currentConversationId;

      console.log(
        "📤 Sending to API with conversation_id:",
        conversationIdToSend
      );

      const response = await chatAPI.sendMessage(
        messageToSend,
        conversationIdToSend
      );

      console.log("✅ Response received:", response.data);

      const {
        message: userMsgFromAPI,
        bot_response,
        conversation_id,
      } = response.data;

      // Update with server data
      setConversations((prev) => {
        return prev.map((conv) => {
          if (conv.id === currentConversationId) {
            return {
              ...conv,
              id: conversation_id, // Update with server ID
              messages: [
                ...conv.messages.slice(0, -1), // Remove temporary message
                {
                  id: userMsgFromAPI.id,
                  content: userMsgFromAPI.content,
                  isBot: false,
                  timestamp: userMsgFromAPI.timestamp,
                },
                {
                  id: bot_response.id,
                  content: bot_response.content,
                  isBot: true,
                  timestamp: bot_response.timestamp,
                },
              ],
            };
          }
          return conv;
        });
      });

      // Update current conversation ID
      setCurrentConversationId(conversation_id);
    } catch (error) {
      console.error("❌ Complete error:", error);
      console.error("❌ Error response:", error.response);

      // Display error message
      const errorMessage = {
        id: `error-${Date.now()}`,
        content: "Sorry, an error occurred. Please try again.",
        isBot: true,
        timestamp: new Date().toISOString(),
      };

      setConversations((prev) =>
        prev.map((conv) =>
          conv.id === currentConversationId
            ? { ...conv, messages: [...conv.messages, errorMessage] }
            : conv
        )
      );
    } finally {
      setIsTyping(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  // Function to create a new conversation
  const createNewConversation = () => {
    const newConversation = {
      id: `new-${Date.now()}`,
      title: `New conversation`,
      messages: [
        {
          id: `welcome-${Date.now()}`,
          content: `Hello ${
            user?.username || "user"
          }!\n\nNew conversation started! I'm **JavaMentor**, ready to help you.\n\n**How can I help you today?**`,
          isBot: true,
          timestamp: new Date().toISOString(),
        },
      ],
      createdAt: new Date().toISOString(),
    };

    setConversations((prev) => [newConversation, ...prev]);
    setCurrentConversationId(newConversation.id);
    setSidebarOpen(false);
  };

  // Close delete menu when clicking outside
  useEffect(() => {
    const handleClickOutside = () => {
      setShowDeleteMenu(null);
    };

    if (showDeleteMenu) {
      document.addEventListener("click", handleClickOutside);
      return () => document.removeEventListener("click", handleClickOutside);
    }
  }, [showDeleteMenu]);

  return (
    <div className="h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex">
      {/* Sidebar */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            className="fixed inset-0 z-50 lg:relative lg:inset-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* Mobile overlay */}
            <div
              className="absolute inset-0 bg-black/50 lg:hidden"
              onClick={() => setSidebarOpen(false)}
            />

            {/* Sidebar content */}
            <motion.div
              className="relative w-80 h-full bg-white/10 backdrop-blur-lg border-r border-white/20 flex flex-col"
              initial={{ x: -320 }}
              animate={{ x: 0 }}
              exit={{ x: -320 }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
            >
              {/* Header */}
              <div className="p-6 border-b border-white/20">
                <div className="flex items-center space-x-3">
                  <div
                    className="w-10 h-10 bg-gradient-to-r from-orange-500 to-red-500 rounded-lg flex items-center justify-center cursor-pointer"
                    onClick={() => navigate("/")}
                  >
                    <Code className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h2 className="text-white font-semibold">JavaMentor</h2>
                    <p className="text-gray-400 text-sm">AI Assistant</p>
                  </div>
                </div>

                <Button
                  onClick={createNewConversation}
                  variant="outline"
                  size="sm"
                  className="w-full mt-4 border-white/30 text-white hover:bg-white/10"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  New conversation
                </Button>
              </div>

              {/* Conversations */}
              <div className="flex-1 p-4 overflow-y-auto min-h-0">
                <div className="space-y-2">
                  {conversations.map((conversation) => (
                    <motion.div
                      key={conversation.id}
                      className={`relative group p-3 rounded-lg border cursor-pointer transition-colors ${
                        conversation.id === currentConversationId
                          ? "bg-white/20 border-white/30"
                          : "bg-white/10 border-white/20 hover:bg-white/15"
                      }`}
                      whileHover={{
                        backgroundColor:
                          conversation.id === currentConversationId
                            ? "rgba(255,255,255,0.2)"
                            : "rgba(255,255,255,0.15)",
                      }}
                      onClick={() => setCurrentConversationId(conversation.id)}
                    >
                      <div className="flex items-center space-x-3">
                        <MessageCircle className="w-4 h-4 text-gray-400 flex-shrink-0" />
                        <div className="flex-1 min-w-0">
                          <p className="text-white text-sm font-medium truncate">
                            {conversation.title}
                          </p>
                          <p className="text-gray-400 text-xs truncate">
                            {conversation.messages.length} messages
                          </p>
                        </div>

                        {/* Delete button */}
                        <div className="relative">
                          <Button
                            variant="ghost"
                            size="sm"
                            className="opacity-0 group-hover:opacity-100 transition-opacity p-1 h-6 w-6 text-gray-400 hover:text-red-400 hover:bg-red-500/20"
                            onClick={(e) => {
                              e.stopPropagation();
                              setShowDeleteMenu(
                                showDeleteMenu === conversation.id
                                  ? null
                                  : conversation.id
                              );
                            }}
                          >
                            <MoreVertical className="w-3 h-3" />
                          </Button>

                          {/* Delete confirmation menu */}
                          {showDeleteMenu === conversation.id && (
                            <motion.div
                              className="absolute right-0 top-8 bg-white/20 backdrop-blur-lg border border-white/30 rounded-lg p-2 z-10 min-w-32"
                              initial={{ opacity: 0, scale: 0.95 }}
                              animate={{ opacity: 1, scale: 1 }}
                              onClick={(e) => e.stopPropagation()}
                            >
                              <Button
                                variant="ghost"
                                size="sm"
                                className="w-full text-red-400 hover:text-red-300 hover:bg-red-500/20 justify-start"
                                onClick={(e) =>
                                  handleDeleteConversation(conversation.id, e)
                                }
                              >
                                <Trash2 className="w-3 h-3 mr-2" />
                                Delete
                              </Button>
                            </motion.div>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* User info */}
              <div className="p-4 border-t border-white/20">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                      <User className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <p className="text-white text-sm font-medium">
                        {user?.username}
                      </p>
                      <p className="text-gray-400 text-xs">
                        Level {user?.java_level}
                      </p>
                    </div>
                  </div>
                  <Button
                    onClick={handleLogout}
                    variant="ghost"
                    size="sm"
                    className="text-gray-400 hover:text-white"
                  >
                    <LogOut className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main chat area */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="bg-white/10 backdrop-blur-lg border-b border-white/20 p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                variant="ghost"
                size="sm"
                className="text-white hover:bg-white/10 lg:hidden"
              >
                <Sidebar className="w-5 h-5" />
              </Button>

              <div
                className="flex items-center space-x-3 cursor-pointer"
                onClick={() => navigate("/")}
              >
                <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center">
                  <Bot className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-white font-semibold">JavaMentor</h1>
                  <p className="text-gray-400 text-sm">
                    {isTyping ? "Typing..." : "AI Assistant for Java"}
                  </p>
                </div>
              </div>
            </div>

            {/* User menu and actions */}
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-3 bg-white/10 rounded-lg px-3 py-2">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                  <User className="w-4 h-4 text-white" />
                </div>
                <div className="hidden sm:block">
                  <p className="text-white text-sm font-medium">
                    {user?.username}
                  </p>
                  <p className="text-gray-400 text-xs">
                    Level {user?.java_level}
                  </p>
                </div>

                <div className="flex items-center space-x-2 ml-3 pl-3 border-l border-white/20">
                  <Button
                    onClick={() => navigate("/profile")}
                    variant="ghost"
                    size="sm"
                    className="text-white hover:bg-white/10"
                    title="Profile"
                  >
                    <User className="w-4 h-4" />
                  </Button>

                  <Button
                    onClick={handleLogout}
                    variant="ghost"
                    size="sm"
                    className="text-red-400 hover:text-red-300"
                    title="Log out"
                  >
                    <LogOut className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              <Button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                variant="ghost"
                size="sm"
                className="text-white hover:bg-white/10 hidden lg:flex"
              >
                <Sidebar className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          <AnimatePresence>
            {messages.map((message, index) => (
              <MessageBubble key={message.id} message={message} index={index} />
            ))}
          </AnimatePresence>

          {/* Typing indicator */}
          {isTyping && (
            <motion.div
              className="flex justify-start"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <div className="max-w-lg mr-auto">
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 rounded-full flex items-center justify-center bg-gradient-to-r from-green-500 to-blue-500">
                    <Bot className="w-4 h-4 text-white" />
                  </div>
                  <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-4">
                    <div className="flex items-center space-x-2">
                      <Loader2 className="w-4 h-4 text-blue-400 animate-spin" />
                      <span className="text-gray-400">
                        JavaMentor is thinking...
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input area */}
        <div className="border-t border-white/20 bg-white/5 backdrop-blur-lg p-4">
          <div className="flex items-end space-x-4">
            <div className="flex-1 relative">
              <textarea
                ref={textareaRef}
                value={currentMessage}
                onChange={(e) => setCurrentMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask your question about Java..."
                className="w-full resize-none rounded-xl bg-white/10 backdrop-blur-lg border border-white/20 px-4 py-3 pr-12 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent max-h-32"
                rows={1}
                disabled={isTyping}
              />
              <Button
                onClick={handleSendMessage}
                disabled={!currentMessage.trim() || isTyping}
                variant="java"
                size="sm"
                className="absolute right-2 bottom-2 w-8 h-8 p-0"
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </div>

          <p className="text-xs text-gray-400 mt-2 text-center">
            Press Enter to send, Shift+Enter for new line
          </p>
        </div>
      </div>
    </div>
  );
};

export default Chat;
