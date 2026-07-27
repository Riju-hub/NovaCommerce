// src/utils/constants.js
export const APP_NAME = import.meta.env.VITE_APP_NAME || 'NexCart Multi-Vendor';

export const CURRENCY = {
  CODE: 'INR',
  SYMBOL: '₹',
  LOCALE: 'en-IN',
};

export const USER_ROLES = {
  CUSTOMER: 'customer',
  VENDOR: 'vendor',
  ADMIN: 'admin',
};

export const ORDER_STATUS = {
  PENDING: 'pending',
  PROCESSING: 'processing',
  SHIPPED: 'shipped',
  DELIVERED: 'delivered',
  CANCELLED: 'cancelled',
};

export const PRODUCT_CATEGORIES = [
  'Electronics',
  'Fashion',
  'Home & Kitchen',
  'Fitness',
  'Beauty & Personal Care',
  'Books & Stationery',
  'Toys & Games',
];

export const DEFAULT_IMAGES = {
  PRODUCT_PLACEHOLDER: 'https://via.placeholder.com/300x300?text=No+Product+Image',
  AVATAR_PLACEHOLDER: 'https://via.placeholder.com/150x150?text=User',
  STORE_BANNER_PLACEHOLDER: 'https://via.placeholder.com/1200x300?text=Vendor+Storefront',
};

export const PAGINATION = {
  DEFAULT_PAGE: 1,
  DEFAULT_LIMIT: 12,
};