// src/components/auth/ForgotPassword.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, ArrowLeft, CheckCircle } from 'lucide-react';
import InputField from '../common/InputField';
import Button from '../common/Button';
import axiosInstance from '../../services/axiosInstance';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email.trim() || !/\S+@\S+\.\S+/.test(email)) {
      setError('Please provide a valid email address');
      return;
    }

    setLoading(true);
    setError('');

    try {
      await axiosInstance.post('/auth/forgot-password', { email });
      setSubmitted(true);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to send reset link. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="text-center space-y-4 py-4">
        <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
          <CheckCircle className="w-6 h-6" />
        </div>
        <h3 className="text-lg font-bold text-slate-900">Check Your Email</h3>
        <p className="text-xs text-slate-600 max-w-sm mx-auto leading-relaxed">
          We sent password reset instructions to <span className="font-semibold text-slate-900">{email}</span>.
        </p>
        <div className="pt-4">
          <Link
            to="/login"
            className="inline-flex items-center text-xs font-semibold text-blue-600 hover:underline"
          >
            <ArrowLeft className="w-3.5 h-3.5 mr-1" /> Back to Sign In
          </Link>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 w-full">
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 text-xs px-4 py-3 rounded-lg">
          {error}
        </div>
      )}

      <p className="text-xs text-slate-600 leading-relaxed mb-2">
        Enter the email address associated with your account, and we'll send you a link to reset your password.
      </p>

      <InputField
        label="Email Address"
        name="email"
        type="email"
        placeholder="you@example.com"
        value={email}
        onChange={(e) => {
          setEmail(e.target.value);
          if (error) setError('');
        }}
        icon={Mail}
        required
      />

      <Button
        type="submit"
        variant="primary"
        isLoading={loading}
        className="w-full"
      >
        Send Reset Link
      </Button>

      <div className="text-center pt-2">
        <Link
          to="/login"
          className="inline-flex items-center text-xs font-semibold text-slate-600 hover:text-slate-900"
        >
          <ArrowLeft className="w-3.5 h-3.5 mr-1" /> Back to Sign In
        </Link>
      </div>
    </form>
  );
};

export default ForgotPassword;