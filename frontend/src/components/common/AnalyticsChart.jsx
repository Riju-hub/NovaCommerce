// src/components/common/AnalyticsChart.jsx
import React from 'react';

const AnalyticsChart = ({ title, data = [], type = 'bar', color = 'blue' }) => {
  const maxValue = Math.max(...data.map((d) => d.value), 1);

  const colorStyles = {
    blue: 'bg-blue-600 hover:bg-blue-700',
    emerald: 'bg-emerald-600 hover:bg-emerald-700',
    indigo: 'bg-indigo-600 hover:bg-indigo-700',
  };

  return (
    <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs">
      {title && <h3 className="text-base font-semibold text-slate-900 mb-6">{title}</h3>}

      {/* Bar Chart Visualization */}
      <div className="flex items-end gap-3 h-48 pt-6 border-b border-slate-200">
        {data.map((item, index) => {
          const heightPercent = Math.round((item.value / maxValue) * 100);
          return (
            <div key={index} className="flex-1 flex flex-col items-center h-full justify-end group">
              <div className="text-[10px] font-medium text-slate-500 opacity-0 group-hover:opacity-100 transition-opacity mb-1">
                ${item.value}
              </div>
              <div
                style={{ height: `${heightPercent}%` }}
                className={`w-full rounded-t-md transition-all duration-300 ${colorStyles[color] || colorStyles.blue}`}
              />
              <span className="text-xs text-slate-500 mt-2 truncate w-full text-center">
                {item.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AnalyticsChart;