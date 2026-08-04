// // src/pages/auth/RegisterPage.jsx
// import React from 'react';
// import { Link, useSearchParams } from 'react-router-dom';
// import RegisterForm from '../../components/auth/RegisterForm';

// const RegisterPage = () => {
//   const [searchParams] = useSearchParams();
//   const isVendor = searchParams.get('role') === 'vendor';

//   return (
//     <div className="min-h-[calc(100vh-4rem)] bg-slate-50 flex items-center justify-center p-4 py-8">
//       <div className="bg-white rounded-2xl border border-slate-200 shadow-md p-8 w-full max-w-md space-y-6">
        
//         <div className="text-center space-y-2">
//           <Link to="/" className="inline-flex items-center gap-2">
//             <div className="bg-blue-600 text-white font-black p-2 rounded-lg text-lg tracking-wider">
//               NEX
//             </div>
//             <span className="font-bold text-2xl text-slate-900">NexCart</span>
//           </Link>
//           <h1 className="text-xl font-bold text-slate-900 pt-2">
//             {isVendor ? 'Start Selling on NexCart' : 'Create Your Account'}
//           </h1>
//           <p className="text-xs text-slate-500">
//             {isVendor
//               ? 'Join our multi-vendor marketplace and set up your storefront today.'
//               : 'Join thousands of shoppers and discover products from independent sellers.'}
//           </p>
//         </div>

//         <RegisterForm />
//       </div>
//     </div>
//   );
// };

// export default RegisterPage;


import React from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Sparkles, Cpu, UserPlus, Store } from 'lucide-react';
import RegisterForm from '../../components/auth/RegisterForm';

const RegisterPage = () => {
  const [searchParams] = useSearchParams();
  const isVendor = searchParams.get('role') === 'vendor';

  return (
    <div className="min-h-[calc(100vh-5rem)] bg-slate-950 text-slate-100 flex items-center justify-center p-4 sm:p-6 py-8 font-sans relative overflow-hidden">
      {/* Background Glows */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-purple-600/15 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-72 h-72 bg-indigo-600/10 blur-[100px] rounded-full pointer-events-none" />

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
              {isVendor ? (
                <>
                  <Store className="w-5 h-5 text-indigo-400" /> Start Selling on NexCart
                </>
              ) : (
                <>
                  <UserPlus className="w-5 h-5 text-indigo-400" /> Create Your Account
                </>
              )}
            </h1>
            <p className="text-xs text-slate-400 mt-1 leading-relaxed">
              {isVendor
                ? 'Join our multi-tenant marketplace ecosystem and establish your storefront.'
                : 'Join thousands of shoppers discovering premium products from independent merchants.'}
            </p>
          </div>
        </div>

        {/* Registration Form Component */}
        <RegisterForm />
      </motion.div>
    </div>
  );
};

export default RegisterPage;