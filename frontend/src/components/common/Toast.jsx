
import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, AlertTriangle, Info, X } from 'lucide-react';

const Toast = ({ message, type = 'success', onClose, duration = 4000 }) => {
  useEffect(() => {
    if (duration && onClose) {
      const timer = setTimeout(onClose, duration);
      return () => clearTimeout(timer);
    }
  }, [duration, onClose]);

  const configs = {
    success: {
      bg: 'bg-emerald-900/90 border-emerald-500/50 text-emerald-100',
      icon: <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />,
    },
    error: {
      bg: 'bg-rose-900/90 border-rose-500/50 text-rose-100',
      icon: <AlertTriangle className="w-5 h-5 text-rose-400 shrink-0" />,
    },
    info: {
      bg: 'bg-indigo-900/90 border-indigo-500/50 text-indigo-100',
      icon: <Info className="w-5 h-5 text-indigo-400 shrink-0" />,
    },
  };

  const config = configs[type] || configs.info;

  return (
    <AnimatePresence>
      {message && (
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.9 }}
          transition={{ duration: 0.2 }}
          className={`fixed bottom-6 right-6 flex items-center gap-3 px-5 py-3.5 rounded-2xl border backdrop-blur-md shadow-2xl z-50 max-w-md ${config.bg}`}
        >
          {config.icon}
          <span className="text-xs sm:text-sm font-semibold leading-snug">{message}</span>
          {onClose && (
            <button
              onClick={onClose}
              className="ml-auto text-slate-300 hover:text-white p-1 rounded-lg hover:bg-white/10 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Toast;