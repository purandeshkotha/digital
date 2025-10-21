import React, { useState } from 'react';
import { validateMobile, validateOTP, sanitizeInput } from '../utils/validation';

const EnhancedLogin = ({ onLogin }) => {
  const [mobile, setMobile] = useState('');
  const [otp, setOtp] = useState('');
  const [step, setStep] = useState('mobile');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleMobileSubmit = async (e) => {
    e.preventDefault();
    const cleanMobile = sanitizeInput(mobile);
    
    if (!validateMobile(cleanMobile)) {
      setError('Please enter a valid 10-digit mobile number');
      return;
    }

    setLoading(true);
    try {
      // Simulate OTP sending
      await new Promise(resolve => setTimeout(resolve, 1000));
      setStep('otp');
      setError('');
    } catch (err) {
      setError('Failed to send OTP. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleOTPSubmit = async (e) => {
    e.preventDefault();
    const cleanOTP = sanitizeInput(otp);
    
    if (!validateOTP(cleanOTP)) {
      setError('Please enter a valid 6-digit OTP');
      return;
    }

    setLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      onLogin({ mobile: mobile.replace(/\D/g, ''), verified: true });
    } catch (err) {
      setError('Invalid OTP. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-900 to-indigo-900">
      <div className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6">
          {step === 'mobile' ? 'Enter Mobile Number' : 'Enter OTP'}
        </h2>
        
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        {step === 'mobile' ? (
          <form onSubmit={handleMobileSubmit}>
            <input
              type="tel"
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
              placeholder="Enter 10-digit mobile number"
              className="w-full p-3 border rounded-lg mb-4"
              maxLength="10"
              required
            />
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 disabled:opacity-50"
            >
              {loading ? 'Sending OTP...' : 'Send OTP'}
            </button>
          </form>
        ) : (
          <form onSubmit={handleOTPSubmit}>
            <input
              type="text"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              placeholder="Enter 6-digit OTP"
              className="w-full p-3 border rounded-lg mb-4"
              maxLength="6"
              required
            />
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-green-600 text-white p-3 rounded-lg hover:bg-green-700 disabled:opacity-50"
            >
              {loading ? 'Verifying...' : 'Verify OTP'}
            </button>
            <button
              type="button"
              onClick={() => setStep('mobile')}
              className="w-full mt-2 text-blue-600 hover:underline"
            >
              Change Mobile Number
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default EnhancedLogin;