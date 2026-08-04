// // src/pages/admin/ManageUsersPage.jsx
// import React, { useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import AdminSidebar from '../../components/admin/AdminSidebar';
// import UserTable from '../../components/admin/UserTable';
// import { fetchAllUsers, toggleUserBlockStatus } from '../../redux/slices/adminSlice';

// const ManageUsersPage = () => {
//   const dispatch = useDispatch();
//   const { users } = useSelector((state) => state.admin);

//   useEffect(() => {
//     dispatch(fetchAllUsers());
//   }, [dispatch]);

//   const handleToggleBlock = (userId) => {
//     dispatch(toggleUserBlockStatus(userId));
//   };

//   return (
//     <div className="flex min-h-[calc(100vh-4rem)] bg-slate-50">
//       <AdminSidebar />

//       <main className="flex-1 p-6 md:p-8 space-y-6 overflow-y-auto">
//         <div>
//           <h1 className="text-2xl font-bold text-slate-900">User Management</h1>
//           <p className="text-xs text-slate-500">
//             View accounts, monitor roles, and handle access permissions.
//           </p>
//         </div>

//         <UserTable users={users} onStatusToggle={handleToggleBlock} />
//       </main>
//     </div>
//   );
// };

// export default ManageUsersPage;


import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Users, Sparkles } from 'lucide-react';
import AdminSidebar from '../../components/admin/AdminSidebar';
import UserTable from '../../components/admin/UserTable';
import { fetchAllUsers, toggleUserBlockStatus } from '../../redux/slices/adminSlice';

const ManageUsersPage = () => {
  const dispatch = useDispatch();
  const { users } = useSelector((state) => state.admin);

  useEffect(() => {
    dispatch(fetchAllUsers());
  }, [dispatch]);

  const handleToggleBlock = (userId) => {
    dispatch(toggleUserBlockStatus(userId));
  };

  return (
    <div className="flex flex-col md:flex-row min-h-[calc(100vh-5rem)] bg-slate-950 text-slate-100 font-sans">
      <AdminSidebar />

      <main className="flex-1 p-6 md:p-8 space-y-6 overflow-y-auto w-full min-w-0">
        <div className="border-b border-slate-800/80 pb-6">
          <div className="flex items-center gap-2 text-amber-400 text-xs font-mono font-bold uppercase tracking-widest mb-1">
            <Users className="w-4 h-4" /> Access Control
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight flex items-center gap-2">
            User Management <Sparkles className="w-5 h-5 text-amber-400" />
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            View accounts, monitor roles, and update platform permissions.
          </p>
        </div>

        <UserTable users={users} onStatusToggle={handleToggleBlock} />
      </main>
    </div>
  );
};

export default ManageUsersPage;