
// export default InputField;
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertCircle, CheckCircle2, Eye, EyeOff } from 'lucide-react';

const InputField = ({
  label,
  name,
  type = 'text',
  placeholder,
  value,
  onChange,
  error,
  helperText,
  required = false,
  icon: Icon,
  className = '',
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const isPasswordField = type === 'password';
  const effectiveType = isPasswordField && showPassword ? 'text' : type;

  const isFilled = value !== undefined && value !== null && String(value).trim() !== '';

  return (
    <div className={`flex flex-col gap-1.5 w-full ${className}`}>
      {label && (
        <label htmlFor={name} className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1">
          {label} {required && <span className="text-rose-500">*</span>}
        </label>
      )}
      
      <div className="relative flex items-center">
        {Icon && (
          <div className="absolute left-3.5 text-slate-400 pointer-events-none transition-colors">
            <Icon className="w-5 h-5" />
          </div>
        )}
        
        <input
          id={name}
          name={name}
          type={effectiveType}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className={`w-full rounded-xl border bg-slate-50/50 px-4 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 transition-all focus:bg-white focus:outline-none focus:ring-2 ${
            Icon ? 'pl-11' : ''
          } ${
            isPasswordField ? 'pr-11' : ''
          } ${
            error
              ? 'border-rose-400 focus:border-rose-500 focus:ring-rose-200/50 bg-rose-50/30'
              : isFilled
              ? 'border-emerald-300 focus:border-emerald-500 focus:ring-emerald-100'
              : 'border-slate-200 focus:border-indigo-600 focus:ring-indigo-100'
          }`}
          {...props}
        />

        {/* Dynamic Validation Icon OR Eye Toggle Icon */}
        <div className="absolute right-3.5 flex items-center gap-1.5">
          {isPasswordField ? (
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="text-slate-400 hover:text-slate-700 p-1 rounded-lg focus:outline-none transition-colors"
              tabIndex={-1}
            >
              {showPassword ? (
                <EyeOff className="w-4 h-4 text-indigo-600" />
              ) : (
                <Eye className="w-4 h-4 text-slate-400" />
              )}
            </button>
          ) : error ? (
            <AlertCircle className="w-5 h-5 text-rose-500 pointer-events-none" />
          ) : isFilled ? (
            <CheckCircle2 className="w-5 h-5 text-emerald-500 pointer-events-none" />
          ) : null}
        </div>
      </div>

      <AnimatePresence mode="wait">
        {error ? (
          <motion.p 
            initial={{ opacity: 0, y: -4 }} 
            animate={{ opacity: 1, y: 0 }} 
            exit={{ opacity: 0 }}
            className="text-xs font-medium text-rose-600 mt-0.5 flex items-center gap-1"
          >
            {error}
          </motion.p>
        ) : helperText ? (
          <p className="text-xs text-slate-500 mt-0.5">{helperText}</p>
        ) : null}
      </AnimatePresence>
    </div>
  );
};

export default InputField;