// // src/pages/admin/ReportsPage.jsx
// import React from 'react';
// import { Download, FileText, BarChart3, TrendingUp } from 'lucide-react';
// import AdminSidebar from '../../components/admin/AdminSidebar';
// import Button from '../../components/common/Button';

// const ReportsPage = () => {
//   return (
//     <div className="flex min-h-[calc(100vh-4rem)] bg-slate-50">
//       <AdminSidebar />

//       <main className="flex-1 p-6 md:p-8 space-y-6 overflow-y-auto">
//         <div>
//           <h1 className="text-2xl font-bold text-slate-900">Platform Reports</h1>
//           <p className="text-xs text-slate-500">
//             Export site metrics, transaction logs, and commission statements.
//           </p>
//         </div>

//         <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//           <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs space-y-4">
//             <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-lg flex items-center justify-center">
//               <FileText className="w-5 h-5" />
//             </div>
//             <div>
//               <h3 className="font-bold text-slate-900 text-sm">Sales & Revenue Audit</h3>
//               <p className="text-xs text-slate-500 mt-1">Detailed summary of GMV and vendor commission cuts.</p>
//             </div>
//             <Button variant="outline" size="sm" className="w-full" icon={Download}>
//               Export CSV
//             </Button>
//           </div>

//           <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs space-y-4">
//             <div className="w-10 h-10 bg-purple-50 text-purple-600 rounded-lg flex items-center justify-center">
//               <BarChart3 className="w-5 h-5" />
//             </div>
//             <div>
//               <h3 className="font-bold text-slate-900 text-sm">Vendor Performance</h3>
//               <p className="text-xs text-slate-500 mt-1">Order completion rates and fulfillment analytics.</p>
//             </div>
//             <Button variant="outline" size="sm" className="w-full" icon={Download}>
//               Export CSV
//             </Button>
//           </div>

//           <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs space-y-4">
//             <div className="w-10 h-10 bg-emerald-50 text-emerald-600 rounded-lg flex items-center justify-center">
//               <TrendingUp className="w-5 h-5" />
//             </div>
//             <div>
//               <h3 className="font-bold text-slate-900 text-sm">User Growth Ledger</h3>
//               <p className="text-xs text-slate-500 mt-1">Customer signups, active vendors, and retention metrics.</p>
//             </div>
//             <Button variant="outline" size="sm" className="w-full" icon={Download}>
//               Export CSV
//             </Button>
//           </div>
//         </div>
//       </main>
//     </div>
//   );
// };

// export default ReportsPage;


import React from 'react';
import { motion } from 'framer-motion';
import { Download, FileText, BarChart3, TrendingUp, Sparkles, ShieldCheck } from 'lucide-react';
import AdminSidebar from '../../components/admin/AdminSidebar';
import Button from '../../components/common/Button';

const ReportsPage = () => {
  return (
    <div className="flex flex-col md:flex-row min-h-[calc(100vh-5rem)] bg-slate-950 text-slate-100 font-sans">
      <AdminSidebar />

      <main className="flex-1 p-6 md:p-8 space-y-8 overflow-y-auto w-full min-w-0">
        <div className="border-b border-slate-800/80 pb-6">
          <div className="flex items-center gap-2 text-amber-400 text-xs font-mono font-bold uppercase tracking-widest mb-1">
            <ShieldCheck className="w-4 h-4" /> Audit Intelligence
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight flex items-center gap-2">
            Platform Reports <Sparkles className="w-5 h-5 text-amber-400" />
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Export site metrics, transaction logs, and commission statements.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <motion.div 
            whileHover={{ y: -3 }}
            className="bg-slate-900/90 backdrop-blur-2xl p-6 rounded-3xl border border-slate-800 shadow-2xl space-y-5 flex flex-col justify-between"
          >
            <div className="space-y-4">
              <div className="w-12 h-12 bg-indigo-950 text-indigo-400 border border-indigo-800/60 rounded-2xl flex items-center justify-center shadow-inner">
                <FileText className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-extrabold text-white text-base">Sales & Revenue Audit</h3>
                <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                  Detailed breakdown of GMV, platform fees, and vendor payout ledgers.
                </p>
              </div>
            </div>
            <Button variant="outline" size="sm" className="w-full border-slate-800 text-slate-200 hover:bg-slate-800" icon={Download}>
              Export CSV
            </Button>
          </motion.div>

          <motion.div 
            whileHover={{ y: -3 }}
            className="bg-slate-900/90 backdrop-blur-2xl p-6 rounded-3xl border border-slate-800 shadow-2xl space-y-5 flex flex-col justify-between"
          >
            <div className="space-y-4">
              <div className="w-12 h-12 bg-purple-950 text-purple-400 border border-purple-800/60 rounded-2xl flex items-center justify-center shadow-inner">
                <BarChart3 className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-extrabold text-white text-base">Vendor Performance</h3>
                <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                  Order fulfillment timelines, refund rates, and vendor ratings.
                </p>
              </div>
            </div>
            <Button variant="outline" size="sm" className="w-full border-slate-800 text-slate-200 hover:bg-slate-800" icon={Download}>
              Export CSV
            </Button>
          </motion.div>

          <motion.div 
            whileHover={{ y: -3 }}
            className="bg-slate-900/90 backdrop-blur-2xl p-6 rounded-3xl border border-slate-800 shadow-2xl space-y-5 flex flex-col justify-between"
          >
            <div className="space-y-4">
              <div className="w-12 h-12 bg-emerald-950 text-emerald-400 border border-emerald-800/60 rounded-2xl flex items-center justify-center shadow-inner">
                <TrendingUp className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-extrabold text-white text-base">User Growth Ledger</h3>
                <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                  Customer acquisition metrics, active vendor accounts, and retention tracking.
                </p>
              </div>
            </div>
            <Button variant="outline" size="sm" className="w-full border-slate-800 text-slate-200 hover:bg-slate-800" icon={Download}>
              Export CSV
            </Button>
          </motion.div>
        </div>
      </main>
    </div>
  );
};

export default ReportsPage;