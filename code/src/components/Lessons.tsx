import React, { useState } from 'react';
import { ChevronRight, Clock, CheckCircle, Play, Lock, Star } from 'lucide-react';
import { getTranslation } from '../utils/translations';
import LessonModal from './LessonModal';
import { useProgress } from '../context/ProgressContext';
import { Lesson } from '../types';

interface LessonsProps {
  currentLanguage: string;
}

const Lessons: React.FC<LessonsProps> = ({ currentLanguage }) => {
  const [selectedCategory, setSelectedCategory] = useState('computer');
  const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { getLessonProgress } = useProgress();
  const t = getTranslation(currentLanguage);

  const categories = [
    { id: 'computer', name: t.categoryNames[0], icon: '💻', color: 'blue' },
    { id: 'smartphone', name: t.categoryNames[1], icon: '📱', color: 'green' },
    { id: 'internet', name: t.categoryNames[2], icon: '🌐', color: 'purple' },
    { id: 'apps', name: t.categoryNames[3], icon: '📲', color: 'orange' },
  ];

  // Create lessons with translated content and progressive unlocking
  const lessons = Object.keys(t.lessonModules).reduce((acc, category) => {
    acc[category] = t.lessonModules[category].map((lesson, index) => {
      const progress = getLessonProgress(index + 1, category);
      const previousProgress = index > 0 ? getLessonProgress(index, category) : null;
      
      // First lesson is always unlocked, others unlock when previous is completed
      const isLocked = index > 0 && (!previousProgress?.completed);
      
      return {
        id: index + 1,
        title: lesson.title,
        duration: `${lesson.duration} ${t.duration}`,
        completed: progress?.completed || false,
        locked: isLocked,
        rating: 4.8 - (index * 0.1),
        videoUrl: category === 'computer' && currentLanguage === 'te' && index === 0 ? 'https://www.youtube.com/embed/xWcm4ILzecI?autoplay=1&mute=1' : category === 'computer' && currentLanguage === 'te' && index === 1 ? 'https://www.youtube.com/embed/jKjuDO8b-zU?start=13&autoplay=1&mute=1' : `/videos/en/${category}/lesson${index + 1}.mp4`,
        category,
      };
    });
    return acc;
  }, {} as Record<string, Array<{
    id: number;
    title: string;
    duration: string;
    completed: boolean;
    locked: boolean;
    rating: number;
    videoUrl: string;
    category: string;
  }>>);

  const selectedLessons = lessons[selectedCategory as keyof typeof lessons];

  const handleLessonClick = (lesson: Lesson) => {
    if (!lesson.locked) {
      setSelectedLesson(lesson);
      setIsModalOpen(true);
    }
  };

  const handleLessonComplete = () => {
    // Force re-render to update lesson lock states
    setIsModalOpen(false);
  };

  return (
    <section className="min-h-screen relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-900 via-blue-900 to-purple-900">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-20 w-72 h-72 bg-blue-400 rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
          <div className="absolute top-40 right-20 w-72 h-72 bg-purple-400 rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-1000"></div>
          <div className="absolute bottom-20 left-1/2 w-72 h-72 bg-pink-400 rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-2000"></div>
        </div>
      </div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
            {t.lessonsTitle}
          </h2>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto leading-relaxed">
            {t.lessonsSubtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Category Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 p-6 sticky top-24">
              <h3 className="text-xl font-bold text-white mb-6">{t.learningCategories}</h3>
              <div className="space-y-3">
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`w-full flex items-center space-x-4 px-5 py-4 rounded-xl transition-all duration-300 ${
                      selectedCategory === category.id
                        ? 'bg-yellow-500 text-gray-900 shadow-lg shadow-yellow-500/25 scale-105'
                        : 'text-white hover:bg-white/10 hover:scale-102'
                    }`}
                  >
                    <span className="text-2xl">{category.icon}</span>
                    <span className="font-semibold">{category.name}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Lessons Grid */}
          <div className="lg:col-span-3">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {selectedLessons.map((lesson) => (
                <div
                  key={lesson.id}
                  className={`group bg-white/95 backdrop-blur-sm rounded-2xl border border-white/20 shadow-xl hover:shadow-2xl transition-all duration-300 p-8 ${
                    lesson.locked ? 'opacity-60' : 'hover:-translate-y-2'
                  }`}
                >
                  <div className="flex items-start justify-between mb-6">
                    <div className="flex items-center space-x-4">
                      <div className={`p-3 rounded-xl ${
                        lesson.completed ? 'bg-green-500' : lesson.locked ? 'bg-gray-400' : 'bg-blue-500'
                      }`}>
                        {lesson.completed ? (
                          <CheckCircle className="h-8 w-8 text-white" />
                        ) : lesson.locked ? (
                          <Lock className="h-8 w-8 text-white" />
                        ) : (
                          <Play className="h-8 w-8 text-white" />
                        )}
                      </div>
                      <div>
                        <h3 className="font-bold text-gray-900 text-lg mb-2">{lesson.title}</h3>
                        <div className="flex items-center space-x-2 text-gray-600">
                          <Clock className="h-4 w-4" />
                          <span className="font-medium">{lesson.duration}</span>
                        </div>
                      </div>
                    </div>
                    <ChevronRight className="h-6 w-6 text-gray-400 group-hover:text-blue-500 transition-colors" />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div className="flex items-center space-x-1">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className={`h-4 w-4 ${
                            i < Math.floor(lesson.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'
                          }`} />
                        ))}
                      </div>
                      <span className="text-sm font-medium text-gray-600">{lesson.rating}</span>
                    </div>
                    <button
                      disabled={lesson.locked}
                      onClick={() => handleLessonClick(lesson)}
                      className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                        lesson.locked
                          ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                          : lesson.completed
                          ? 'bg-green-500 text-white hover:bg-green-600 shadow-lg shadow-green-500/25'
                          : 'bg-blue-500 text-white hover:bg-blue-600 shadow-lg shadow-blue-500/25 hover:scale-105'
                      }`}
                    >
                      {lesson.locked ? t.locked : lesson.completed ? t.review : t.start}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        <LessonModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          lesson={selectedLesson}
          currentLanguage={currentLanguage}
          onLessonComplete={handleLessonComplete}
        />
      </div>
    </section>
  );
};

export default Lessons;
