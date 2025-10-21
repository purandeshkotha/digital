import React from 'react';
import { CheckCircle, RotateCcw } from 'lucide-react';

const CompletionCard = ({ title, message, onReset }) => {
  return (
    <div className="bg-green-100 border border-green-200 rounded-lg p-6 text-center">
      <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-4" />
      <div className="text-green-800 font-semibold text-lg mb-2">{title}</div>
      <div className="text-green-600 mb-4">{message}</div>
      {onReset && (
        <button
          onClick={onReset}
          className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors"
        >
          <RotateCcw className="h-4 w-4 mr-2 inline" />
          Try Again
        </button>
      )}
    </div>
  );
};

export default CompletionCard;