import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Lock, Eye, EyeOff, CheckCircle2, AlertCircle, KeyRound, ArrowLeft } from 'lucide-react';
import InputField from '../../components/common/InputField';
import Button from '../../components/common/Button';
import authService from '../../services/authService';

const ResetPasswordPage = () => {
  const { token } = useParams(); // Extracts resetToken from route: /reset-password/:token
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    password: '',
    confirmPassword: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (error) setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.password || formData.password.length < 6) {
      setError('Password must be at least 6 characters long.');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    if (!token) {
      setError('Invalid or missing reset token.');
      return;
    }

    setLoading(true);
    setError('');

    try {
      await authService.resetPassword(token, formData.password);
      setSuccess(true);
      setTimeout(() => {
        navigate('/login');
      }, 3000);
    } catch (err) {
      setError(
        err.response?.data?.message || 'Failed to reset password. The link may have expired.'
      );
    }
    finally {
      setLoading(false);
    }
  };

  const darkInputClasses =
    "[&_label]:text-slate-300 [&_input]:!bg-slate-950 [&_input]:!text-slate-100 [&_input]:!placeholder-slate-500 [&_input]:!border-slate-800 focus-within:[&_input]:!border-indigo-500 focus-within:[&_input]:!ring-indigo-500/20";

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-2xl p-8 shadow-2xl shadow-indigo-950/20">
        
        {success ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center space-y-5 py-4"
          >
            <div className="w-16 h-16 bg-emerald-950 border border-emerald-800 text-emerald-400 rounded-2xl flex items-center justify-center mx-auto shadow-lg shadow-emerald-500/10">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <div className="space-y-2">
              <h3 className="text-xl font-extrabold text-white tracking-tight">
                Password Reset Complete!
              </h3>
              <p className="text-xs text-slate-400 max-w-xs mx-auto leading-relaxed">
                Your password has been updated successfully. Redirecting you to the sign-in page...
              </p>
            </div>
            <div className="pt-2">
              <Link
                to="/login"
                className="inline-flex items-center text-xs font-bold text-indigo-400 hover:text-indigo-300 gap-1 transition-all"
              >
                Go to Sign In Now <ArrowLeft className="w-3.5 h-3.5 rotate-180" />
              </Link>
            </div>
          </motion.div>
        ) : (
          <motion.form
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            onSubmit={handleSubmit}
            className="space-y-5 w-full text-slate-100"
          >
            <div className="text-center mb-2">
              <div className="w-12 h-12 bg-indigo-950 border border-indigo-800 text-indigo-400 rounded-2xl flex items-center justify-center mx-auto mb-3 shadow-inner">
                <KeyRound className="w-6 h-6" />
              </div>
              <h2 className="text-xl font-extrabold text-white">Set New Password</h2>
              <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                Please enter a new password for your account.
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

            <div className="relative">
              <InputField
                label="New Password"
                name="password"
                type={showPassword ? 'text' : 'password'}
                placeholder="At least 6 characters"
                value={formData.password}
                onChange={handleChange}
                icon={Lock}
                required
                className={darkInputClasses}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-[38px] text-slate-400 hover:text-slate-200 transition-colors cursor-pointer"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>

            <InputField
              label="Confirm New Password"
              name="confirmPassword"
              type={showPassword ? 'text' : 'password'}
              placeholder="Re-enter your new password"
              value={formData.confirmPassword}
              onChange={handleChange}
              icon={Lock}
              required
              className={darkInputClasses}
            />

            <Button
              type="submit"
              variant="primary"
              isLoading={loading}
              className="w-full py-3 shadow-lg shadow-indigo-600/30 text-white font-bold cursor-pointer"
            >
              Update Password
            </Button>

            <div className="text-center pt-1">
              <Link
                to="/login"
                className="inline-flex items-center text-xs font-bold text-slate-400 hover:text-white transition-colors gap-1"
              >
                <ArrowLeft className="w-3.5 h-3.5" /> Cancel & Return to Login
              </Link>
            </div>
          </motion.form>
        )}
      </div>
    </div>
  );
};

export default ResetPasswordPage;