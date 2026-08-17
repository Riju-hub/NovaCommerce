
import dns from 'dns/promises';
import axios from 'axios';

export const hasValidMXRecord = async (email) => {
  try {
    const domain = email?.split('@')[1];
    if (!domain) return false;

    const mxRecords = await dns.resolveMx(domain);
    return Array.isArray(mxRecords) && mxRecords.length > 0;
  } catch (error) {
    // Fail open on DNS lookup error so local development works smoothly
    return true; 
  }
};

export const verifyEmailExistence = async (email) => {
  try {
    const mxValid = await hasValidMXRecord(email);
    if (!mxValid) {
      return {
        isValid: false,
        reason: 'The email domain does not exist or cannot receive emails.',
      };
    }

    const apiKey = process.env.ABSTRACT_EMAIL_API_KEY;
    if (!apiKey) {
      return { isValid: true };
    }

    const response = await axios.get(
      `https://emailvalidation.abstractapi.com/v1/?api_key=${apiKey}&email=${encodeURIComponent(email)}`,
      { timeout: 3000 }
    );

    if (!response || !response.data) {
      return { isValid: true };
    }

    const { is_valid_format, is_mx_found, is_smtp_valid, deliverability } = response.data;

    const isDeliverable =
      is_valid_format?.value &&
      is_mx_found?.value &&
      is_smtp_valid?.value &&
      deliverability !== 'UNDELIVERABLE';

    if (!isDeliverable) {
      return {
        isValid: false,
        reason: 'This email address does not exist or is undeliverable.',
      };
    }

    return { isValid: true };
  } catch (error) {
    console.warn('Email validation fallback:', error.message);
    return { isValid: true };
  }
};