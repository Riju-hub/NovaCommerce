
import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, BarChart3 } from 'lucide-react';

const AnalyticsChart = ({ title, data = [], type = 'bar', color = 'indigo' }) => {
  const maxValue = Math.max(...data.map((d) => d.value), 1);

  const colorStyles = {
    blue: 'bg-gradient-to-t from-blue-600 to-cyan-400 shadow-blue-500/20 hover:shadow-blue-500/40',
    emerald: 'bg-gradient-to-t from-emerald-600 to-teal-400 shadow-emerald-500/20 hover:shadow-emerald-500/40',
    indigo: 'bg-gradient-to-t from-indigo-600 to-violet-500 shadow-indigo-500/20 hover:shadow-indigo-500/40',
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="bg-white/80 backdrop-blur-xl p-6 rounded-2xl border border-slate-100 shadow-xl shadow-slate-200/50"
    >
      {title && (
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-indigo-50 rounded-xl text-indigo-600">
              <BarChart3 className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-800 tracking-tight">{title}</h3>
          </div>
          <span className="flex items-center gap-1 text-xs font-semibold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full">
            <TrendingUp className="w-3.5 h-3.5" /> Live Data
          </span>
        </div>
      )}

      {/* Bar Chart Visualization */}
      <div className="flex items-end gap-2.5 sm:gap-4 h-52 pt-8 border-b border-slate-100">
        {data.map((item, index) => {
          const heightPercent = Math.round((item.value / maxValue) * 100);
          return (
            <div key={index} className="flex-1 flex flex-col items-center h-full justify-end group relative">
              {/* Value Badge */}
              <motion.div 
                initial={{ opacity: 0, y: 5 }}
                whileHover={{ opacity: 1, y: -2 }}
                className="absolute -top-3 text-[11px] font-bold text-slate-700 bg-slate-900 text-white px-2 py-0.5 rounded-md shadow-md opacity-0 group-hover:opacity-100 transition-all pointer-events-none z-10"
              >
                ${item.value}
              </motion.div>

              {/* Animated Bar */}
              <motion.div
                initial={{ height: 0 }}
                animate={{ height: `${heightPercent}%` }}
                transition={{ duration: 0.6, delay: index * 0.05, ease: 'easeOut' }}
                className={`w-full rounded-t-lg transition-all shadow-lg ${colorStyles[color] || colorStyles.indigo}`}
              />

              <span className="text-[11px] sm:text-xs font-medium text-slate-500 mt-3 truncate w-full text-center">
                {item.label}
              </span>
            </div>
          );
        })}
      </div>
    </motion.div>
  );
};

export default AnalyticsChart;