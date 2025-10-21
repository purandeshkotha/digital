import React, { useState, useMemo, useCallback } from 'react';
import { X, CheckCircle, Play, FileText } from 'lucide-react';
import { getTranslation } from '../utils/translations';
import { useProgress } from '../context/ProgressContext';

const LessonModal = ({ isOpen, onClose, lesson, currentLanguage }) => {
  const [isCompleted, setIsCompleted] = useState(false);
  const [activeTab, setActiveTab] = useState('video');
  const { markLessonComplete } = useProgress();
  
  const t = useMemo(() => getTranslation(currentLanguage), [currentLanguage]);
  // Remove broken videoUrl logic

  const handleComplete = useCallback(() => {
    try {
      if (lesson && lesson.id && lesson.category) {
        markLessonComplete(lesson.id, lesson.category);
        setIsCompleted(true);
      }
    } catch (error) {
      console.error('Error completing lesson:', error);
    }
  }, [lesson?.id, lesson?.category, markLessonComplete]);

  const handleClose = useCallback(() => {
    try {
      setIsCompleted(false);
      onClose();
    } catch (error) {
      console.error('Error closing modal:', error);
    }
  }, [onClose]);

  if (!isOpen || !lesson) return null;

  // Get video URL directly from lesson data
  const getDirectVideoUrl = (category, id) => {
    const videoMap = {
      computer: {
        1: "https://drive.google.com/file/d/12X2tMJsZsKfsBbHWEb4pA8UEIlOrAsBG/preview",
        2: "https://drive.google.com/file/d/1_6ak-dnSv19WBxf3SHLHo9hI9SsoR7aR/preview",
        3: "https://drive.google.com/file/d/16hE8743tBnWxnoMwnjhFQwcb8QhQl2o8/preview",
        4: "https://drive.google.com/file/d/160vOWmNaUyEfCh9UXB4Tqdo2GaU07uaG/preview",
        5: "https://drive.google.com/file/d/177dx19YWIZxQ9LApmwZbkNLYXlbmiZiz/preview"
      },
      smartphone: {
        1: "https://drive.google.com/file/d/1AxyYDUT4my4HltD1VwnNIBmOi551vgaa/preview",
        2: "https://drive.google.com/file/d/1loYqiXMt5lDjOwWJ2jJ6LLYlaQK6KBJQ/preview",
        3: "https://drive.google.com/file/d/18uDjdJmQ47tbq0ujl7ZKsWrS9J6FJtvb/preview",
        4: "https://drive.google.com/file/d/1AxyYDUT4my4HltD1VwnNIBmOi551vgaa/preview",
        5: "https://drive.google.com/file/d/1loYqiXMt5lDjOwWJ2jJ6LLYlaQK6KBJQ/preview"
      },
      internet: {
        1: "https://drive.google.com/file/d/1U8fpdWy2l_2VMxhYcGKpYvXV_IZnF9qs/preview",
        2: "https://drive.google.com/file/d/14PDunr4Gy2B9KqxImoI2uqUJC3-19wFG/preview",
        3: "https://drive.google.com/file/d/1SL1CckJtXugKjUvGkEvsFdxYYGbuCrPG/preview",
        4: "https://drive.google.com/file/d/1U8fpdWy2l_2VMxhYcGKpYvXV_IZnF9qs/preview",
        5: "https://drive.google.com/file/d/14PDunr4Gy2B9KqxImoI2uqUJC3-19wFG/preview"
      },
      apps: {
        1: "https://drive.google.com/file/d/1fPgKkcrS3ZQ1S8ltG_Bsq7xTnXARaBH0/preview",
        2: "https://drive.google.com/file/d/1HD1IkFOLZpAH7n8weVZGcS15A5wS5o0a/preview",
        3: "https://drive.google.com/file/d/1lZIlk64amxMMGgsPCGuKrInek5VSQUhM/preview",
        4: "https://drive.google.com/file/d/1jnQcveb7D-35gyyqs8yLXDKCVin9rjKu/preview",
        5: "https://drive.google.com/file/d/1fPgKkcrS3ZQ1S8ltG_Bsq7xTnXARaBH0/preview"
      },
      appliances: {
        1: "https://drive.google.com/file/d/12X2tMJsZsKfsBbHWEb4pA8UEIlOrAsBG/preview",
        2: "https://drive.google.com/file/d/1_6ak-dnSv19WBxf3SHLHo9hI9SsoR7aR/preview",
        3: "https://drive.google.com/file/d/16hE8743tBnWxnoMwnjhFQwcb8QhQl2o8/preview",
        4: "https://drive.google.com/file/d/1AxyYDUT4my4HltD1VwnNIBmOi551vgaa/preview",
        5: "https://drive.google.com/file/d/1loYqiXMt5lDjOwWJ2jJ6LLYlaQK6KBJQ/preview"
      }
    };
    return videoMap[category]?.[id] || null;
  };
  
  const url = getDirectVideoUrl(lesson?.category, lesson?.id);
  console.log('Video URL:', url, 'for lesson:', lesson?.category, lesson?.id);

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
        <div className="flex items-center justify-between p-6 border-b">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">{lesson.title}</h2>
            <p className="text-gray-600 mt-1">{lesson.duration}</p>
          </div>
          <button
            onClick={handleClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="h-6 w-6" />
          </button>
        </div>
        
        <div className="p-6 max-h-[calc(90vh-120px)] overflow-y-auto">
          {/* Tab Navigation */}
          <div className="flex border-b border-gray-200 mb-6">
            <button
              onClick={() => setActiveTab('video')}
              className={`px-4 py-2 font-medium text-sm border-b-2 transition-colors ${
                activeTab === 'video' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500'
              }`}
            >
              <Play className="h-4 w-4 mr-1 inline" />Video
            </button>

            <button
              onClick={() => setActiveTab('content')}
              className={`px-4 py-2 font-medium text-sm border-b-2 transition-colors ${
                activeTab === 'content' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500'
              }`}
            >
              <FileText className="h-4 w-4 mr-1 inline" />Content
            </button>

          </div>

          {/* Tab Content */}
          {activeTab === 'video' && (
            <div className="space-y-6">
              <div className="aspect-video bg-gray-100 rounded-lg overflow-hidden">
                {url ? (
                  <iframe
                    src={url}
                    width="100%"
                    height="100%"
                    frameBorder="0"
                    allow="autoplay"
                    allowFullScreen
                    title="Lesson Video"
                  ></iframe>
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gray-200">
                    <div className="text-center">
                      <Play className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                      <p className="text-gray-600">Video not available</p>
                      <p className="text-sm text-gray-500 mt-2">{lesson?.category} - Lesson {lesson?.id}</p>
                    </div>
                  </div>
                )}
              </div>
              
              {!lesson.completed && !isCompleted && (
                <button
                  onClick={handleComplete}
                  className="w-full bg-green-500 text-white py-3 px-6 rounded-lg hover:bg-green-600 transition-colors font-semibold flex items-center justify-center"
                >
                  <CheckCircle className="h-5 w-5 mr-2" />
                  Mark as Complete
                </button>
              )}
              
              {(lesson.completed || isCompleted) && (
                <div className="w-full bg-green-100 text-green-800 py-3 px-6 rounded-lg font-semibold flex items-center justify-center">
                  <CheckCircle className="h-5 w-5 mr-2" />
                  Lesson Completed!
                </div>
              )}
            </div>
          )}



          {activeTab === 'content' && (
            <div className="space-y-6">
              {(() => {
                const getContent = (category, id) => {
                  const content = {
                    computer: {
                      1: {
                        objectives: ['Learn proper mouse clicking and dragging', 'Master keyboard typing with correct finger placement', 'Navigate desktop and taskbar confidently'],
                        steps: ['Hold mouse with dominant hand', 'Practice left-click, right-click, double-click', 'Place fingers on ASDF and JKL; keys', 'Type simple words slowly', 'Use Shift for capital letters'],
                        tips: ['Start slowly and build speed', 'Keep wrists straight while typing', 'Use mouse pad for smooth movement']
                      },
                      2: {
                        objectives: ['Understand file vs folder concept', 'Create and organize folders', 'Move and copy files safely'],
                        steps: ['Open File Explorer from taskbar', 'Navigate to Documents folder', 'Right-click → New Folder', 'Name folder descriptively', 'Drag files to move them'],
                        tips: ['Use descriptive folder names', 'Keep desktop clean', 'Regular cleanup prevents clutter']
                      }
                    },
                    smartphone: {
                      1: {
                        objectives: ['Navigate phone settings menu', 'Adjust display brightness and sounds', 'Connect to Wi-Fi networks'],
                        steps: ['Find Settings app (gear icon)', 'Tap Display for brightness', 'Go to Sounds for volume', 'Select Wi-Fi to connect', 'Choose network and enter password'],
                        tips: ['Lower brightness saves battery', 'Use Wi-Fi to save mobile data', 'Keep phone updated for security']
                      },
                      2: {
                        objectives: ['Install and setup WhatsApp', 'Send messages and photos', 'Make voice and video calls'],
                        steps: ['Download WhatsApp from app store', 'Enter phone number for verification', 'Add profile photo and name', 'Import contacts', 'Send first message'],
                        tips: ['Verify contacts before messaging', 'Use voice messages for convenience', 'Backup chats regularly']
                      }
                    },
                    appliances: {
                      1: {
                        objectives: ['Understand washing machine controls', 'Select appropriate wash cycles', 'Load clothes properly'],
                        steps: ['Sort clothes by color and fabric', 'Load machine without overpacking', 'Add detergent to dispenser', 'Select wash cycle', 'Set water temperature', 'Press start'],
                        tips: ['Check pockets before washing', 'Use cold water for colors', 'Clean lint filter regularly']
                      },
                      2: {
                        objectives: ['Use microwave safely', 'Set time and power levels', 'Heat different types of food'],
                        steps: ['Place food in microwave-safe container', 'Set power level (50-100%)', 'Enter cooking time', 'Press start', 'Check food halfway through'],
                        tips: ['Never use metal containers', 'Cover food to prevent splattering', 'Let food rest after heating']
                      }
                    }
                  };
                  return content[category]?.[id] || {
                    objectives: ['Complete this lesson successfully'],
                    steps: ['Watch the video', 'Practice the skills', 'Take the quiz'],
                    tips: ['Practice regularly', 'Ask for help when needed']
                  };
                };
                
                const content = getContent(lesson.category, lesson.id);
                
                return (
                  <>
                    <div className="bg-blue-50 rounded-lg p-6">
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">Learning Objectives</h3>
                      <ul className="space-y-2 text-gray-700">
                        {content.objectives.map((obj, i) => <li key={i}>• {obj}</li>)}
                      </ul>
                    </div>
                    
                    <div className="bg-yellow-50 rounded-lg p-6">
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">Step-by-Step Guide</h3>
                      <ol className="space-y-2 text-gray-700">
                        {content.steps.map((step, i) => <li key={i}>{i+1}. {step}</li>)}
                      </ol>
                    </div>
                    
                    <div className="bg-green-50 rounded-lg p-6">
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">Important Tips</h3>
                      <ul className="space-y-2 text-gray-700">
                        {content.tips.map((tip, i) => <li key={i}>💡 {tip}</li>)}
                      </ul>
                    </div>
                  </>
                );
              })()}
            </div>
          )}


        </div>
      </div>
    </div>
  );
};

export default LessonModal;