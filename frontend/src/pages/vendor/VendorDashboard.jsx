// // src/pages/vendor/VendorDashboard.jsx
// import React, { useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { DollarSign, ShoppingBag, Package, TrendingUp } from 'lucide-react';
// import VendorSidebar from '../../components/vendor/VendorSidebar';
// import AnalyticsChart from '../../components/common/AnalyticsChart';
// import Loader from '../../components/common/Loader';
// import { fetchVendorProfile } from '../../redux/slices/vendorSlice';

// const VendorDashboard = () => {
//   const dispatch = useDispatch();
//   const { storeInfo, stats, loading } = useSelector((state) => state.vendor);

//   useEffect(() => {
//     dispatch(fetchVendorProfile());
//   }, [dispatch]);

//   const chartData = [
//     { label: 'Mon', value: 420 },
//     { label: 'Tue', value: 680 },
//     { label: 'Wed', value: 510 },
//     { label: 'Thu', value: 890 },
//     { label: 'Fri', value: 1200 },
//     { label: 'Sat', value: 950 },
//     { label: 'Sun', value: 1100 },
//   ];

//   if (loading) {
//     return (
//       <div className="flex min-h-[calc(100vh-4rem)]">
//         <VendorSidebar storeName={storeInfo?.storeName} />
//         <div className="flex-1 flex items-center justify-center">
//           <Loader size="lg" color="blue" />
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="flex min-h-[calc(100vh-4rem)] bg-slate-50">
//       <VendorSidebar storeName={storeInfo?.storeName || 'My Vendor Store'} />

//       <main className="flex-1 p-6 md:p-8 space-y-6 overflow-y-auto">
//         <div>
//           <h1 className="text-2xl font-bold text-slate-900">Vendor Dashboard</h1>
//           <p className="text-xs text-slate-500">
//             Welcome back! Here is an overview of your store's performance.
//           </p>
//         </div>

//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
//           <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs flex items-center justify-between">
//             <div>
//               <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Total Sales</p>
//               <h3 className="text-xl font-black text-slate-900 mt-1">
//                 ${parseFloat(stats?.totalSales || 12450).toFixed(2)}
//               </h3>
//             </div>
//             <div className="w-10 h-10 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
//               <DollarSign className="w-5 h-5" />
//             </div>
//           </div>

//           <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs flex items-center justify-between">
//             <div>
//               <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Total Orders</p>
//               <h3 className="text-xl font-black text-slate-900 mt-1">
//                 {stats?.totalOrders || 128}
//               </h3>
//             </div>
//             <div className="w-10 h-10 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
//               <ShoppingBag className="w-5 h-5" />
//             </div>
//           </div>

//           <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs flex items-center justify-between">
//             <div>
//               <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Active Items</p>
//               <h3 className="text-xl font-black text-slate-900 mt-1">
//                 {stats?.activeProducts || 24}
//               </h3>
//             </div>
//             <div className="w-10 h-10 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center">
//               <Package className="w-5 h-5" />
//             </div>
//           </div>

//           <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs flex items-center justify-between">
//             <div>
//               <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Growth Rate</p>
//               <h3 className="text-xl font-black text-emerald-600 mt-1">+18.4%</h3>
//             </div>
//             <div className="w-10 h-10 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center">
//               <TrendingUp className="w-5 h-5" />
//             </div>
//           </div>
//         </div>

//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
//           <div className="lg:col-span-2">
//             <AnalyticsChart title="Weekly Store Revenue ($)" data={chartData} color="blue" />
//           </div>

//           <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs space-y-4">
//             <h3 className="text-base font-bold text-slate-900">Store Status</h3>
//             <div className="bg-emerald-50 border border-emerald-200 p-4 rounded-lg text-xs text-emerald-800 space-y-1">
//               <span className="font-bold block">✓ Store Active & Public</span>
//               <p className="text-emerald-700">
//                 Your listings are visible to buyers across all catalog pages.
//               </p>
//             </div>
//             <div className="pt-2 text-xs text-slate-500 space-y-2">
//               <div className="flex justify-between border-b border-slate-100 pb-2">
//                 <span>Commission Rate:</span>
//                 <span className="font-semibold text-slate-900">5% per sale</span>
//               </div>
//               <div className="flex justify-between">
//                 <span>Payout Schedule:</span>
//                 <span className="font-semibold text-slate-900">Weekly (Every Mon)</span>
//               </div>
//             </div>
//           </div>
//         </div>
//       </main>
//     </div>
//   );
// };

// export default VendorDashboard;


import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import { DollarSign, ShoppingBag, Package, TrendingUp, Sparkles, Cpu, Store, CheckCircle2 } from 'lucide-react';
import VendorSidebar from '../../components/vendor/VendorSidebar';
import AnalyticsChart from '../../components/common/AnalyticsChart';
import Loader from '../../components/common/Loader';
import { fetchVendorProfile } from '../../redux/slices/vendorSlice';

const VendorDashboard = () => {
  const dispatch = useDispatch();
  const { storeInfo, stats, loading } = useSelector((state) => state.vendor);

  useEffect(() => {
    dispatch(fetchVendorProfile());
  }, [dispatch]);

  const chartData = [
    { label: 'Mon', value: 420 },
    { label: 'Tue', value: 680 },
    { label: 'Wed', value: 510 },
    { label: 'Thu', value: 890 },
    { label: 'Fri', value: 1200 },
    { label: 'Sat', value: 950 },
    { label: 'Sun', value: 1100 },
  ];

  if (loading) {
    return (
      <div className="flex flex-col md:flex-row min-h-[calc(100vh-5rem)] bg-slate-950 text-slate-100">
        <VendorSidebar storeName={storeInfo?.storeName} />
        <div className="flex-1 flex items-center justify-center min-h-[60vh]">
          <Loader size="lg" color="indigo" />
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col md:flex-row min-h-[calc(100vh-5rem)] bg-slate-950 text-slate-100 font-sans">
      <VendorSidebar storeName={storeInfo?.storeName || 'My Vendor Store'} />

      <main className="flex-1 p-6 md:p-8 space-y-8 overflow-y-auto w-full min-w-0">
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800/80 pb-6">
          <div>
            <div className="flex items-center gap-2 text-indigo-400 text-xs font-mono font-bold uppercase tracking-widest mb-1">
              <Store className="w-4 h-4" /> Merchant Hub
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight flex items-center gap-2">
              Vendor Dashboard <Sparkles className="w-5 h-5 text-indigo-400" />
            </h1>
            <p className="text-xs text-slate-400 mt-1">
              Welcome back! Here is an overview of your store's performance metrics.
            </p>
          </div>

          <div className="flex items-center gap-2 bg-slate-900 border border-slate-800 px-4 py-2 rounded-2xl shrink-0 self-start sm:self-auto">
            <Cpu className="w-4 h-4 text-indigo-400" />
            <span className="text-xs font-mono font-bold text-slate-300">Live Sync Active</span>
          </div>
        </div>

        {/* Metric Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          <motion.div 
            whileHover={{ y: -3 }}
            className="bg-slate-900/90 backdrop-blur-2xl p-5 rounded-3xl border border-slate-800 shadow-2xl flex items-center justify-between"
          >
            <div>
              <p className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-widest">Total Sales</p>
              <h3 className="text-2xl font-black text-white font-mono mt-1">
                ₹{parseFloat(stats?.totalSales || 12450).toFixed(2)}
              </h3>
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
              <p className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-widest">Total Orders</p>
              <h3 className="text-2xl font-black text-white font-mono mt-1">
                {stats?.totalOrders || 128}
              </h3>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-indigo-950/80 text-indigo-400 border border-indigo-800/60 flex items-center justify-center shadow-inner">
              <ShoppingBag className="w-6 h-6" />
            </div>
          </motion.div>

          <motion.div 
            whileHover={{ y: -3 }}
            className="bg-slate-900/90 backdrop-blur-2xl p-5 rounded-3xl border border-slate-800 shadow-2xl flex items-center justify-between"
          >
            <div>
              <p className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-widest">Active Items</p>
              <h3 className="text-2xl font-black text-white font-mono mt-1">
                {stats?.activeProducts || 24}
              </h3>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-purple-950/80 text-purple-400 border border-purple-800/60 flex items-center justify-center shadow-inner">
              <Package className="w-6 h-6" />
            </div>
          </motion.div>

          <motion.div 
            whileHover={{ y: -3 }}
            className="bg-slate-900/90 backdrop-blur-2xl p-5 rounded-3xl border border-slate-800 shadow-2xl flex items-center justify-between"
          >
            <div>
              <p className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-widest">Growth Rate</p>
              <h3 className="text-2xl font-black text-emerald-400 font-mono mt-1">+18.4%</h3>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-amber-950/80 text-amber-400 border border-amber-800/60 flex items-center justify-center shadow-inner">
              <TrendingUp className="w-6 h-6" />
            </div>
          </motion.div>
        </div>

        {/* Analytics & Status Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <AnalyticsChart title="Weekly Store Revenue (₹)" data={chartData} color="indigo" />
          </div>

          <div className="bg-slate-900/90 backdrop-blur-2xl p-6 rounded-3xl border border-slate-800 shadow-2xl space-y-5">
            <h3 className="text-base font-black text-white tracking-tight flex items-center gap-2">
              Store Operational Status
            </h3>

            <div className="bg-emerald-950/80 border border-emerald-800/80 p-4 rounded-2xl text-xs space-y-1.5">
              <span className="font-bold text-emerald-400 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Store Active & Public
              </span>
              <p className="text-slate-300 leading-relaxed">
                Your listings are visible to buyers across all catalog pages.
              </p>
            </div>

            <div className="pt-2 text-xs font-mono text-slate-400 space-y-3">
              <div className="flex justify-between border-b border-slate-800 pb-2.5">
                <span>Commission Rate:</span>
                <span className="font-bold text-white">5% per sale</span>
              </div>
              <div className="flex justify-between">
                <span>Payout Schedule:</span>
                <span className="font-bold text-white">Weekly (Every Mon)</span>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default VendorDashboard;