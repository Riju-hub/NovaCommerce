// // src/pages/auth/ProfilePage.jsx
// import React from 'react';
// import { User, Shield, Store, ShoppingBag } from 'lucide-react';
// import ProfileForm from '../../components/auth/ProfileForm';
// import useAuth from '../../hooks/useAuth';

// const ProfilePage = () => {
//   const { user } = useAuth();

//   const getRoleBadge = (role) => {
//     switch (role) {
//       case 'admin':
//         return (
//           <span className="bg-amber-100 text-amber-800 border border-amber-200 text-xs font-bold px-3 py-1 rounded-full inline-flex items-center gap-1.5">
//             <Shield className="w-3.5 h-3.5" /> Platform Administrator
//           </span>
//         );
//       case 'vendor':
//         return (
//           <span className="bg-purple-100 text-purple-800 border border-purple-200 text-xs font-bold px-3 py-1 rounded-full inline-flex items-center gap-1.5">
//             <Store className="w-3.5 h-3.5" /> Verified Vendor
//           </span>
//         );
//       default:
//         return (
//           <span className="bg-blue-100 text-blue-800 border border-blue-200 text-xs font-bold px-3 py-1 rounded-full inline-flex items-center gap-1.5">
//             <User className="w-3.5 h-3.5" /> Customer Account
//           </span>
//         );
//     }
//   };

//   return (
//     <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
//       <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4">
//         <div className="flex items-center gap-4">
//           <div className="w-16 h-16 rounded-full bg-blue-600 text-white font-bold text-2xl flex items-center justify-center shrink-0 shadow-md">
//             {user?.name?.charAt(0)?.toUpperCase() || 'U'}
//           </div>
//           <div className="text-center sm:text-left">
//             <h1 className="text-xl font-bold text-slate-900">{user?.name || 'User Account'}</h1>
//             <p className="text-xs text-slate-500 mt-0.5">{user?.email}</p>
//           </div>
//         </div>

//         <div>{getRoleBadge(user?.role)}</div>
//       </div>

//       <ProfileForm />
//     </div>
//   );
// };

// export default ProfilePage;


import React from 'react';
import { motion } from 'framer-motion';
import { User, Shield, Store, Sparkles, Cpu } from 'lucide-react';
import ProfileForm from '../../components/auth/ProfileForm';
import useAuth from '../../hooks/useAuth';

const ProfilePage = () => {
  const { user } = useAuth();

  const getRoleBadge = (role) => {
    switch (role?.toLowerCase()) {
      case 'admin':
        return (
          <span className="bg-amber-950/80 text-amber-400 border border-amber-800/60 text-xs font-mono font-bold px-3.5 py-1.5 rounded-xl inline-flex items-center gap-2 shadow-inner">
            <Shield className="w-4 h-4 text-amber-400" /> Platform Administrator
          </span>
        );
      case 'vendor':
        return (
          <span className="bg-purple-950/80 text-purple-400 border border-purple-800/60 text-xs font-mono font-bold px-3.5 py-1.5 rounded-xl inline-flex items-center gap-2 shadow-inner">
            <Store className="w-4 h-4 text-purple-400" /> Verified Vendor
          </span>
        );
      default:
        return (
          <span className="bg-indigo-950/80 text-indigo-400 border border-indigo-800/60 text-xs font-mono font-bold px-3.5 py-1.5 rounded-xl inline-flex items-center gap-2 shadow-inner">
            <User className="w-4 h-4 text-indigo-400" /> Customer Account
          </span>
        );
    }
  };

  return (
    <div className="min-h-[calc(100vh-5rem)] bg-slate-950 text-slate-100 py-8 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-4xl mx-auto space-y-8">
        
        {/* User Card Header */}
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-slate-900/80 backdrop-blur-2xl rounded-3xl border border-slate-800 p-6 sm:p-8 shadow-2xl flex flex-col sm:flex-row items-center justify-between gap-6"
        >
          <div className="flex flex-col sm:flex-row items-center gap-5 text-center sm:text-left">
            <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-indigo-600 via-indigo-500 to-violet-600 text-white font-black text-3xl flex items-center justify-center shrink-0 shadow-lg shadow-indigo-500/20 border-2 border-indigo-400/30">
              {user?.name?.charAt(0)?.toUpperCase() || 'U'}
            </div>
            <div>
              <h1 className="text-2xl font-black text-white tracking-tight flex items-center gap-2 justify-center sm:justify-start">
                {user?.name || 'User Account'} <Sparkles className="w-4 h-4 text-indigo-400" />
              </h1>
              <p className="text-xs font-mono text-slate-400 mt-1">{user?.email}</p>
              <span className="inline-flex items-center gap-1 text-[10px] font-mono text-slate-500 mt-2">
                <Cpu className="w-3 h-3 text-indigo-400" /> Account Node Active
              </span>
            </div>
          </div>

          <div className="shrink-0">{getRoleBadge(user?.role)}</div>
        </motion.div>

        {/* Profile Settings Form */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <ProfileForm />
        </motion.div>

      </div>
    </div>
  );
};

export default ProfilePage;