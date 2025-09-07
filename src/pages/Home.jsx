import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Button from "../components/ui/Button";
import { useLanguage } from "../context/LanguageContext";
import { useTranslation } from "../utils/translations";
import LanguageSelector from "../components/ui/LanguageSelector";
import {
  Code,
  Zap,
  BookOpen,
  Users,
  Trophy,
  ArrowRight,
  Sparkles,
  Brain,
  Target,
} from "lucide-react";

const Home = () => {
  const navigate = useNavigate();
  const { isAuthenticated, user } = useAuth();
  const { language } = useLanguage();
  const { t } = useTranslation(language);

  const features = [
    {
      icon: Brain,
      title: "Personalized AI",
      description:
        "A Java assistant that adapts to your level and learning style",
      color: "from-purple-500 to-pink-500",
    },
    {
      icon: Code,
      title: "Interactive Exercises",
      description:
        "Practice with real-time coding challenges and instant feedback",
      color: "from-blue-500 to-cyan-500",
    },
    {
      icon: Target,
      title: "Guided Progress",
      description:
        "Track your growth from beginner to expert with clear milestones",
      color: "from-green-500 to-emerald-500",
    },
    {
      icon: Zap,
      title: "Fast Learning",
      description: "Master Java 3x faster with our optimized teaching method",
      color: "from-yellow-500 to-orange-500",
    },
  ];

  const stats = [
    { number: "10K+", label: "Students Trained", icon: Users },
    { number: "500+", label: "Exercises Available", icon: BookOpen },
    { number: "95%", label: "Success Rate", icon: Trophy },
    { number: "4.9/5", label: "Average Rating", icon: Sparkles },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute top-3/4 right-1/4 w-96 h-96 bg-cyan-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-1000"></div>
        <div className="absolute bottom-1/4 left-1/3 w-96 h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-2000"></div>
      </div>

      {/* Navigation */}
      <nav className="relative z-10 px-6 py-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <motion.div
            className="flex items-center space-x-2"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="w-10 h-10 bg-gradient-to-r from-orange-500 to-red-500 rounded-lg flex items-center justify-center">
              <Code className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold text-white">JavaMentor</span>
          </motion.div>

          <motion.div
            className="flex items-center space-x-4"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {isAuthenticated ? (
              <>
                <span className="text-white">Hello, {user?.username}!</span>
                <Button onClick={() => navigate("/chat")} variant="java">
                  Continue Learning
                </Button>
              </>
            ) : (
              <>
                <Button
                  variant="ghost"
                  onClick={() => navigate("/Login")}
                  className="text-white hover:bg-white/10"
                >
                  Login
                </Button>
                <Button variant="java" onClick={() => navigate("/Register")}>
                  Get Started Free
                </Button>
              </>
            )}
            <LanguageSelector />
          </motion.div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 py-20">
        <div className="text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-6xl md:text-7xl font-bold text-white mb-6 leading-tight">
              Master{" "}
              <span className="bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text text-transparent">
                Java
              </span>
              <br />
              with your{" "}
              <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                personal AI
              </span>
            </h1>

            <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
              Learn Java interactively with an AI assistant that adapts to your
              pace. From beginner to expert, progress faster than ever.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6 mb-12">
              <Button
                size="xl"
                variant="java"
                onClick={() =>
                  navigate(isAuthenticated ? "/chat" : "/register")
                }
                className="group"
              >
                {isAuthenticated ? "Continue Learning" : "Start Now"}
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>

              <Button
                size="xl"
                variant="outline"
                onClick={() => navigate("/exercises")}
                className="border-white text-white hover:bg-white hover:text-gray-900"
              >
                See Exercises
              </Button>
            </div>
          </motion.div>

          {/* Stats */}
          <motion.div
            className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-20"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            {stats.map((stat, index) => {
              const StatIcon = stat.icon;
              return (
                <motion.div
                  key={index}
                  className="text-center"
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg mb-3">
                    <StatIcon className="w-6 h-6 text-white" />
                  </div>
                  <div className="text-3xl font-bold text-white mb-1">
                    {stat.number}
                  </div>
                  <div className="text-gray-400">{stat.label}</div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>

        {/* Features */}
        <motion.div
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          {features.map((feature, index) => {
            const FeatureIcon = feature.icon;
            return (
              <motion.div
                key={index}
                className="relative group"
                whileHover={{ y: -8 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div
                  className="absolute inset-0 bg-gradient-to-r opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl blur-xl"
                  style={{
                    background: `linear-gradient(to right, ${
                      feature.color.split(" ")[1]
                    }, ${feature.color.split(" ")[3]})`,
                  }}
                ></div>

                <div className="relative bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-6 h-full">
                  <div
                    className={`inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r ${feature.color} rounded-lg mb-4`}
                  >
                    <FeatureIcon className="w-6 h-6 text-white" />
                  </div>

                  <h3 className="text-xl font-semibold text-white mb-3">
                    {feature.title}
                  </h3>

                  <p className="text-gray-400 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* CTA Section */}
        <motion.div
          className="text-center mt-20"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <div className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 backdrop-blur-lg border border-white/20 rounded-3xl p-12 max-w-4xl mx-auto">
            <h2 className="text-4xl font-bold text-white mb-6">
              Ready to become a Java expert?
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              Join thousands of developers who transformed their careers with
              JavaMentor
            </p>
            <Button
              size="xl"
              variant="java"
              onClick={() => navigate(isAuthenticated ? "/chat" : "/register")}
              className="group"
            >
              {isAuthenticated ? "Go to Chat" : "Start Free"}
              <Sparkles className="w-5 h-5 ml-2 group-hover:rotate-12 transition-transform" />
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Home;
