// src/services/paymentService.js
import axiosInstance from './axiosInstance';

const paymentService = {
  createCheckoutSession: async (orderId) => {
    const response = await axiosInstance.post('/payments/create-checkout-session', { orderId });
    return response.data;
  },
};

export default paymentService;