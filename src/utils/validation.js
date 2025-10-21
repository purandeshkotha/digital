export const validateMobile = (mobile) => {
  if (!mobile || typeof mobile !== 'string') return false;
  const cleaned = mobile.replace(/\D/g, '').trim();
  return cleaned.length === 10 && /^[6-9]\d{9}$/.test(cleaned);
};

export const sanitizeInput = (input) => {
  if (typeof input !== 'string') return '';
  return input.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
              .replace(/[<>"'&]/g, '')
              .replace(/javascript:/gi, '')
              .replace(/on\w+=/gi, '')
              .trim()
              .substring(0, 1000);
};

export const validateOTP = (otp) => {
  if (!otp || typeof otp !== 'string') return false;
  const cleaned = otp.replace(/\D/g, '').trim();
  return cleaned.length === 6 && /^\d{6}$/.test(cleaned);
};

export const validateLessonId = (lessonId) => {
  if (!lessonId || typeof lessonId !== 'string') return false;
  return /^[a-z]+-\d+$/.test(lessonId.trim());
};

export const validateScore = (score) => {
  return typeof score === 'number' && score >= 0 && score <= 100;
};