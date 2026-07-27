// src/utils/formatCurrency.js
export const formatCurrency = (amount, currency = 'INR', locale = 'en-IN') => {
  const numericAmount = typeof amount === 'string' ? parseFloat(amount) : amount;

  if (isNaN(numericAmount) || numericAmount === null) {
    return '₹0.00';
  }

  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(numericAmount);
};

export default formatCurrency;