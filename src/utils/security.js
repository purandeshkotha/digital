export const sanitizeInput = (input) => {
  try {
    if (typeof input !== 'string') return input;
    return input.replace(/<[^>]*>/g, '').trim();
  } catch (error) {
    console.error('Input sanitization error:', error);
    return '';
  }
};

export const validateMobile = (mobile) => {
  return /^\d{10}$/.test(mobile);
};

export const validateEmail = (email) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

export const isValidPhoneNumber = (phone) => {
  return /^\d{10}$/.test(phone);
};

export const generateCSRFToken = () => {
  try {
    if (typeof crypto !== 'undefined' && crypto.getRandomValues) {
      const array = new Uint8Array(32);
      crypto.getRandomValues(array);
      return Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('');
    }
    // Fallback for older browsers
    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15) + Date.now().toString(36);
  } catch (error) {
    console.error('CSRF token generation error:', error);
    return Date.now().toString(36) + Math.random().toString(36).substring(2);
  }
};