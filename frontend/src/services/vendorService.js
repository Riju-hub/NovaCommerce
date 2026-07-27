// src/services/vendorService.js
import axiosInstance from './axiosInstance';

const vendorService = {
  getProfile: async () => {
    const response = await axiosInstance.get('/vendor/profile');
    return response.data;
  },

  updateStoreSetup: async (storeData) => {
    const response = await axiosInstance.put('/vendor/store-setup', storeData);
    return response.data;
  },

  getPublicStore: async (vendorId) => {
    const response = await axiosInstance.get(`/vendor/store/${vendorId}`);
    return response.data;
  },

  getVendorStats: async () => {
    const response = await axiosInstance.get('/vendor/stats');
    return response.data;
  },
};

export default vendorService;