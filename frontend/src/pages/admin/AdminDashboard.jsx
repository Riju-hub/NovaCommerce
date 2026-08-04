// // src/pages/admin/AdminDashboard.jsx
// import React, { useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { DollarSign, Users, Store, ShoppingBag, ArrowRight } from 'lucide-react';
// import { Link } from 'react-router-dom';
// import AdminSidebar from '../../components/admin/AdminSidebar';
// import AnalyticsChart from '../../components/common/AnalyticsChart';
// import { fetchAllUsers, fetchPendingVendors } from '../../redux/slices/adminSlice';

// const AdminDashboard = () => {
//   const dispatch = useDispatch();
//   const { users, pendingVendors } = useSelector((state) => state.admin);

//   useEffect(() => {
//     dispatch(fetchAllUsers());
//     dispatch(fetchPendingVendors());
//   }, [dispatch]);

//   const platformRevenueData = [
//     { label: 'Jan', value: 12400 },
//     { label: 'Feb', value: 18900 },
//     { label: 'Mar', value: 15600 },
//     { label: 'Apr', value: 24000 },
//     { label: 'May', value: 28500 },
//     { label: 'Jun', value: 31200 },
//   ];

//   return (
//     <div className="flex min-h-[calc(100vh-4rem)] bg-slate-50">
//       <AdminSidebar />

//       <main className="flex-1 p-6 md:p-8 space-y-6 overflow-y-auto">
//         <div>
//           <h1 className="text-2xl font-bold text-slate-900">Platform Control Center</h1>
//           <p className="text-xs text-slate-500">
//             System metrics, user accounts, and multi-vendor platform health.
//           </p>
//         </div>

//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
//           <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs flex items-center justify-between">
//             <div>
//               <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Platform GMV</p>
//               <h3 className="text-xl font-black text-slate-900 mt-1">$130,600.00</h3>
//             </div>
//             <div className="w-10 h-10 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
//               <DollarSign className="w-5 h-5" />
//             </div>
//           </div>

//           <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs flex items-center justify-between">
//             <div>
//               <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Total Accounts</p>
//               <h3 className="text-xl font-black text-slate-900 mt-1">{users?.length || 42}</h3>
//             </div>
//             <div className="w-10 h-10 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
//               <Users className="w-5 h-5" />
//             </div>
//           </div>

//           <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs flex items-center justify-between">
//             <div>
//               <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Pending Sellers</p>
//               <h3 className="text-xl font-black text-amber-600 mt-1">{pendingVendors?.length || 3}</h3>
//             </div>
//             <div className="w-10 h-10 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center">
//               <Store className="w-5 h-5" />
//             </div>
//           </div>

//           <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs flex items-center justify-between">
//             <div>
//               <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Completed Orders</p>
//               <h3 className="text-xl font-black text-slate-900 mt-1">1,420</h3>
//             </div>
//             <div className="w-10 h-10 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center">
//               <ShoppingBag className="w-5 h-5" />
//             </div>
//           </div>
//         </div>

//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
//           <div className="lg:col-span-2">
//             <AnalyticsChart title="Gross Merchandise Volume (GMV)" data={platformRevenueData} color="emerald" />
//           </div>

//           <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs space-y-4">
//             <h3 className="text-base font-bold text-slate-900">Pending Actions</h3>
            
//             <div className="space-y-3">
//               <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg flex items-center justify-between">
//                 <div>
//                   <h4 className="text-xs font-bold text-slate-900">{pendingVendors.length} Vendors Awaiting Review</h4>
//                   <p className="text-[11px] text-slate-500">Approve store applications</p>
//                 </div>
//                 <Link to="/admin/vendors" className="p-1.5 text-blue-600 hover:bg-white rounded transition-colors">
//                   <ArrowRight className="w-4 h-4" />
//                 </Link>
//               </div>

//               <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg flex items-center justify-between">
//                 <div>
//                   <h4 className="text-xs font-bold text-slate-900">System Logs & Reports</h4>
//                   <p className="text-[11px] text-slate-500">Download audit traces</p>
//                 </div>
//                 <Link to="/admin/reports" className="p-1.5 text-blue-600 hover:bg-white rounded transition-colors">
//                   <ArrowRight className="w-4 h-4" />
//                 </Link>
//               </div>
//             </div>
//           </div>
//         </div>
//       </main>
//     </div>
//   );
// };

// export default AdminDashboard;



import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import { DollarSign, Users, Store, ShoppingBag, ArrowRight, Sparkles, Cpu, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';
import AdminSidebar from '../../components/admin/AdminSidebar';
import AnalyticsChart from '../../components/common/AnalyticsChart';
import { fetchAllUsers, fetchPendingVendors } from '../../redux/slices/adminSlice';

const AdminDashboard = () => {
  const dispatch = useDispatch();
  const { users, pendingVendors } = useSelector((state) => state.admin);

  useEffect(() => {
    dispatch(fetchAllUsers());
    dispatch(fetchPendingVendors());
  }, [dispatch]);

  const platformRevenueData = [
    { label: 'Jan', value: 12400 },
    { label: 'Feb', value: 18900 },
    { label: 'Mar', value: 15600 },
    { label: 'Apr', value: 24000 },
    { label: 'May', value: 28500 },
    { label: 'Jun', value: 31200 },
  ];

  return (
    <div className="flex flex-col md:flex-row min-h-[calc(100vh-5rem)] bg-slate-950 text-slate-100 font-sans">
      <AdminSidebar />

      <main className="flex-1 p-6 md:p-8 space-y-8 overflow-y-auto w-full min-w-0">
        {/* Page Title Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800/80 pb-6">
          <div>
            <div className="flex items-center gap-2 text-amber-400 text-xs font-mono font-bold uppercase tracking-widest mb-1">
              <ShieldCheck className="w-4 h-4" /> System Oversight
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight flex items-center gap-2">
              Platform Control Center <Sparkles className="w-5 h-5 text-amber-400 animate-pulse" />
            </h1>
            <p className="text-xs text-slate-400 mt-1">
              System metrics, account roles, and multi-vendor operational health.
            </p>
          </div>

          <div className="flex items-center gap-2 bg-slate-900 border border-slate-800 px-4 py-2 rounded-2xl shrink-0 self-start sm:self-auto">
            <Cpu className="w-4 h-4 text-amber-400" />
            <span className="text-xs font-mono font-bold text-slate-300">Engine Node: Active</span>
          </div>
        </div>

        {/* Metric Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          <motion.div 
            whileHover={{ y: -3 }}
            className="bg-slate-900/90 backdrop-blur-2xl p-5 rounded-3xl border border-slate-800 shadow-2xl flex items-center justify-between"
          >
            <div>
              <p className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-widest">Platform GMV</p>
              <h3 className="text-2xl font-black text-white font-mono mt-1">₹1,30,600.00</h3>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-emerald-950/80 text-emerald-400 border border-emerald-800/60 flex items-center justify-center shadow-inner">
              <DollarSign className="w-6 h-6" />
            </div>
          </motion.div>

          <motion.div 
            whileHover={{ y: -3 }}
            className="bg-slate-900/90 backdrop-blur-2xl p-5 rounded-3xl border border-slate-800 shadow-2xl flex items-center justify-between"
          >
            <div>
              <p className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-widest">Total Accounts</p>
              <h3 className="text-2xl font-black text-white font-mono mt-1">{users?.length || 42}</h3>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-indigo-950/80 text-indigo-400 border border-indigo-800/60 flex items-center justify-center shadow-inner">
              <Users className="w-6 h-6" />
            </div>
          </motion.div>

          <motion.div 
            whileHover={{ y: -3 }}
            className="bg-slate-900/90 backdrop-blur-2xl p-5 rounded-3xl border border-slate-800 shadow-2xl flex items-center justify-between"
          >
            <div>
              <p className="text-[10px] font-mono font-bold text-amber-400 uppercase tracking-widest">Pending Sellers</p>
              <h3 className="text-2xl font-black text-amber-400 font-mono mt-1">{pendingVendors?.length || 3}</h3>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-amber-950/80 text-amber-400 border border-amber-800/60 flex items-center justify-center shadow-inner">
              <Store className="w-6 h-6" />
            </div>
          </motion.div>

          <motion.div 
            whileHover={{ y: -3 }}
            className="bg-slate-900/90 backdrop-blur-2xl p-5 rounded-3xl border border-slate-800 shadow-2xl flex items-center justify-between"
          >
            <div>
              <p className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-widest">Completed Orders</p>
              <h3 className="text-2xl font-black text-white font-mono mt-1">1,420</h3>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-purple-950/80 text-purple-400 border border-purple-800/60 flex items-center justify-center shadow-inner">
              <ShoppingBag className="w-6 h-6" />
            </div>
          </motion.div>
        </div>

        {/* Analytics & Actions Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <AnalyticsChart title="Gross Merchandise Volume (GMV)" data={platformRevenueData} color="amber" />
          </div>

          <div className="bg-slate-900/90 backdrop-blur-2xl p-6 rounded-3xl border border-slate-800 shadow-2xl space-y-5">
            <h3 className="text-base font-black text-white tracking-tight flex items-center gap-2">
              Pending Tasks
            </h3>
            
            <div className="space-y-3">
              <div className="p-4 bg-slate-950 border border-slate-800/80 rounded-2xl flex items-center justify-between">
                <div>
                  <h4 className="text-xs font-bold text-white">{pendingVendors?.length || 0} Vendors Awaiting Review</h4>
                  <p className="text-[11px] text-slate-400 mt-0.5">Approve or reject store applications</p>
                </div>
                <Link to="/admin/vendors" className="p-2.5 bg-amber-950/80 text-amber-400 border border-amber-800/60 hover:bg-amber-900 rounded-xl transition-colors shrink-0">
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>

              <div className="p-4 bg-slate-950 border border-slate-800/80 rounded-2xl flex items-center justify-between">
                <div>
                  <h4 className="text-xs font-bold text-white">System Logs & Reports</h4>
                  <p className="text-[11px] text-slate-400 mt-0.5">Export commission and transaction logs</p>
                </div>
                <Link to="/admin/reports" className="p-2.5 bg-indigo-950/80 text-indigo-400 border border-indigo-800/60 hover:bg-indigo-900 rounded-xl transition-colors shrink-0">
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;