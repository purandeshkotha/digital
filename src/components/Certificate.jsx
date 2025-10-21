import React from 'react';
import { Award, Download, X } from 'lucide-react';

const Certificate = ({ isOpen, onClose, userName, category, completionDate }) => {
  if (!isOpen) return null;

  const handleDownload = () => {
    try {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      if (!ctx) {
        throw new Error('Canvas context not available');
      }
      
      canvas.width = 800;
      canvas.height = 600;

      // Background
      ctx.fillStyle = '#f8fafc';
      ctx.fillRect(0, 0, 800, 600);
      
      // Border
      ctx.strokeStyle = '#3b82f6';
      ctx.lineWidth = 8;
      ctx.strokeRect(20, 20, 760, 560);

      // Title
      ctx.fillStyle = '#1e40af';
      ctx.font = 'bold 48px Arial';
      ctx.textAlign = 'center';
      ctx.fillText('Certificate of Completion', 400, 120);

      // Subtitle
      ctx.fillStyle = '#64748b';
      ctx.font = '24px Arial';
      ctx.fillText('Digital Education Program', 400, 160);

      // Name
      ctx.fillStyle = '#0f172a';
      ctx.font = 'bold 36px Arial';
      ctx.fillText(userName || 'Student', 400, 280);

      // Category
      ctx.fillStyle = '#475569';
      ctx.font = '28px Arial';
      ctx.fillText('has successfully completed', 400, 330);
      ctx.fillStyle = '#059669';
      ctx.font = 'bold 32px Arial';
      ctx.fillText(category || 'Course', 400, 380);

      // Date
      ctx.fillStyle = '#64748b';
      ctx.font = '20px Arial';
      ctx.fillText(`Completed on: ${completionDate || new Date().toLocaleDateString()}`, 400, 480);

      // Download
      const link = document.createElement('a');
      const safeCategoryName = (category || 'course').replace(/\s+/g, '-').toLowerCase();
      link.download = `certificate-${safeCategoryName}.png`;
      link.href = canvas.toDataURL();
      link.click();
    } catch (error) {
      console.error('Error generating certificate:', error);
      alert('Failed to download certificate. Please try again.');
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full p-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900">🎉 Congratulations!</h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-lg">
            <X className="h-6 w-6" />
          </button>
        </div>

        <div className="bg-gradient-to-br from-blue-50 to-indigo-100 border-4 border-blue-200 rounded-xl p-8 text-center">
          <Award className="h-16 w-16 text-blue-600 mx-auto mb-4" />
          <h3 className="text-3xl font-bold text-blue-900 mb-2">Certificate of Completion</h3>
          <p className="text-lg text-gray-600 mb-4">Digital Education Program</p>
          
          <div className="my-8">
            <p className="text-xl text-gray-700 mb-2">This certifies that</p>
            <p className="text-3xl font-bold text-gray-900 mb-2">{userName || 'Student'}</p>
            <p className="text-xl text-gray-700 mb-2">has successfully completed</p>
            <p className="text-2xl font-bold text-green-600">{category}</p>
          </div>

          <p className="text-gray-600">Completed on: {completionDate}</p>
        </div>

        <div className="flex gap-4 mt-6">
          <button
            onClick={handleDownload}
            className="flex-1 bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors font-semibold flex items-center justify-center"
          >
            <Download className="h-5 w-5 mr-2" />
            Download Certificate
          </button>
          <button
            onClick={onClose}
            className="flex-1 bg-gray-200 text-gray-800 py-3 px-6 rounded-lg hover:bg-gray-300 transition-colors font-semibold"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default Certificate;