
import React from 'react';
import { motion } from 'framer-motion';

const Loader = ({ size = 'md', color = 'indigo', fullScreen = false }) => {
  const sizes = {
    sm: 'w-5 h-5 border-2',
    md: 'w-9 h-9 border-3',
    lg: 'w-14 h-14 border-4',
  };

  const colors = {
    indigo: 'border-indigo-600 border-t-transparent',
    white: 'border-white border-t-transparent',
    slate: 'border-slate-700 border-t-transparent',
  };

  const spinner = (
    <motion.div
      animate={{ rotate: 360 }}
      transition={{ repeat: Infinity, duration: 0.8, ease: 'linear' }}
      className={`rounded-full ${sizes[size]} ${colors[color] || colors.indigo}`}
      role="status"
    />
  );

  if (fullScreen) {
    return (
      <div className="fixed inset-0 bg-slate-950/40 backdrop-blur-md flex flex-col items-center justify-center gap-3 z-50">
        {spinner}
        <span className="text-xs font-semibold text-white tracking-widest uppercase">Loading...</span>
      </div>
    );
  }

  return spinner;
};

export default Loader;