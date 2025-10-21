import React from 'react';

const ProgressBar = ({ current, total, className = '' }) => {
  const percentage = Math.round((current / total) * 100);
  
  return (
    <div className={`bg-blue-50 border border-blue-200 rounded-lg p-4 ${className}`}>
      <div className="text-blue-800 font-semibold mb-2">
        Progress: {percentage}%
      </div>
      <div className="w-full bg-blue-200 rounded-full h-3">
        <div 
          className="bg-blue-600 h-3 rounded-full transition-all duration-500"
          style={{ width: `${percentage}%` }}
          role="progressbar"
          aria-valuenow={percentage}
        ></div>
      </div>
    </div>
  );
};

export default ProgressBar;