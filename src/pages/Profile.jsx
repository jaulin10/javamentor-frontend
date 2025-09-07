import React from "react";
import { motion } from "framer-motion";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import Button from "../components/ui/Button";
import { User, ArrowLeft, Trophy, Calendar, Code } from "lucide-react";

const Profile = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Header */}
      <div className="bg-white/10 backdrop-blur-lg border-b border-white/20 p-4">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <Button
            onClick={() => navigate("/chat")}
            variant="ghost"
            className="text-white hover:bg-white/10"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Retour au chat
          </Button>

          <Button
            onClick={() => navigate("/")}
            variant="ghost"
            className="text-white hover:bg-white/10"
          >
            Accueil
          </Button>

          <Button
            onClick={() => {
              logout();
              navigate("/");
            }}
            variant="outline"
            className="text-red-400 border-red-400 hover:bg-red-400 hover:text-white"
          >
            Se déconnecter
          </Button>
        </div>
      </div>

      {/* Contenu principal */}
      <div className="max-w-4xl mx-auto p-6">
        <motion.div
          className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          {/* En-tête profil */}
          <div className="flex items-center space-x-6 mb-8">
            <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
              <User className="w-10 h-10 text-white" />
            </div>

            <div>
              <h1 className="text-3xl font-bold text-white">
                {user?.username}
              </h1>
              <p className="text-gray-400">{user?.email}</p>
              <div className="flex items-center space-x-2 mt-2">
                <Trophy className="w-4 h-4 text-yellow-500" />
                <span className="text-yellow-500 font-medium">
                  Niveau {user?.java_level}
                </span>
              </div>
            </div>
          </div>

          {/* Statistiques */}
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white/5 rounded-lg p-4 text-center">
              <Code className="w-8 h-8 text-blue-400 mx-auto mb-2" />
              <p className="text-2xl font-bold text-white">12</p>
              <p className="text-gray-400">Exercices complétés</p>
            </div>

            <div className="bg-white/5 rounded-lg p-4 text-center">
              <Calendar className="w-8 h-8 text-green-400 mx-auto mb-2" />
              <p className="text-2xl font-bold text-white">7</p>
              <p className="text-gray-400">Jours d'apprentissage</p>
            </div>

            <div className="bg-white/5 rounded-lg p-4 text-center">
              <Trophy className="w-8 h-8 text-yellow-400 mx-auto mb-2" />
              <p className="text-2xl font-bold text-white">3</p>
              <p className="text-gray-400">Badges obtenus</p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Profile;
