import React from 'react';
import { X, Award, Download } from 'lucide-react';

interface CertificateModalProps {
  isOpen: boolean;
  onClose: () => void;
  userName: string;
  lessonTitle?: string;
  category?: string;
}

const CertificateModal: React.FC<CertificateModalProps> = ({ isOpen, onClose, userName, lessonTitle, category }) => {
  if (!isOpen) return null;

  const handleDownload = () => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = 1000;
    canvas.height = 700;

    // Create gradient background
    const gradient = ctx.createLinearGradient(0, 0, 1000, 700);
    gradient.addColorStop(0, '#1e3a8a');
    gradient.addColorStop(0.5, '#3730a3');
    gradient.addColorStop(1, '#1e40af');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 1000, 700);

    // Add decorative pattern (optimized)
    ctx.fillStyle = 'rgba(255, 255, 255, 0.05)';
    for (let i = 0; i < 10; i++) {
      for (let j = 0; j < 8; j++) {
        ctx.beginPath();
        ctx.arc(i * 100 + 50, j * 87.5 + 50, 3, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    // Ornate border
    const borderGradient = ctx.createLinearGradient(0, 0, 1000, 0);
    borderGradient.addColorStop(0, '#fbbf24');
    borderGradient.addColorStop(0.5, '#f59e0b');
    borderGradient.addColorStop(1, '#fbbf24');
    ctx.strokeStyle = borderGradient;
    ctx.lineWidth = 12;
    ctx.strokeRect(30, 30, 940, 640);
    
    ctx.lineWidth = 4;
    ctx.strokeRect(50, 50, 900, 600);

    // Award icon background
    ctx.fillStyle = 'rgba(251, 191, 36, 0.2)';
    ctx.beginPath();
    ctx.arc(500, 150, 60, 0, Math.PI * 2);
    ctx.fill();

    // Draw trophy/award icon
    ctx.fillStyle = '#fbbf24';
    ctx.beginPath();
    ctx.arc(500, 140, 25, 0, Math.PI * 2);
    ctx.fill();
    
    // Trophy base
    ctx.fillRect(485, 160, 30, 15);
    ctx.fillRect(490, 175, 20, 8);
    
    // Trophy handles
    ctx.strokeStyle = '#fbbf24';
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.arc(470, 145, 12, -Math.PI/3, Math.PI/3);
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(530, 145, 12, 2*Math.PI/3, 4*Math.PI/3);
    ctx.stroke();

    // Title with shadow
    ctx.shadowColor = 'rgba(0, 0, 0, 0.3)';
    ctx.shadowBlur = 4;
    ctx.shadowOffsetY = 2;
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 42px serif';
    ctx.textAlign = 'center';
    ctx.fillText('🏆 Certificate of Achievement 🏆', 500, 240);

    // Reset shadow
    ctx.shadowColor = 'transparent';
    ctx.shadowBlur = 0;
    ctx.shadowOffsetY = 0;

    // Subtitle
    ctx.font = '26px serif';
    ctx.fillStyle = '#e5e7eb';
    ctx.fillText('Digital Education Platform', 500, 280);

    // Decorative line
    ctx.strokeStyle = '#fbbf24';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(350, 310);
    ctx.lineTo(650, 310);
    ctx.stroke();

    // Name with elegant styling
    ctx.font = 'bold 38px serif';
    ctx.fillStyle = '#fbbf24';
    ctx.fillText(userName, 500, 380);

    // Description with better spacing
    ctx.fillStyle = '#ffffff';
    ctx.font = '22px serif';
    if (lessonTitle) {
      ctx.fillText('has successfully completed the lesson', 500, 420);
      ctx.font = 'italic 24px serif';
      ctx.fillStyle = '#fde68a';
      ctx.fillText(`"${lessonTitle}"`, 500, 450);
      ctx.font = '20px serif';
      ctx.fillStyle = '#ffffff';
      ctx.fillText(`in ${category} category`, 500, 480);
    } else {
      ctx.fillText('has successfully completed all courses in', 500, 420);
      ctx.font = 'bold 24px serif';
      ctx.fillStyle = '#fde68a';
      ctx.fillText('Digital Skills for Rural Communities', 500, 450);
    }

    // Date with style
    ctx.font = '18px serif';
    ctx.fillStyle = '#d1d5db';
    ctx.fillText(`Completed on: ${new Date().toLocaleDateString()}`, 500, 550);

    // Signature line
    ctx.strokeStyle = '#9ca3af';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(700, 600);
    ctx.lineTo(900, 600);
    ctx.stroke();
    ctx.font = '14px serif';
    ctx.fillStyle = '#9ca3af';
    ctx.fillText('Digital Education Authority', 800, 620);

    // Download with error handling
    try {
      const link = document.createElement('a');
      const filename = lessonTitle 
        ? `${userName}_${lessonTitle.replace(/[^a-zA-Z0-9]/g, '_')}_Certificate.png`
        : `${userName}_Digital_Skills_Certificate.png`;
      link.download = filename;
      link.href = canvas.toDataURL();
      link.click();
    } catch (error) {
      console.error('Certificate download failed:', error);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-lg w-full p-6 relative z-10">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900">🎉 Congratulations!</h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-lg">
            <X className="h-6 w-6 text-gray-600" />
          </button>
        </div>

        <div className="text-center mb-8">
          <div className="relative bg-gradient-to-br from-blue-900 via-purple-800 to-blue-800 text-white p-6 rounded-xl mb-4 overflow-hidden">
            {/* Decorative background pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-4 left-4 w-8 h-8 border-2 border-yellow-400 rounded-full"></div>
              <div className="absolute top-8 right-8 w-6 h-6 border-2 border-yellow-400 rounded-full"></div>
              <div className="absolute bottom-4 left-8 w-4 h-4 border-2 border-yellow-400 rounded-full"></div>
              <div className="absolute bottom-8 right-4 w-10 h-10 border-2 border-yellow-400 rounded-full"></div>
            </div>
            
            {/* Golden border */}
            <div className="absolute inset-4 border-4 border-gradient-to-r from-yellow-400 via-yellow-300 to-yellow-400 rounded-xl opacity-30"></div>
            <div className="absolute inset-6 border-2 border-yellow-400 rounded-lg opacity-50"></div>
            
            <div className="relative">
              <div className="bg-gradient-to-r from-yellow-400 to-yellow-300 w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center shadow-lg">
                <Award className="h-10 w-10 text-blue-900" />
              </div>
              
              <h3 className="text-2xl font-bold mb-2 bg-gradient-to-r from-yellow-300 to-yellow-100 bg-clip-text text-transparent">
                🏆 Certificate of Achievement 🏆
              </h3>
              <p className="text-blue-200 mb-4">Digital Education Platform</p>
              
              {/* Decorative line */}
              <div className="w-24 h-1 bg-gradient-to-r from-transparent via-yellow-400 to-transparent mx-auto mb-4"></div>
              
              <div className="bg-gradient-to-r from-white/10 to-white/5 backdrop-blur-sm p-4 rounded-xl border border-white/20">
                <p className="text-lg mb-1">This certifies that</p>
                <p className="text-2xl font-bold text-yellow-300 my-3 drop-shadow-lg">{userName}</p>
                {lessonTitle ? (
                  <>
                    <p className="mb-1">has successfully completed the lesson</p>
                    <p className="font-bold text-lg text-yellow-200 mb-1">"{lessonTitle}"</p>
                    <p className="">in {category} category</p>
                  </>
                ) : (
                  <>
                    <p className="mb-1">has successfully completed all courses in</p>
                    <p className="font-bold text-lg text-yellow-200">Digital Skills for Rural Communities</p>
                  </>
                )}
                <div className="mt-4 pt-3 border-t border-white/20">
                  <p className="text-sm opacity-90">Completed on: {new Date().toLocaleDateString()}</p>
                  <div className="mt-2 flex justify-end">
                    <div className="text-right">
                      <div className="w-24 h-px bg-white/40 mb-1"></div>
                      <p className="text-xs opacity-70">Digital Education Authority</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <p className="text-gray-600 mb-4 text-sm">
            {lessonTitle 
              ? `Congratulations on completing "${lessonTitle}"! Keep up the great work.`
              : 'You have successfully completed all 12 lessons. Well done!'
            }
          </p>
        </div>

        <div className="flex space-x-4 mt-6 bg-white p-4 rounded-lg">
          <button 
            onClick={handleDownload}
            className="flex-1 bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors font-semibold flex items-center justify-center space-x-2 shadow-lg"
          >
            <Download className="h-5 w-5" />
            <span>Download Certificate</span>
          </button>
          <button 
            onClick={onClose}
            className="flex-1 bg-gray-200 text-gray-700 py-3 rounded-lg hover:bg-gray-300 transition-colors font-semibold shadow-lg"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default CertificateModal;