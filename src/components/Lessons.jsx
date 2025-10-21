import React, { useState } from 'react';
import { ChevronRight, Clock, CheckCircle, Play, Lock, Star } from 'lucide-react';
import { getTranslation } from '../utils/translations';
import LessonModal from './LessonModal';

const Lessons = ({ currentLanguage }) => {
  const [selectedCategory, setSelectedCategory] = useState('computer');
  const [selectedLesson, setSelectedLesson] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const t = getTranslation(currentLanguage);

  const categories = [
    { id: 'computer', name: 'Computer Basics', icon: '💻', color: 'blue' },
    { id: 'smartphone', name: 'Smartphone Skills', icon: '📱', color: 'green' },
    { id: 'internet', name: 'Internet & Safety', icon: '🌐', color: 'purple' },
    { id: 'apps', name: 'Essential Apps', icon: '📲', color: 'orange' },
    { id: 'appliances', name: 'Home Appliances', icon: '🏠', color: 'red' },
  ];

  const lessons = {
    computer: [
      { id: 1, title: 'Using Mouse and Keyboard', duration: '15 min', completed: false, locked: false, rating: 4.8, category: 'computer' },
      { id: 2, title: 'Understanding Files and Folders', duration: '20 min', completed: false, locked: false, rating: 4.7, category: 'computer' },
      { id: 3, title: 'Getting Started with MS Word', duration: '25 min', completed: false, locked: false, rating: 4.6, category: 'computer' },
      { id: 4, title: 'Internet Browsing Basics', duration: '18 min', completed: false, locked: false, rating: 4.5, category: 'computer' },
      { id: 5, title: 'Email and Communication', duration: '22 min', completed: false, locked: false, rating: 4.4, category: 'computer' },
    ],
    smartphone: [
      { id: 1, title: 'Basic Phone Settings', duration: '12 min', completed: false, locked: false, rating: 4.8, category: 'smartphone' },
      { id: 2, title: 'Using WhatsApp', duration: '18 min', completed: false, locked: false, rating: 4.7, category: 'smartphone' },
      { id: 3, title: 'Camera and Photos', duration: '15 min', completed: false, locked: false, rating: 4.6, category: 'smartphone' },
      { id: 4, title: 'Installing Apps', duration: '20 min', completed: false, locked: false, rating: 4.5, category: 'smartphone' },
      { id: 5, title: 'Mobile Banking', duration: '25 min', completed: false, locked: false, rating: 4.4, category: 'smartphone' },
    ],
    internet: [
      { id: 1, title: 'Using Internet Browser', duration: '20 min', completed: false, locked: false, rating: 4.8, category: 'internet' },
      { id: 2, title: 'Understanding Search Engines', duration: '18 min', completed: false, locked: false, rating: 4.7, category: 'internet' },
      { id: 3, title: 'Creating Email Account', duration: '22 min', completed: false, locked: false, rating: 4.6, category: 'internet' },
      { id: 4, title: 'Online Safety', duration: '20 min', completed: false, locked: false, rating: 4.5, category: 'internet' },
      { id: 5, title: 'Government Services', duration: '25 min', completed: false, locked: false, rating: 4.4, category: 'internet' },
    ],
    apps: [
      { id: 1, title: 'Google Maps Navigation', duration: '15 min', completed: false, locked: false, rating: 4.8, category: 'apps' },
      { id: 2, title: 'Using YouTube', duration: '20 min', completed: false, locked: false, rating: 4.7, category: 'apps' },
      { id: 3, title: 'Online Shopping', duration: '25 min', completed: false, locked: false, rating: 4.6, category: 'apps' },
      { id: 4, title: 'Digital Payments', duration: '18 min', completed: false, locked: false, rating: 4.5, category: 'apps' },
      { id: 5, title: 'Social Media', duration: '22 min', completed: false, locked: false, rating: 4.4, category: 'apps' },
    ],
    appliances: [
      { id: 1, title: 'Washing Machine Operation', duration: '20 min', completed: false, locked: false, rating: 4.8, category: 'appliances' },
      { id: 2, title: 'Microwave Oven Usage', duration: '18 min', completed: false, locked: false, rating: 4.7, category: 'appliances' },
      { id: 3, title: 'Air Conditioner Controls', duration: '15 min', completed: false, locked: false, rating: 4.6, category: 'appliances' },
      { id: 4, title: 'Water Purifier Maintenance', duration: '22 min', completed: false, locked: false, rating: 4.5, category: 'appliances' },
      { id: 5, title: 'Smart TV and Remote', duration: '25 min', completed: false, locked: false, rating: 4.4, category: 'appliances' },
    ]
  };

  const selectedLessons = lessons[selectedCategory] || [];

  const handleLessonClick = (lesson) => {
    try {
      if (lesson && !lesson.locked) {
        setSelectedLesson(lesson);
        setIsModalOpen(true);
      }
    } catch (error) {
      console.error('Error opening lesson:', error);
    }
  };

  return (
    <section className="min-h-screen relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-900 via-blue-900 to-purple-900">
        <div className="absolute inset-0 bg-black/20"></div>
      </div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
            {t.lessonsTitle || 'Interactive Learning Modules'}
          </h2>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto leading-relaxed">
            {t.lessonsSubtitle || 'Structured lessons designed for beginners with hands-on practice'}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-1">
            <div className="bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 p-6 sticky top-24">
              <h3 className="text-xl font-bold text-white mb-6">{t.learningCategories || 'Learning Categories'}</h3>
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

          <div className="lg:col-span-3">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {selectedLessons.length > 0 ? selectedLessons.map((lesson) => (
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
                      {lesson.locked ? (t.locked || 'Locked') : lesson.completed ? (t.review || 'Review') : (t.start || 'Start')}
                    </button>
                  </div>
                </div>
              )) : (
                <div className="col-span-2 text-center py-12">
                  <div className="text-white/60 text-lg">
                    No lessons available for this category yet.
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
        
        <LessonModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          lesson={selectedLesson}
          currentLanguage={currentLanguage}
        />
      </div>
    </section>
  );
};

export default Lessons;