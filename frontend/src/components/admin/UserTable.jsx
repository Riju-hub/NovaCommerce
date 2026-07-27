// src/components/admin/UserTable.jsx
import React from 'react';
import { User, Shield, Store, MoreVertical, Ban, CheckCircle } from 'lucide-react';

const UserTable = ({ users = [], onRoleChange, onStatusToggle }) => {
  const getRoleBadge = (role) => {
    switch (role) {
      case 'admin':
        return <span className="bg-amber-100 text-amber-800 border border-amber-200 text-[10px] font-bold px-2 py-0.5 rounded-full inline-flex items-center gap-1"><Shield className="w-3 h-3" /> Admin</span>;
      case 'vendor':
        return <span className="bg-purple-100 text-purple-800 border border-purple-200 text-[10px] font-bold px-2 py-0.5 rounded-full inline-flex items-center gap-1"><Store className="w-3 h-3" /> Vendor</span>;
      default:
        return <span className="bg-blue-100 text-blue-800 border border-blue-200 text-[10px] font-bold px-2 py-0.5 rounded-full inline-flex items-center gap-1"><User className="w-3 h-3" /> Customer</span>;
    }
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-xs">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-200 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
              <th className="py-3.5 px-4">User</th>
              <th className="py-3.5 px-4">Role</th>
              <th className="py-3.5 px-4">Joined Date</th>
              <th className="py-3.5 px-4">Status</th>
              <th className="py-3.5 px-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-xs text-slate-700">
            {users.map((u) => (
              <tr key={u._id} className="hover:bg-slate-50/80 transition-colors">
                <td className="py-3 px-4">
                  <div className="font-semibold text-slate-900">{u.name}</div>
                  <div className="text-[11px] text-slate-500">{u.email}</div>
                </td>
                <td className="py-3 px-4">{getRoleBadge(u.role)}</td>
                <td className="py-3 px-4 text-slate-500">
                  {new Date(u.createdAt || Date.now()).toLocaleDateString()}
                </td>
                <td className="py-3 px-4">
                  <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold ${
                    u.isBlocked ? 'bg-red-50 text-red-700 border border-red-200' : 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                  }`}>
                    {u.isBlocked ? 'Blocked' : 'Active'}
                  </span>
                </td>
                <td className="py-3 px-4 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <button
                      onClick={() => onStatusToggle(u._id)}
                      className={`p-1.5 rounded-md text-xs font-semibold transition-colors flex items-center gap-1 ${
                        u.isBlocked
                          ? 'text-emerald-600 hover:bg-emerald-50'
                          : 'text-red-600 hover:bg-red-50'
                      }`}
                      title={u.isBlocked ? 'Unblock User' : 'Block User'}
                    >
                      {u.isBlocked ? <CheckCircle className="w-4 h-4" /> : <Ban className="w-4 h-4" />}
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserTable;