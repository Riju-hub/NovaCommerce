
// components/auth/OTPVerificationForm.jsx
import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldCheck, AlertCircle, ArrowRight, RefreshCw, CheckCircle2 } from 'lucide-react';
import Button from '../common/Button';
import useAuth from '../../hooks/useAuth';
import authService from '../../services/authService';

const OTPVerificationForm = ({ email, onSuccess }) => {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [validationError, setValidationError] = useState('');
  const [resendSuccess, setResendSuccess] = useState('');
  const [isResending, setIsResending] = useState(false);
  const [timer, setTimer] = useState(60);

  const inputRefs = useRef([]);
  const { verifyOtp, loading, error, clearAuthError } = useAuth();

  useEffect(() => {
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  }, []);

  useEffect(() => {
    let interval = null;
    if (timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [timer]);

  const handleChange = (index, value) => {
    if (error) clearAuthError();
    setValidationError('');
    setResendSuccess('');

    if (value && !/^[0-9]$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').trim();
    if (!/^\d{6}$/.test(pastedData)) return;

    const digits = pastedData.split('');
    setOtp(digits);
    inputRefs.current[5]?.focus();
  };

  const handleResend = async () => {
    if (timer > 0 || isResending) return;

    try {
      setIsResending(true);
      setValidationError('');
      setResendSuccess('');

      const response = await authService.resendOtp(email);

      setResendSuccess(response.message || 'New OTP sent to your email!');
      setTimer(60);
      setOtp(['', '', '', '', '', '']);
      inputRefs.current[0]?.focus();
    } catch (err) {
      setValidationError(err.response?.data?.message || 'Failed to resend OTP. Try again.');
    } finally {
      setIsResending(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const otpCode = otp.join('');

    if (otpCode.length < 6) {
      setValidationError('Please enter all 6 digits');
      return;
    }

    try {
      // Dispatch verifyOtp action through the hook
      const resultAction = await verifyOtp({ email, otp: otpCode });

      // Check if Redux action was fulfilled
      if (
        resultAction.type?.endsWith('/fulfilled') ||
        resultAction.meta?.requestStatus === 'fulfilled'
      ) {
        if (onSuccess) {
          onSuccess(resultAction.payload);
        }
      } else {
        // Display exact backend error message returned in action.payload
        setValidationError(
          resultAction.payload || 'Invalid verification code. Please try again.'
        );
      }
    } catch (err) {
      setValidationError(err?.message || 'Verification failed. Please check your code.');
    }
  };

  return (
    <motion.form
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      onSubmit={handleSubmit}
      className="space-y-6 w-full max-w-md mx-auto text-slate-100"
    >
      <div className="text-center space-y-2">
        <div className="inline-flex items-center justify-center p-3 bg-indigo-500/10 rounded-2xl border border-indigo-500/20 mb-2">
          <ShieldCheck className="w-8 h-8 text-indigo-400" />
        </div>
        <h2 className="text-xl font-black text-white">Enter Verification Code</h2>
        <p className="text-xs text-slate-400">
          We sent a 6-digit code to <span className="font-semibold text-indigo-400">{email}</span>
        </p>
      </div>

      <AnimatePresence>
        {(error || validationError) && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="bg-rose-950/90 border border-rose-800/80 text-rose-300 text-xs px-4 py-3 rounded-xl flex items-center gap-2"
          >
            <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
            <span>{error || validationError}</span>
          </motion.div>
        )}

        {resendSuccess && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="bg-emerald-950/90 border border-emerald-800/80 text-emerald-300 text-xs px-4 py-3 rounded-xl flex items-center gap-2"
          >
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>{resendSuccess}</span>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex justify-between gap-2 sm:gap-3" onPaste={handlePaste}>
        {otp.map((digit, index) => (
          <input
            key={index}
            ref={(el) => (inputRefs.current[index] = el)}
            type="text"
            inputMode="numeric"
            maxLength={1}
            value={digit}
            onChange={(e) => handleChange(index, e.target.value)}
            onKeyDown={(e) => handleKeyDown(index, e)}
            className="w-11 h-12 sm:w-12 sm:h-14 text-center text-xl font-bold bg-slate-950 border border-slate-800 rounded-xl text-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 outline-none transition-all"
          />
        ))}
      </div>

      <Button
        type="submit"
        variant="primary"
        isLoading={loading}
        className="w-full py-3 shadow-lg shadow-indigo-600/30 font-bold text-white cursor-pointer"
        icon={ArrowRight}
      >
        Verify Account
      </Button>

      <div className="text-center">
        <button
          type="button"
          onClick={handleResend}
          disabled={timer > 0 || isResending}
          className={`text-xs flex items-center justify-center gap-1.5 mx-auto transition-colors ${
            timer > 0 || isResending
              ? 'text-slate-600 cursor-not-allowed'
              : 'text-slate-400 hover:text-indigo-400 cursor-pointer'
          }`}
        >
          <RefreshCw className={`w-3.5 h-3.5 ${isResending ? 'animate-spin' : ''}`} />
          {timer > 0 ? `Resend code in ${timer}s` : "Didn't receive code? Resend"}
        </button>
      </div>
    </motion.form>
  );
};

export default OTPVerificationForm;