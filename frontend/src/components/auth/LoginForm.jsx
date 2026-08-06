
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Lock, LogIn, AlertCircle } from 'lucide-react';
import InputField from '../common/InputField';
import Button from '../common/Button';
import useAuth from '../../hooks/useAuth';

const LoginForm = ({ onSuccess }) => {
  const navigate = useNavigate();
  const { login, loading, error, clearAuthError } = useAuth();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [validationErrors, setValidationErrors] = useState({});

  const handleChange = (e) => {
    if (error) clearAuthError();
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    if (validationErrors[e.target.name]) {
      setValidationErrors((prev) => ({ ...prev, [e.target.name]: '' }));
    }
  };

  const validate = () => {
    const errors = {};
    if (!formData.email.trim()) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'Please enter a valid email address';
    }

    if (!formData.password) {
      errors.password = 'Password is required';
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    const result = await login(formData);
    
    if (result.type?.endsWith('/fulfilled')) {
      if (onSuccess) {
        onSuccess();
        return;
      }

      const user = result.payload?.data || result.payload?.user || result.payload;
      const userRole = user?.role?.toLowerCase();

      if (userRole === 'vendor') {
        navigate('/vendor/dashboard');
      } else if (userRole === 'admin') {
        navigate('/admin/dashboard');
      } else {
        navigate('/');
      }
    }
  };

  const darkInputClasses = "[&_label]:text-slate-300 [&_input]:!bg-slate-950 [&_input]:!text-slate-100 [&_input]:!placeholder-slate-500 [&_input]:!border-slate-800 focus-within:[&_input]:!border-indigo-500 focus-within:[&_input]:!ring-indigo-500/20";

  return (
    <motion.form 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      onSubmit={handleSubmit} 
      className="space-y-4 w-full max-w-md mx-auto text-slate-100"
    >
      <AnimatePresence>
        {error && (
          <motion.div 
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="bg-rose-950/90 border border-rose-800/80 text-rose-300 text-xs px-4 py-3 rounded-xl flex items-center gap-2"
          >
            <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
            <span>{error}</span>
          </motion.div>
        )}
      </AnimatePresence>

      <InputField
        label="Email Address"
        name="email"
        type="email"
        placeholder="you@example.com"
        value={formData.email}
        onChange={handleChange}
        error={validationErrors.email}
        icon={Mail}
        required
        className={darkInputClasses}
      />

      <div className="space-y-1.5">
        <InputField
          label="Password"
          name="password"
          type="password"
          placeholder="••••••••"
          value={formData.password}
          onChange={handleChange}
          error={validationErrors.password}
          icon={Lock}
          required
          className={darkInputClasses}
        />
        <div className="flex justify-end">
          <Link
            to="/forgot-password"
            className="text-xs font-semibold text-indigo-400 hover:text-indigo-300 hover:underline transition-colors"
          >
            Forgot Password?
          </Link>
        </div>
      </div>

      <Button
        type="submit"
        variant="primary"
        isLoading={loading}
        className="w-full py-3 mt-2 shadow-lg shadow-indigo-600/30 font-bold text-white cursor-pointer"
        icon={LogIn}
      >
        Sign In
      </Button>

      <p className="text-center text-xs text-slate-400 pt-2">
        Don't have an account?{' '}
        <Link to="/register" className="font-bold text-indigo-400 hover:underline">
          Create Account
        </Link>
      </p>
    </motion.form>
  );
};

export default LoginForm;