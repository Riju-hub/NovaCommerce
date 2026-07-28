import axiosInstance from './axiosInstance';

const productService = {
  getAllProducts: async (params = {}) => {
    const response = await axiosInstance.get('/products', { params });
    return response.data;
  },

  getProductById: async (id) => {
    const response = await axiosInstance.get(`/products/${id}`);
    return response.data;
  },

  createProduct: async (productData) => {
    const isFormData = productData instanceof FormData;
    const response = await axiosInstance.post('/products', productData, {
      headers: {
        ...(isFormData && { 'Content-Type': 'multipart/form-data' }),
      },
    });
    return response.data;
  },

  updateProduct: async (id, productData) => {
    const isFormData = productData instanceof FormData;
    const response = await axiosInstance.put(`/products/${id}`, productData, {
      headers: {
        ...(isFormData && { 'Content-Type': 'multipart/form-data' }),
      },
    });
    return response.data;
  },

  deleteProduct: async (id) => {
    const response = await axiosInstance.delete(`/products/${id}`);
    return response.data;
  },
};

export default productService;