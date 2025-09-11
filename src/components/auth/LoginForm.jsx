import React, { useState } from "react";
import { motion } from "framer-motion";
import { useAuth } from "../../context/AuthContext";
import Button from "../ui/Button";
import Input from "../ui/Input";
import { User, Lock, Sparkles } from "lucide-react";

const LoginForm = ({ onSuccess }) => {
  const { login } = useAuth();

  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

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
      newErrors.username = "Username is required";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters long";
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

    const result = await login(formData);

    if (result.success) {
      onSuccess?.();
    } else {
      setErrors({ general: result.error });
    }

    setIsSubmitting(false);
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
          label="Username"
          name="username"
          type="text"
          placeholder="Enter your username"
          value={formData.username}
          onChange={handleChange}
          error={errors.username}
          icon={User}
        />

        <Input
          label="Password"
          name="password"
          type="password"
          placeholder="Enter your password"
          value={formData.password}
          onChange={handleChange}
          error={errors.password}
          icon={Lock}
        />

        <Button
          type="submit"
          variant="java"
          size="lg"
          loading={isSubmitting}
          disabled={isSubmitting}
          className="w-full group"
        >
          {isSubmitting ? "Signing in..." : "Sign in"}
          {!isSubmitting && (
            <Sparkles className="w-5 h-5 ml-2 group-hover:rotate-12 transition-transform" />
          )}
        </Button>
      </form>
    </motion.div>
  );
};

export default LoginForm;
