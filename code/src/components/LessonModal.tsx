import React from 'react';
import { X, CheckCircle } from 'lucide-react';
import VideoPlayer from './VideoPlayer';
import { getTranslation } from '../utils/translations';
import { useProgress } from '../context/ProgressContext';

interface LessonModalProps {
  isOpen: boolean;
  onClose: () => void;
  lesson: {
    id: number;
    title: string;
    duration: string;
    completed: boolean;
    videoUrl: string;
    category: string;
  };
  currentLanguage: string;
  onLessonComplete?: () => void;
}

const LessonModal: React.FC<LessonModalProps> = ({ isOpen, onClose, lesson, currentLanguage, onLessonComplete }) => {
  const t = getTranslation(currentLanguage);
  const { markLessonComplete } = useProgress();

  if (!isOpen) return null;

  const handleVideoComplete = () => {
    markLessonComplete(lesson.id, lesson.category);
    onLessonComplete?.();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <div className="flex items-center space-x-3">
            {lesson.completed && <CheckCircle className="h-6 w-6 text-green-500" />}
            <div>
              <h2 className="text-xl font-bold text-gray-900">{lesson.title}</h2>
              <p className="text-sm text-gray-600">{lesson.duration}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="h-6 w-6 text-gray-600" />
          </button>
        </div>

        {/* Video Content */}
        <div className="p-6">
          <VideoPlayer
            videoUrl={lesson.videoUrl}
            title={lesson.title}
            lessonId={lesson.id}
            category={lesson.category}
            onComplete={handleVideoComplete}
          />
          
          {/* Lesson Description */}
          <div className="mt-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">{t.lessonContent}</h3>
            <div className="prose max-w-none">
              <p className="text-gray-700 mb-4">
                {t.lessonDescription}
              </p>
              
              {/* Key Points */}
              <div className="bg-blue-50 p-4 rounded-lg">
                <h4 className="font-semibold text-blue-900 mb-2">{t.keyPoints}</h4>
                <ul className="list-disc list-inside text-blue-800 space-y-1">
                  <li>{t.keyPoint1}</li>
                  <li>{t.keyPoint2}</li>
                  <li>{t.keyPoint3}</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between p-6 border-t bg-gray-50">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
          >
            {t.close}
          </button>
          <button
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            onClick={() => {
              handleVideoComplete();
              onClose();
            }}
          >
            {lesson.completed ? t.reviewComplete : t.markComplete}
          </button>
        </div>
        

      </div>
    </div>
  );
};

export default LessonModal;