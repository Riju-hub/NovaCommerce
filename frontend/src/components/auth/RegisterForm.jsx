
import React, { useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { User, Mail, Lock, UserCheck, Store, AlertCircle, Loader2 } from 'lucide-react';
import InputField from '../common/InputField';
import Button from '../common/Button';
import useAuth from '../../hooks/useAuth';
import authService from '../../services/authService';

const RegisterForm = ({ onSuccess }) => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const defaultRole = searchParams.get('role') === 'vendor' ? 'vendor' : 'customer';

  const { register, loading, error, clearAuthError } = useAuth();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: defaultRole,
  });

  const [validationErrors, setValidationErrors] = useState({});
  const [isCheckingEmail, setIsCheckingEmail] = useState(false);

  const handleChange = (e) => {
    if (error) clearAuthError();
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    if (validationErrors[e.target.name]) {
      setValidationErrors((prev) => ({ ...prev, [e.target.name]: '' }));
    }
  };

  const handleEmailBlur = async () => {
    if (!formData.email.trim()) return;

    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      setValidationErrors((prev) => ({
        ...prev,
        email: 'Please enter a valid email address',
      }));
      return;
    }

    try {
      setIsCheckingEmail(true);
      const response = await authService.checkEmail(formData.email);

      if (response.exists) {
        setValidationErrors((prev) => ({
          ...prev,
          email: 'Email is already registered',
        }));
      } else {
        setValidationErrors((prev) => ({ ...prev, email: '' }));
      }
    } catch (err) {
      setValidationErrors((prev) => ({
        ...prev,
        email: err.response?.data?.message || 'Invalid or non-existent email address',
      }));
    } finally {
      setIsCheckingEmail(false);
    }
  };

  const validate = () => {
    const errors = {};
    if (!formData.name.trim()) errors.name = 'Full name is required';

    if (!formData.email.trim()) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'Please enter a valid email address';
    }

    if (!formData.password) {
      errors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      errors.password = 'Password must be at least 6 characters';
    }

    if (formData.password !== formData.confirmPassword) {
      errors.confirmPassword = 'Passwords do not match';
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate() || isCheckingEmail) return;

    const { confirmPassword, ...payload } = formData;
    const result = await register(payload);

    if (result.type?.endsWith('/fulfilled')) {
      if (onSuccess) {
        onSuccess(formData.email); // Pass registered email up to RegisterPage
      } else if (formData.role === 'vendor') {
        navigate('/vendor/dashboard');
      } else {
        navigate('/');
      }
    }
  };

  const darkInputClasses =
    '[&_label]:text-slate-300 [&_input]:!bg-slate-950 [&_input]:!text-slate-100 [&_input]:!placeholder-slate-500 [&_input]:!border-slate-800 focus-within:[&_input]:!border-indigo-500 focus-within:[&_input]:!ring-indigo-500/20';

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

      <div className="grid grid-cols-2 gap-2 p-1.5 bg-slate-950 border border-slate-800 rounded-xl mb-3">
        <button
          type="button"
          onClick={() => setFormData((p) => ({ ...p, role: 'customer' }))}
          className={`flex items-center justify-center gap-2 py-2 px-3 rounded-lg text-xs font-bold transition-all cursor-pointer ${
            formData.role === 'customer'
              ? 'bg-gradient-to-r from-indigo-600 to-violet-600 text-white shadow-md'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <User className="w-4 h-4" /> Customer
        </button>
        <button
          type="button"
          onClick={() => setFormData((p) => ({ ...p, role: 'vendor' }))}
          className={`flex items-center justify-center gap-2 py-2 px-3 rounded-lg text-xs font-bold transition-all cursor-pointer ${
            formData.role === 'vendor'
              ? 'bg-gradient-to-r from-indigo-600 to-violet-600 text-white shadow-md'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Store className="w-4 h-4" /> Vendor / Seller
        </button>
      </div>

      <InputField
        label="Full Name"
        name="name"
        placeholder="John Doe"
        value={formData.name}
        onChange={handleChange}
        error={validationErrors.name}
        icon={User}
        required
        className={darkInputClasses}
      />

      <div className="relative">
        <InputField
          label="Email Address"
          name="email"
          type="email"
          placeholder="john@example.com"
          value={formData.email}
          onChange={handleChange}
          onBlur={handleEmailBlur}
          error={validationErrors.email}
          icon={Mail}
          required
          className={darkInputClasses}
        />
        {isCheckingEmail && (
          <div className="absolute right-3 top-[38px] flex items-center text-xs text-indigo-400 gap-1.5 pointer-events-none">
            <Loader2 className="w-3.5 h-3.5 animate-spin" />
            <span>Verifying...</span>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
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

        <InputField
          label="Confirm Password"
          name="confirmPassword"
          type="password"
          placeholder="••••••••"
          value={formData.confirmPassword}
          onChange={handleChange}
          error={validationErrors.confirmPassword}
          icon={Lock}
          required
          className={darkInputClasses}
        />
      </div>

      <Button
        type="submit"
        variant="primary"
        isLoading={loading || isCheckingEmail}
        className="w-full py-3 mt-2 shadow-lg shadow-indigo-600/30 font-bold text-white cursor-pointer"
        icon={UserCheck}
      >
        {formData.role === 'vendor' ? 'Register as Seller' : 'Create Account'}
      </Button>

      <p className="text-center text-xs text-slate-400 pt-2">
        Already have an account?{' '}
        <Link to="/login" className="font-bold text-indigo-400 hover:underline">
          Sign In
        </Link>
      </p>
    </motion.form>
  );
};

export default RegisterForm;