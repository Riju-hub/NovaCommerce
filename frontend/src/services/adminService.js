// src/services/adminService.js
import axiosInstance from './axiosInstance';

const adminService = {
  getAllUsers: async () => {
    const response = await axiosInstance.get('/admin/users');
    return response.data;
  },

  toggleUserBlock: async (userId) => {
    const response = await axiosInstance.put(`/admin/users/${userId}/toggle-block`);
    return response.data;
  },

  getPendingVendors: async () => {
    const response = await axiosInstance.get('/admin/vendors/pending');
    return response.data;
  },

  approveVendor: async (vendorId) => {
    const response = await axiosInstance.put(`/admin/vendors/${vendorId}/approve`);
    return response.data;
  },

  rejectVendor: async (vendorId) => {
    const response = await axiosInstance.put(`/admin/vendors/${vendorId}/reject`);
    return response.data;
  },

  getAllOrders: async () => {
    const response = await axiosInstance.get('/admin/orders');
    return response.data;
  },

  getReports: async (type) => {
    const response = await axiosInstance.get(`/admin/reports?type=${type}`);
    return response.data;
  },
};

export default adminService;