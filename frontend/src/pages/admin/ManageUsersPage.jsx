// src/pages/admin/ManageUsersPage.jsx
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
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
    <div className="flex min-h-[calc(100vh-4rem)] bg-slate-50">
      <AdminSidebar />

      <main className="flex-1 p-6 md:p-8 space-y-6 overflow-y-auto">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">User Management</h1>
          <p className="text-xs text-slate-500">
            View accounts, monitor roles, and handle access permissions.
          </p>
        </div>

        <UserTable users={users} onStatusToggle={handleToggleBlock} />
      </main>
    </div>
  );
};

export default ManageUsersPage;