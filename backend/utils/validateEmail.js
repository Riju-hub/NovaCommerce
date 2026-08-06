// import dns from 'dns/promises';
// import axios from 'axios';

// /**
//  * Native DNS check to verify if domain has valid MX records (Free & Unlimited)
//  */
// export const hasValidMXRecord = async (email) => {
//   try {
//     const domain = email.split('@')[1];
//     if (!domain) return false;

//     const mxRecords = await dns.resolveMx(domain);
//     return mxRecords && mxRecords.length > 0;
//   } catch (error) {
//     return false; // Domain doesn't exist or cannot receive email
//   }
// };

// /**
//  * Validates deliverability via Abstract API with automatic MX fallback
//  */
// export const verifyEmailExistence = async (email) => {
//   // Step 1: Fast DNS MX check
//   const mxValid = await hasValidMXRecord(email);
//   if (!mxValid) {
//     return {
//       isValid: false,
//       reason: 'The email domain does not exist or cannot receive emails.',
//     };
//   }

//   // Step 2: Check via Abstract API if API key is set
//   const apiKey = process.env.ABSTRACT_EMAIL_API_KEY;
//   if (!apiKey) {
//     return { isValid: true };
//   }

//   try {
//     const response = await axios.get(
//       `https://emailvalidation.abstractapi.com/v1/?api_key=${apiKey}&email=${email}`,
//       { timeout: 5000 }
//     );

//     const { is_valid_format, is_mx_found, is_smtp_valid, deliverability } = response.data;

//     const isDeliverable =
//       is_valid_format?.value &&
//       is_mx_found?.value &&
//       is_smtp_valid?.value &&
//       deliverability !== 'UNDELIVERABLE';

//     if (!isDeliverable) {
//       return {
//         isValid: false,
//         reason: 'This email address does not exist or is undeliverable.',
//       };
//     }

//     return { isValid: true };
//   } catch (error) {
//     // If rate limited or network fails, fall back gracefully
//     console.warn('Abstract API call failed, falling back to MX check:', error.message);
//     return { isValid: true };
//   }
// };


import dns from 'dns/promises';
import axios from 'axios';

/**
 * Checks if the email domain has valid Mail Exchange (MX) records.
 */
export const hasValidMXRecord = async (email) => {
  try {
    const domain = email.split('@')[1];
    if (!domain) return false;

    const mxRecords = await dns.resolveMx(domain);
    return mxRecords && mxRecords.length > 0;
  } catch (error) {
    return false;
  }
};

/**
 * Validates real email existence using Abstract API with a DNS MX fallback.
 */
export const verifyEmailExistence = async (email) => {
  // Step 1: Rapid DNS lookup
  const mxValid = await hasValidMXRecord(email);
  if (!mxValid) {
    return {
      isValid: false,
      reason: 'The email domain does not exist or cannot receive emails.',
    };
  }

  // Step 2: Deep check via Abstract API
  const apiKey = process.env.ABSTRACT_EMAIL_API_KEY;
  if (!apiKey) {
    return { isValid: true };
  }

  try {
    const response = await axios.get(
      `https://emailvalidation.abstractapi.com/v1/?api_key=${apiKey}&email=${email}`,
      { timeout: 5000 }
    );

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
    console.warn('Abstract API call skipped/failed, falling back to DNS check:', error.message);
    return { isValid: true };
  }
};