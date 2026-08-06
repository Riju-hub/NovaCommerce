
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, ArrowLeft, CheckCircle2, AlertCircle, KeyRound } from 'lucide-react';
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

  const darkInputClasses = "[&_label]:text-slate-300 [&_input]:!bg-slate-950 [&_input]:!text-slate-100 [&_input]:!placeholder-slate-500 [&_input]:!border-slate-800 focus-within:[&_input]:!border-indigo-500 focus-within:[&_input]:!ring-indigo-500/20";

  if (submitted) {
    return (
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center space-y-5 py-6 text-slate-100"
      >
        <div className="w-16 h-16 bg-emerald-950 border border-emerald-800 text-emerald-400 rounded-2xl flex items-center justify-center mx-auto shadow-lg shadow-emerald-500/10">
          <CheckCircle2 className="w-8 h-8" />
        </div>
        <div className="space-y-2">
          <h3 className="text-xl font-extrabold text-white tracking-tight">Check Your Inbox</h3>
          <p className="text-xs text-slate-400 max-w-xs mx-auto leading-relaxed">
            We sent password recovery instructions to{' '}
            <span className="font-bold text-white bg-slate-950 border border-slate-800 px-2 py-0.5 rounded-md">{email}</span>
          </p>
        </div>
        <div className="pt-2">
          <Link
            to="/login"
            className="inline-flex items-center text-xs font-bold text-indigo-400 hover:text-indigo-300 gap-1 transition-all"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Back to Sign In
          </Link>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.form 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      onSubmit={handleSubmit} 
      className="space-y-5 w-full max-w-md mx-auto text-slate-100"
    >
      <div className="text-center mb-2">
        <div className="w-12 h-12 bg-indigo-950 border border-indigo-800 text-indigo-400 rounded-2xl flex items-center justify-center mx-auto mb-3 shadow-inner">
          <KeyRound className="w-6 h-6" />
        </div>
        <h2 className="text-xl font-extrabold text-white">Reset Your Password</h2>
        <p className="text-xs text-slate-400 mt-1 leading-relaxed">
          Enter your registered email and we'll send you recovery instructions.
        </p>
      </div>

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
        value={email}
        onChange={(e) => {
          setEmail(e.target.value);
          if (error) setError('');
        }}
        icon={Mail}
        required
        className={darkInputClasses}
      />

      <Button
        type="submit"
        variant="primary"
        isLoading={loading}
        className="w-full py-3 shadow-lg shadow-indigo-600/30 text-white font-bold cursor-pointer"
      >
        Send Reset Link
      </Button>

      <div className="text-center pt-1">
        <Link
          to="/login"
          className="inline-flex items-center text-xs font-bold text-slate-400 hover:text-white transition-colors gap-1"
        >
          <ArrowLeft className="w-3.5 h-3.5" /> Back to Sign In
        </Link>
      </div>
    </motion.form>
  );
};

export default ForgotPassword;