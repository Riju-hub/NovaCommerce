
import React from 'react';
import { motion } from 'framer-motion';
import { User, Shield, Store, Ban, CheckCircle, Users } from 'lucide-react';

const UserTable = ({ users = [], onRoleChange, onStatusToggle }) => {
  const getRoleBadge = (role) => {
    switch (role?.toLowerCase()) {
      case 'admin':
        return (
          <span className="bg-amber-950 text-amber-300 border border-amber-800/80 text-[10px] font-mono font-bold px-2.5 py-1 rounded-md inline-flex items-center gap-1 shadow-sm">
            <Shield className="w-3 h-3 text-amber-400" /> Admin
          </span>
        );
      case 'vendor':
        return (
          <span className="bg-purple-950 text-purple-300 border border-purple-800/80 text-[10px] font-mono font-bold px-2.5 py-1 rounded-md inline-flex items-center gap-1 shadow-sm">
            <Store className="w-3 h-3 text-purple-400" /> Vendor
          </span>
        );
      default:
        return (
          <span className="bg-indigo-950 text-indigo-300 border border-indigo-800/80 text-[10px] font-mono font-bold px-2.5 py-1 rounded-md inline-flex items-center gap-1 shadow-sm">
            <User className="w-3 h-3 text-indigo-400" /> Customer
          </span>
        );
    }
  };

  if (!users || users.length === 0) {
    return (
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-12 text-center text-slate-400 my-4 shadow-2xl flex flex-col items-center justify-center gap-3">
        <div className="p-3 bg-indigo-950 rounded-2xl border border-indigo-800/50 text-indigo-400">
          <Users className="w-8 h-8" />
        </div>
        <div>
          <p className="text-base font-extrabold text-white">No users found</p>
          <p className="text-xs text-slate-500 mt-1">Registered users will appear here.</p>
        </div>
      </div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-slate-900 rounded-3xl border border-slate-800 overflow-hidden shadow-2xl"
    >
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-950 border-b border-slate-800 text-[10px] font-mono font-bold text-amber-400 uppercase tracking-widest">
              <th className="py-4 px-5">User</th>
              <th className="py-4 px-5">Role</th>
              <th className="py-4 px-5">Joined Date</th>
              <th className="py-4 px-5">Status</th>
              <th className="py-4 px-5 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800 text-xs text-slate-200">
            {users.map((u) => (
              <tr key={u._id} className="hover:bg-slate-800/60 transition-colors bg-slate-900">
                <td className="py-3.5 px-5">
                  <div className="font-bold text-white text-sm">{u.name || 'Unnamed User'}</div>
                  <div className="text-[11px] font-mono text-slate-400">{u.email}</div>
                </td>
                <td className="py-3.5 px-5">{getRoleBadge(u.role)}</td>
                <td className="py-3.5 px-5 font-mono text-slate-300">
                  {new Date(u.createdAt || Date.now()).toLocaleDateString('en-IN', {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric',
                  })}
                </td>
                <td className="py-3.5 px-5">
                  <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-mono font-bold ${
                    u.isBlocked 
                      ? 'bg-rose-950 text-rose-300 border border-rose-800' 
                      : 'bg-emerald-950 text-emerald-300 border border-emerald-800'
                  }`}>
                    {u.isBlocked ? 'Blocked' : 'Active'}
                  </span>
                </td>
                <td className="py-3.5 px-5 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <button
                      onClick={() => onStatusToggle(u._id)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 border ${
                        u.isBlocked
                          ? 'bg-emerald-950 text-emerald-300 border-emerald-800 hover:bg-emerald-900'
                          : 'bg-rose-950 text-rose-300 border-rose-800 hover:bg-rose-900'
                      }`}
                      title={u.isBlocked ? 'Unblock User' : 'Block User'}
                    >
                      {u.isBlocked ? (
                        <>
                          <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
                          <span>Unblock</span>
                        </>
                      ) : (
                        <>
                          <Ban className="w-3.5 h-3.5 text-rose-400" />
                          <span>Block</span>
                        </>
                      )}
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
};

export default UserTable;