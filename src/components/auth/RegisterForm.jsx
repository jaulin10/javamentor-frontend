import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useAuth } from "../../context/AuthContext";
import Button from "../ui/Button";
import Input from "../ui/Input";
import { User, Lock, Mail, Sparkles, CheckCircle } from "lucide-react";

const RegisterForm = ({ onSuccess }) => {
  const { register } = useAuth();

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);

  // Calculer la force du mot de passe
  useEffect(() => {
    const password = formData.password;
    let strength = 0;

    if (password.length >= 6) strength += 1;
    if (password.length >= 8) strength += 1;
    if (/[A-Z]/.test(password)) strength += 1;
    if (/[a-z]/.test(password)) strength += 1;
    if (/[0-9]/.test(password)) strength += 1;
    if (/[^A-Za-z0-9]/.test(password)) strength += 1;

    setPasswordStrength(Math.min(strength, 4));
  }, [formData.password]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.username.trim()) {
      newErrors.username = "Le nom d'utilisateur est requis";
    } else if (formData.username.length < 3) {
      newErrors.username =
        "Le nom d'utilisateur doit contenir au moins 3 caractères";
    }

    if (!formData.email.trim()) {
      newErrors.email = "L'email est requis";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "L'email n'est pas valide";
    }

    if (!formData.password) {
      newErrors.password = "Le mot de passe est requis";
    } else if (formData.password.length < 6) {
      newErrors.password =
        "Le mot de passe doit contenir au moins 6 caractères";
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Veuillez confirmer votre mot de passe";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Les mots de passe ne correspondent pas";
    }

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }

    setIsSubmitting(true);
    setErrors({});

    const result = await register({
      username: formData.username,
      email: formData.email,
      password: formData.password,
    });

    if (result.success) {
      onSuccess?.();
    } else {
      setErrors({ general: result.error });
    }

    setIsSubmitting(false);
  };

  const getPasswordStrengthColor = () => {
    switch (passwordStrength) {
      case 0:
      case 1:
        return "bg-red-500";
      case 2:
        return "bg-yellow-500";
      case 3:
        return "bg-blue-500";
      case 4:
        return "bg-green-500";
      default:
        return "bg-gray-500";
    }
  };

  const getPasswordStrengthText = () => {
    switch (passwordStrength) {
      case 0:
      case 1:
        return "Faible";
      case 2:
        return "Moyen";
      case 3:
        return "Fort";
      case 4:
        return "Très fort";
      default:
        return "";
    }
  };

  return (
    <motion.div
      className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-8 shadow-2xl"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.4 }}
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        {errors.general && (
          <motion.div
            className="bg-red-500/20 border border-red-500/50 rounded-lg p-4"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            <p className="text-red-400 text-sm">{errors.general}</p>
          </motion.div>
        )}

        <Input
          label="Nom d'utilisateur"
          name="username"
          type="text"
          placeholder="Choisissez un nom d'utilisateur"
          value={formData.username}
          onChange={handleChange}
          error={errors.username}
          icon={User}
        />

        <Input
          label="Adresse email"
          name="email"
          type="email"
          placeholder="votre@email.com"
          value={formData.email}
          onChange={handleChange}
          error={errors.email}
          icon={Mail}
        />

        <div>
          <Input
            label="Mot de passe"
            name="password"
            type="password"
            placeholder="Créez un mot de passe sécurisé"
            value={formData.password}
            onChange={handleChange}
            error={errors.password}
            icon={Lock}
          />

          {/* Password strength indicator */}
          {formData.password && (
            <motion.div
              className="mt-2"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex items-center space-x-2">
                <div className="flex-1 bg-gray-700 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full transition-all duration-300 ${getPasswordStrengthColor()}`}
                    style={{ width: `${(passwordStrength / 4) * 100}%` }}
                  ></div>
                </div>
                <span className="text-xs text-gray-400">
                  {getPasswordStrengthText()}
                </span>
              </div>
            </motion.div>
          )}
        </div>

        <Input
          label="Confirmer le mot de passe"
          name="confirmPassword"
          type="password"
          placeholder="Confirmez votre mot de passe"
          value={formData.confirmPassword}
          onChange={handleChange}
          error={errors.confirmPassword}
          icon={
            formData.password &&
            formData.confirmPassword &&
            formData.password === formData.confirmPassword
              ? CheckCircle
              : Lock
          }
        />

        <Button
          type="submit"
          variant="java"
          size="lg"
          loading={isSubmitting}
          disabled={isSubmitting}
          className="w-full group"
        >
          {isSubmitting ? "Création du compte..." : "Créer mon compte"}
          {!isSubmitting && (
            <Sparkles className="w-5 h-5 ml-2 group-hover:rotate-12 transition-transform" />
          )}
        </Button>
      </form>
    </motion.div>
  );
};

export default RegisterForm;
