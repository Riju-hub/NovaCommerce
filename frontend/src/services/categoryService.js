// src/services/categoryService.js
import axiosInstance from './axiosInstance';

const categoryService = {
  getCategories: async () => {
    const response = await axiosInstance.get('/categories');
    return response.data;
  },

  getCategoryById: async (id) => {
    const response = await axiosInstance.get(`/categories/${id}`);
    return response.data;
  },

  createCategory: async (categoryData) => {
    const response = await axiosInstance.post('/categories', categoryData);
    return response.data;
  },
};

export default categoryService;