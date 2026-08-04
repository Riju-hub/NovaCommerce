// // src/pages/auth/LoginPage.jsx
// import React from 'react';
// import { Link } from 'react-router-dom';
// import { ShoppingBag } from 'lucide-react';
// import LoginForm from '../../components/auth/LoginForm';

// const LoginPage = () => {
//   return (
//     <div className="min-h-[calc(100vh-4rem)] bg-slate-50 flex items-center justify-center p-4">
//       <div className="bg-white rounded-2xl border border-slate-200 shadow-md p-8 w-full max-w-md space-y-6">
        
//         <div className="text-center space-y-2">
//           <Link to="/" className="inline-flex items-center gap-2">
//             <div className="bg-blue-600 text-white font-black p-2 rounded-lg text-lg tracking-wider">
//               NEX
//             </div>
//             <span className="font-bold text-2xl text-slate-900">NexCart</span>
//           </Link>
//           <h1 className="text-xl font-bold text-slate-900 pt-2">Welcome Back</h1>
//           <p className="text-xs text-slate-500">
//             Sign in to access your orders, store account, or dashboard.
//           </p>
//         </div>

//         <LoginForm />

//         <div className="text-center pt-2 border-t border-slate-100">
//           <p className="text-xs text-slate-500">
//             Are you a seller?{' '}
//             <Link to="/register?role=vendor" className="font-semibold text-blue-600 hover:underline">
//               Sign up as a Vendor
//             </Link>
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default LoginPage;



import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Sparkles, Cpu, Store, Lock } from 'lucide-react';
import LoginForm from '../../components/auth/LoginForm';

const LoginPage = () => {
  return (
    <div className="min-h-[calc(100vh-5rem)] bg-slate-950 text-slate-100 flex items-center justify-center p-4 sm:p-6 font-sans relative overflow-hidden">
      {/* Glow Effects Background */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-indigo-600/15 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-72 h-72 bg-violet-600/10 blur-[100px] rounded-full pointer-events-none" />

      <motion.div 
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-slate-900/80 backdrop-blur-2xl rounded-3xl border border-slate-800 shadow-2xl p-6 sm:p-8 w-full max-w-md space-y-6 relative z-10"
      >
        {/* Header Section */}
        <div className="text-center space-y-3">
          <Link to="/" className="inline-flex items-center gap-3 group">
            <div className="relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-2xl blur-xs opacity-75 group-hover:opacity-100 transition duration-300 animate-pulse" />
              <div className="relative bg-slate-900 text-white font-black px-3 py-2 rounded-xl text-base tracking-wider flex items-center gap-1.5 border border-slate-700/60 shadow-inner">
                <span>NEX</span>
                <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
              </div>
            </div>
            <div className="flex flex-col text-left">
              <span className="font-extrabold text-2xl text-white tracking-tight leading-none group-hover:text-indigo-400 transition-colors">
                NexCart
              </span>
              <span className="text-[9px] font-mono font-bold tracking-widest text-indigo-400 uppercase flex items-center gap-1 mt-1">
                <Cpu className="w-2.5 h-2.5" /> AI Engine
              </span>
            </div>
          </Link>

          <div className="pt-2">
            <h1 className="text-xl font-black text-white tracking-tight flex items-center justify-center gap-2">
              Welcome Back <Lock className="w-4 h-4 text-indigo-400" />
            </h1>
            <p className="text-xs text-slate-400 mt-1 leading-relaxed">
              Sign in to access your order history, saved cart, or seller command hub.
            </p>
          </div>
        </div>

        {/* Login Form Component */}
        <LoginForm />

        {/* Footer Links */}
        <div className="text-center pt-4 border-t border-slate-800/80">
          <p className="text-xs font-semibold text-slate-400">
            Are you a seller?{' '}
            <Link to="/register?role=vendor" className="font-bold text-indigo-400 hover:text-indigo-300 inline-flex items-center gap-1 transition-colors">
              <Store className="w-3.5 h-3.5" /> Register as a Vendor
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default LoginPage;