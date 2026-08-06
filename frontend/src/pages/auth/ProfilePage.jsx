
import React from 'react';
import { motion } from 'framer-motion';
import { User, Shield, Store, Sparkles, Cpu, MailCheck, Calendar } from 'lucide-react';
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
    <div className="min-h-[calc(100vh-5rem)] bg-slate-950 text-slate-100 py-10 px-4 sm:px-6 lg:px-8 font-sans relative overflow-hidden">
      {/* Background Glows */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-3/4 h-72 bg-indigo-600/10 blur-[130px] rounded-full pointer-events-none" />

      <div className="max-w-4xl mx-auto space-y-8 relative z-10">
        
        {/* User Hero Banner */}
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-slate-900/80 backdrop-blur-2xl rounded-3xl border border-slate-800 p-6 sm:p-8 shadow-2xl flex flex-col sm:flex-row items-center justify-between gap-6 relative overflow-hidden"
        >
          <div className="flex flex-col sm:flex-row items-center gap-6 text-center sm:text-left z-10">
            <div className="relative">
              <div className="w-20 h-20 rounded-2xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-violet-600 text-white font-black text-3xl flex items-center justify-center shrink-0 shadow-lg shadow-indigo-500/20 border border-indigo-400/30">
                {user?.name?.charAt(0)?.toUpperCase() || 'U'}
              </div>
              <div className="absolute -bottom-1 -right-1 bg-emerald-500 border-2 border-slate-900 w-5 h-5 rounded-full" title="Account Active" />
            </div>

            <div className="space-y-1">
              <h1 className="text-2xl font-black text-white tracking-tight flex items-center gap-2 justify-center sm:justify-start">
                {user?.name || 'User Account'} <Sparkles className="w-4 h-4 text-indigo-400" />
              </h1>
              
              <div className="flex items-center gap-3 justify-center sm:justify-start text-xs font-mono text-slate-400">
                <span className="flex items-center gap-1">
                  <MailCheck className="w-3.5 h-3.5 text-indigo-400" /> {user?.email}
                </span>
              </div>

              <div className="pt-1 flex items-center gap-3 justify-center sm:justify-start">
                <span className="inline-flex items-center gap-1 text-[10px] font-mono text-indigo-400 bg-indigo-950/80 border border-indigo-800/40 px-2.5 py-0.5 rounded-md">
                  <Cpu className="w-3 h-3" /> Node Active
                </span>
                <span className="inline-flex items-center gap-1 text-[10px] font-mono text-slate-400">
                  <Calendar className="w-3 h-3" /> Member
                </span>
              </div>
            </div>
          </div>

          <div className="shrink-0 z-10">{getRoleBadge(user?.role)}</div>
        </motion.div>

        {/* Dynamic Form Tabs Component */}
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