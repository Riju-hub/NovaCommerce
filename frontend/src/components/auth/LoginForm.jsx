// src/components/auth/LoginForm.jsx
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, LogIn } from 'lucide-react';
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

      // Read user details from fulfilled action payload or response
      const user = result.payload?.data || result.payload?.user || result.payload;
      const userRole = user?.role?.toLowerCase();

      // Route based on role
      if (userRole === 'vendor') {
        navigate('/vendor/dashboard');
      } else if (userRole === 'admin') {
        navigate('/admin/dashboard');
      } else {
        navigate('/');
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 w-full">
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 text-xs px-4 py-3 rounded-lg">
          {error}
        </div>
      )}

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
      />

      <div className="space-y-1">
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
        />
        <div className="flex justify-end">
          <Link
            to="/forgot-password"
            className="text-xs font-medium text-blue-600 hover:text-blue-700"
          >
            Forgot Password?
          </Link>
        </div>
      </div>

      <Button
        type="submit"
        variant="primary"
        isLoading={loading}
        className="w-full mt-2"
        icon={LogIn}
      >
        Sign In
      </Button>

      <p className="text-center text-xs text-slate-500 mt-4">
        Don't have an account?{' '}
        <Link to="/register" className="font-semibold text-blue-600 hover:underline">
          Create Account
        </Link>
      </p>
    </form>
  );
};

export default LoginForm;