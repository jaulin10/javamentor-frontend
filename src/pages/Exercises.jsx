import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import Button from "../components/ui/Button";
import {
  ArrowLeft,
  Code,
  Trophy,
  Clock,
  Star,
  Play,
  CheckCircle,
  Filter,
  Search,
} from "lucide-react";

const Exercises = () => {
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [selectedDifficulty, setSelectedDifficulty] = useState("all");
  const [selectedTopic, setSelectedTopic] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  // Mock exercise data
  const exercises = [
    {
      id: 1,
      title: "Basic Variables",
      description: "Learn to declare and use variables in Java",
      difficulty: "beginner",
      topic: "variables",
      estimatedTime: "15 min",
      points: 10,
      completed: true,
      rating: 4.8,
    },
    {
      id: 2,
      title: "For Loops",
      description: "Master for loops in Java",
      difficulty: "beginner",
      topic: "loops",
      estimatedTime: "20 min",
      points: 15,
      completed: true,
      rating: 4.6,
    },
    {
      id: 3,
      title: "If/Else Conditions",
      description: "Use conditional statements",
      difficulty: "beginner",
      topic: "conditions",
      estimatedTime: "18 min",
      points: 12,
      completed: false,
      rating: 4.7,
    },
    {
      id: 4,
      title: "First Class",
      description: "Create your first Java class",
      difficulty: "intermediate",
      topic: "oop",
      estimatedTime: "30 min",
      points: 25,
      completed: false,
      rating: 4.9,
    },
    {
      id: 5,
      title: "Arrays and Collections",
      description: "Manipulate arrays and collections",
      difficulty: "intermediate",
      topic: "collections",
      estimatedTime: "35 min",
      points: 30,
      completed: false,
      rating: 4.5,
    },
    {
      id: 6,
      title: "Exception Handling",
      description: "Learn try/catch and error handling",
      difficulty: "intermediate",
      topic: "exceptions",
      estimatedTime: "25 min",
      points: 20,
      completed: false,
      rating: 4.4,
    },
    {
      id: 7,
      title: "Streams and Lambda",
      description: "Functional programming with Java 8+",
      difficulty: "advanced",
      topic: "streams",
      estimatedTime: "45 min",
      points: 40,
      completed: false,
      rating: 4.8,
    },
    {
      id: 8,
      title: "Design Patterns",
      description: "Implement Singleton and Factory patterns",
      difficulty: "advanced",
      topic: "patterns",
      estimatedTime: "60 min",
      points: 50,
      completed: false,
      rating: 4.9,
    },
  ];

  // Redirect if not authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated, navigate]);

  // Filter exercises
  const filteredExercises = exercises.filter((exercise) => {
    const matchesDifficulty =
      selectedDifficulty === "all" ||
      exercise.difficulty === selectedDifficulty;
    const matchesTopic =
      selectedTopic === "all" || exercise.topic === selectedTopic;
    const matchesSearch =
      exercise.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      exercise.description.toLowerCase().includes(searchTerm.toLowerCase());

    return matchesDifficulty && matchesTopic && matchesSearch;
  });

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case "beginner":
        return "text-green-400 bg-green-500/20";
      case "intermediate":
        return "text-yellow-400 bg-yellow-500/20";
      case "advanced":
        return "text-red-400 bg-red-500/20";
      default:
        return "text-gray-400 bg-gray-500/20";
    }
  };

  const getDifficultyLabel = (difficulty) => {
    switch (difficulty) {
      case "beginner":
        return "Beginner";
      case "intermediate":
        return "Intermediate";
      case "advanced":
        return "Advanced";
      default:
        return difficulty;
    }
  };

  const totalCompleted = exercises.filter((ex) => ex.completed).length;
  const totalPoints = exercises
    .filter((ex) => ex.completed)
    .reduce((sum, ex) => sum + ex.points, 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Header */}
      <div className="bg-white/10 backdrop-blur-lg border-b border-white/20 p-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button
              onClick={() => navigate("/chat")}
              variant="ghost"
              className="text-white hover:bg-white/10"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back to chat
            </Button>

            <Button
              onClick={() => navigate("/")}
              variant="ghost"
              className="text-white hover:bg-white/10"
            >
              Home
            </Button>

            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-orange-500 to-red-500 rounded-lg flex items-center justify-center">
                <Code className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-white">Java Exercises</h1>
                <p className="text-gray-400 text-sm">Practice and progress</p>
              </div>
            </div>
          </div>

          {/* User stats */}
          <div className="hidden md:flex items-center space-x-6">
            <div className="text-center">
              <p className="text-2xl font-bold text-white">{totalCompleted}</p>
              <p className="text-xs text-gray-400">Completed</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-yellow-400">
                {totalPoints}
              </p>
              <p className="text-xs text-gray-400">Points</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-blue-400">
                {user?.java_level}
              </p>
              <p className="text-xs text-gray-400">Level</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="max-w-6xl mx-auto p-6">
        {/* Filters and search */}
        <motion.div
          className="mb-8 bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search bar */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search for an exercise..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Difficulty filter */}
            <select
              value={selectedDifficulty}
              onChange={(e) => setSelectedDifficulty(e.target.value)}
              className="px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All difficulties</option>
              <option value="beginner">Beginner</option>
              <option value="intermediate">Intermediate</option>
              <option value="advanced">Advanced</option>
            </select>

            {/* Topic filter */}
            <select
              value={selectedTopic}
              onChange={(e) => setSelectedTopic(e.target.value)}
              className="px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All topics</option>
              <option value="variables">Variables</option>
              <option value="loops">Loops</option>
              <option value="conditions">Conditions</option>
              <option value="oop">OOP</option>
              <option value="collections">Collections</option>
              <option value="exceptions">Exceptions</option>
              <option value="streams">Streams</option>
              <option value="patterns">Design Patterns</option>
            </select>
          </div>
        </motion.div>

        {/* Exercise grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredExercises.map((exercise, index) => (
            <motion.div
              key={exercise.id}
              className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-6 hover:bg-white/15 transition-all duration-300 cursor-pointer group"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              onClick={() =>
                navigate("/chat", { state: { exerciseId: exercise.id } })
              }
            >
              {/* Card header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-2">
                  <div
                    className={`px-2 py-1 rounded text-xs font-medium ${getDifficultyColor(
                      exercise.difficulty
                    )}`}
                  >
                    {getDifficultyLabel(exercise.difficulty)}
                  </div>
                  {exercise.completed && (
                    <CheckCircle className="w-5 h-5 text-green-400" />
                  )}
                </div>

                <div className="flex items-center space-x-1">
                  <Star className="w-4 h-4 text-yellow-400 fill-current" />
                  <span className="text-yellow-400 text-sm">
                    {exercise.rating}
                  </span>
                </div>
              </div>

              {/* Content */}
              <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-blue-300 transition-colors">
                {exercise.title}
              </h3>

              <p className="text-gray-400 text-sm mb-4 line-clamp-2">
                {exercise.description}
              </p>

              {/* Card footer */}
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-1 text-gray-400">
                    <Clock className="w-4 h-4" />
                    <span>{exercise.estimatedTime}</span>
                  </div>

                  <div className="flex items-center space-x-1 text-yellow-400">
                    <Trophy className="w-4 h-4" />
                    <span>{exercise.points} pts</span>
                  </div>
                </div>

                <Button
                  variant="java"
                  size="sm"
                  className="opacity-0 group-hover:opacity-100 transition-opacity"
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate("/chat", { state: { exerciseId: exercise.id } });
                  }}
                >
                  <Play className="w-4 h-4 mr-1" />
                  {exercise.completed ? "Retry" : "Start"}
                </Button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* No results message */}
        {filteredExercises.length === 0 && (
          <motion.div
            className="text-center py-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <Code className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl text-white mb-2">No exercises found</h3>
            <p className="text-gray-400">Try modifying your search filters</p>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Exercises;
