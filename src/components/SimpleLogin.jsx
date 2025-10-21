import React, { useState } from 'react';
import { BookOpen } from 'lucide-react';
import { sanitizeInput, validateMobile } from '../utils/security';

const SimpleLogin = ({ onLogin }) => {
  const [name, setName] = useState('');
  const [mobile, setMobile] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    
    const trimmedName = sanitizeInput(name.trim());
    const trimmedMobile = sanitizeInput(mobile.trim());
    
    if (!trimmedName) {
      setError('Please enter a valid name');
      return;
    }
    
    if (!validateMobile(trimmedMobile)) {
      setError('Please enter a valid 10-digit mobile number');
      return;
    }
    
    try {
      localStorage.setItem('userMobile', trimmedMobile);
      localStorage.setItem('offlineMode', 'true');
      onLogin({ name: trimmedName, mobile: trimmedMobile });
    } catch (err) {
      setError('Failed to save user data. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 to-indigo-900 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-8">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <BookOpen className="h-12 w-12 text-blue-600" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900">Digital Education</h1>
          <p className="text-gray-600 mt-2">Enter your details to start learning</p>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Your Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your full name"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Mobile Number
            </label>
            <input
              type="tel"
              value={mobile}
              onChange={(e) => setMobile(e.target.value.replace(/\D/g, '').slice(0, 10))}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter 10-digit mobile number"
              maxLength="10"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors font-semibold"
          >
            Start Learning
          </button>
        </form>
      </div>
    </div>
  );
};

export default SimpleLogin;