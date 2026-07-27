// src/components/auth/RegisterForm.jsx
import React, { useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { User, Mail, Lock, UserCheck, Store } from 'lucide-react';
import InputField from '../common/InputField';
import Button from '../common/Button';
import useAuth from '../../hooks/useAuth';

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

  const handleChange = (e) => {
    if (error) clearAuthError();
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    if (validationErrors[e.target.name]) {
      setValidationErrors((prev) => ({ ...prev, [e.target.name]: '' }));
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
    if (!validate()) return;

    const { confirmPassword, ...payload } = formData;
    const result = await register(payload);

    if (result.type?.endsWith('/fulfilled')) {
      if (onSuccess) onSuccess();
      else if (formData.role === 'vendor') navigate('/vendor/dashboard');
      else navigate('/');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 w-full">
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 text-xs px-4 py-3 rounded-lg">
          {error}
        </div>
      )}

      {/* Account Type Selector */}
      <div className="grid grid-cols-2 gap-3 mb-2">
        <button
          type="button"
          onClick={() => setFormData((p) => ({ ...p, role: 'customer' }))}
          className={`flex items-center justify-center gap-2 p-2.5 rounded-lg border text-xs font-semibold transition-all ${
            formData.role === 'customer'
              ? 'border-blue-600 bg-blue-50 text-blue-700'
              : 'border-slate-200 bg-white text-slate-600 hover:bg-slate-50'
          }`}
        >
          <User className="w-4 h-4" /> Customer
        </button>
        <button
          type="button"
          onClick={() => setFormData((p) => ({ ...p, role: 'vendor' }))}
          className={`flex items-center justify-center gap-2 p-2.5 rounded-lg border text-xs font-semibold transition-all ${
            formData.role === 'vendor'
              ? 'border-blue-600 bg-blue-50 text-blue-700'
              : 'border-slate-200 bg-white text-slate-600 hover:bg-slate-50'
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
      />

      <InputField
        label="Email Address"
        name="email"
        type="email"
        placeholder="john@example.com"
        value={formData.email}
        onChange={handleChange}
        error={validationErrors.email}
        icon={Mail}
        required
      />

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
      />

      <Button
        type="submit"
        variant="primary"
        isLoading={loading}
        className="w-full mt-2"
        icon={UserCheck}
      >
        {formData.role === 'vendor' ? 'Register as Seller' : 'Create Account'}
      </Button>

      <p className="text-center text-xs text-slate-500 mt-4">
        Already have an account?{' '}
        <Link to="/login" className="font-semibold text-blue-600 hover:underline">
          Sign In
        </Link>
      </p>
    </form>
  );
};

export default RegisterForm;