// // src/pages/NotFoundPage.jsx
// import React from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import { Home, ArrowLeft, SearchX } from 'lucide-react';
// import Button from '../components/common/Button';

// const NotFoundPage = () => {
//   const navigate = useNavigate();

//   return (
//     <div className="min-h-[calc(100vh-4rem)] bg-slate-50 flex items-center justify-center p-4">
//       <div className="max-w-md w-full bg-white border border-slate-200 rounded-2xl p-8 text-center shadow-xs space-y-6">
        
//         <div className="w-20 h-20 bg-slate-100 text-slate-400 rounded-full flex items-center justify-center mx-auto">
//           <SearchX className="w-10 h-10" />
//         </div>
        
//         <div className="space-y-2">
//           <h1 className="text-4xl font-black text-slate-900 tracking-tight">404</h1>
//           <h2 className="text-lg font-bold text-slate-800">Page Not Found</h2>
//           <p className="text-sm text-slate-500 leading-relaxed max-w-sm mx-auto">
//             Oops! The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
//           </p>
//         </div>

//         <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
//           <Button
//             variant="outline"
//             onClick={() => navigate(-1)}
//             icon={ArrowLeft}
//             className="w-full sm:w-auto"
//           >
//             Go Back
//           </Button>
          
//           <Link to="/" className="w-full sm:w-auto">
//             <Button
//               variant="primary"
//               icon={Home}
//               className="w-full"
//             >
//               Back to Home
//             </Button>
//           </Link>
//         </div>

//       </div>
//     </div>
//   );
// };

// export default NotFoundPage;



import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Home, ArrowLeft, SearchX, Sparkles, Cpu } from 'lucide-react';
import Button from '../components/common/Button';

const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-[calc(100vh-5rem)] bg-slate-950 text-slate-100 flex items-center justify-center p-4 sm:p-6 font-sans relative overflow-hidden">
      {/* Background Ambient Glows */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-indigo-600/15 blur-[130px] rounded-full pointer-events-none" />
      <div className="absolute bottom-12 right-12 w-72 h-72 bg-violet-600/10 blur-[110px] rounded-full pointer-events-none" />

      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="max-w-md w-full bg-slate-900/90 backdrop-blur-2xl border border-slate-800 rounded-3xl p-8 sm:p-10 text-center shadow-2xl space-y-6 relative z-10"
      >
        {/* Animated Icon Container */}
        <div className="relative inline-block">
          <div className="absolute -inset-2 bg-gradient-to-r from-indigo-500 to-violet-500 rounded-3xl blur-md opacity-40 animate-pulse" />
          <div className="relative w-20 h-20 bg-slate-950 border border-slate-800 text-indigo-400 rounded-3xl flex items-center justify-center mx-auto shadow-inner">
            <SearchX className="w-10 h-10" />
          </div>
        </div>
        
        {/* Title and Message */}
        <div className="space-y-2">
          <span className="text-[10px] font-mono font-bold text-indigo-400 bg-indigo-950/80 border border-indigo-800/60 px-3 py-1 rounded-full uppercase tracking-widest inline-flex items-center gap-1.5">
            <Cpu className="w-3 h-3" /> Error Code 404
          </span>
          <h1 className="text-5xl font-black text-white tracking-tight pt-2">404</h1>
          <h2 className="text-lg font-black text-white tracking-tight flex items-center justify-center gap-1.5">
            Page Not Found <Sparkles className="w-4 h-4 text-indigo-400" />
          </h2>
          <p className="text-xs text-slate-400 leading-relaxed max-w-xs mx-auto">
            Oops! The route you are searching for might have been moved, renamed, or is temporarily offline.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
          <Button
            variant="outline"
            onClick={() => navigate(-1)}
            icon={ArrowLeft}
            className="w-full sm:w-auto border-slate-800 text-slate-300 hover:bg-slate-800/80 cursor-pointer"
          >
            Go Back
          </Button>
          
          <Link to="/" className="w-full sm:w-auto">
            <Button
              variant="primary"
              icon={Home}
              className="w-full shadow-lg shadow-indigo-600/30 text-white cursor-pointer"
            >
              Back to Home
            </Button>
          </Link>
        </div>
      </motion.div>
    </div>
  );
};

export default NotFoundPage;