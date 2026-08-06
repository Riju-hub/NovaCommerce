
import axiosInstance from './axiosInstance';

const authService = {
  checkEmail: async (email) => {
    const response = await axiosInstance.post('/auth/check-email', { email });
    return response.data;
  },

  register: async (userData) => {
    const response = await axiosInstance.post('/auth/register', userData);
    return response.data;
  },

  verifyOtp: async (otpData) => {
    const response = await axiosInstance.post('/auth/verify-otp', otpData);
    return response.data;
  },

  resendOtp: async (email) => {
    const response = await axiosInstance.post('/auth/resend-otp', { email });
    return response.data;
  },

  login: async (credentials) => {
    const response = await axiosInstance.post('/auth/login', credentials);
    return response.data;
  },

  forgotPassword: async (email) => {
    const response = await axiosInstance.post('/auth/forgot-password', { email });
    return response.data;
  },

  resetPassword: async (resetToken, password) => {
    const response = await axiosInstance.put(`/auth/reset-password/${resetToken}`, { password });
    return response.data;
  },

  changePassword: async (passwordData) => {
    const response = await axiosInstance.put('/auth/change-password', passwordData);
    return response.data;
  },

  getProfile: async () => {
    const response = await axiosInstance.get('/auth/me');
    return response.data;
  },
};

export default authService;