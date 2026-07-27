// src/services/paymentService.js
import axiosInstance from './axiosInstance';

const paymentService = {
  createPaymentIntent: async (paymentData) => {
    const response = await axiosInstance.post('/payments/create-intent', paymentData);
    return response.data;
  },

  verifyPayment: async (verificationData) => {
    const response = await axiosInstance.post('/payments/verify', verificationData);
    return response.data;
  },
};

export default paymentService;