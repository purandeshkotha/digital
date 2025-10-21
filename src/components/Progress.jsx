import React, { useState } from 'react';
import { Trophy, Award, Target, TrendingUp, Calendar, BookOpen } from 'lucide-react';
import { getTranslation } from '../utils/translations';
import { useProgress } from '../context/ProgressContext';
import Certificate from './Certificate';

const Progress = ({ currentLanguage }) => {
  const { getOverallProgress, getCategoryProgress, getStreak, completedLessons, earnedCertificates } = useProgress();
  const t = getTranslation(currentLanguage);
  const [selectedCertificate, setSelectedCertificate] = useState(null);

  const categories = [
    { id: 'computer', name: t.categoryNames?.[0] || 'Computer Basics', icon: '💻', color: 'blue' },
    { id: 'smartphone', name: t.categoryNames?.[1] || 'Smartphone Skills', icon: '📱', color: 'green' },
    { id: 'internet', name: t.categoryNames?.[2] || 'Internet & Safety', icon: '🌐', color: 'purple' },
    { id: 'apps', name: t.categoryNames?.[3] || 'Essential Apps', icon: '📲', color: 'orange' },
    { id: 'appliances', name: t.categoryNames?.[4] || 'Home Appliances', icon: '🏠', color: 'red' },
  ];

  const overallProgress = getOverallProgress();
  const streak = getStreak();
  const completedCount = completedLessons.length;
  const certificatesEarned = completedCount >= 25 ? 1 : 0;

  const achievements = [
    {
      id: 1,
      name: t.achievementNames?.[0] || 'First Steps',
      description: t.achievementDescriptions?.[0] || 'Complete your first lesson',
      icon: '🎯',
      earned: completedCount >= 1,
      progress: Math.min(completedCount, 1)
    },
    {
      id: 2,
      name: t.achievementNames?.[1] || 'Learning Streak',
      description: t.achievementDescriptions?.[1] || 'Complete 5 lessons in a row',
      icon: '🔥',
      earned: completedCount >= 5,
      progress: Math.min(completedCount / 5, 1)
    },
    {
      id: 3,
      name: t.achievementNames?.[2] || 'Computer Expert',
      description: t.achievementDescriptions?.[2] || 'Complete all computer lessons',
      icon: '💻',
      earned: getCategoryProgress('computer') === 100,
      progress: getCategoryProgress('computer') / 100
    },
    {
      id: 4,
      name: t.achievementNames?.[3] || 'Safety Champion',
      description: t.achievementDescriptions?.[3] || 'Master internet safety',
      icon: '🛡️',
      earned: getCategoryProgress('internet') === 100,
      progress: getCategoryProgress('internet') / 100
    },
    {
      id: 5,
      name: 'Home Helper',
      description: 'Complete all appliance lessons',
      icon: '🏠',
      earned: getCategoryProgress('appliances') === 100,
      progress: getCategoryProgress('appliances') / 100
    },
    {
      id: 6,
      name: 'Digital Master',
      description: 'Complete all 25 lessons',
      icon: '🏆',
      earned: completedCount >= 25,
      progress: Math.min(completedCount / 25, 1)
    }
  ];

  return (
    <section className="min-h-screen relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-900 via-blue-900 to-purple-900">
        <div className="absolute inset-0 bg-black/20"></div>
      </div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
            {t.progressTitle || 'Track Your Learning Journey'}
          </h2>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto leading-relaxed">
            {t.progressSubtitle || 'Monitor your progress and celebrate achievements'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-6 shadow-xl">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-blue-500 rounded-xl">
                <TrendingUp className="h-8 w-8 text-white" />
              </div>
              <span className="text-3xl font-bold text-blue-600">{overallProgress}%</span>
            </div>
            <h3 className="font-semibold text-gray-900 mb-1">{t.overallCompletion || 'Overall Completion'}</h3>
            <p className="text-gray-600 text-sm">{t.keepUpWork || 'Keep up the great work!'}</p>
          </div>

          <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-6 shadow-xl">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-green-500 rounded-xl">
                <BookOpen className="h-8 w-8 text-white" />
              </div>
              <span className="text-3xl font-bold text-green-600">{completedCount}</span>
            </div>
            <h3 className="font-semibold text-gray-900 mb-1">{t.lessonsComplete || 'Lessons Complete'}</h3>
            <p className="text-gray-600 text-sm">Out of 25 total lessons</p>
          </div>

          <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-6 shadow-xl">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-orange-500 rounded-xl">
                <Calendar className="h-8 w-8 text-white" />
              </div>
              <span className="text-3xl font-bold text-orange-600">{streak}</span>
            </div>
            <h3 className="font-semibold text-gray-900 mb-1">{t.dayStreak || 'Learning Streak'}</h3>
            <p className="text-gray-600 text-sm">{t.keepGoing || 'Keep it going!'}</p>
          </div>

          <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-6 shadow-xl">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-purple-500 rounded-xl">
                <Award className="h-8 w-8 text-white" />
              </div>
              <span className="text-3xl font-bold text-purple-600">{certificatesEarned}</span>
            </div>
            <h3 className="font-semibold text-gray-900 mb-1">{t.certificates || 'Certificates'}</h3>
            <p className="text-gray-600 text-sm">Earned certificates</p>
            {completedCount >= 25 && (
              <button 
                onClick={() => setSelectedCertificate({
                  category: 'Digital Literacy Master',
                  completedAt: new Date().toLocaleDateString()
                })}
                className="mt-2 text-sm text-blue-600 hover:text-blue-800"
              >
                View Certificate
              </button>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-8 shadow-xl">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">{t.skillProgress || 'Skill Progress'}</h3>
            <div className="space-y-6">
              {categories.map((category) => {
                const progress = getCategoryProgress(category.id);
                return (
                  <div key={category.id}>
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-3">
                        <span className="text-2xl">{category.icon}</span>
                        <span className="font-semibold text-gray-900">{category.name}</span>
                      </div>
                      <span className="font-bold text-gray-600">{progress}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <div 
                        className={`h-3 rounded-full transition-all duration-500 ${
                          category.color === 'blue' ? 'bg-blue-500' :
                          category.color === 'green' ? 'bg-green-500' :
                          category.color === 'purple' ? 'bg-purple-500' :
                          category.color === 'red' ? 'bg-red-500' : 'bg-orange-500'
                        }`}
                        style={{ width: `${progress}%` }}
                      ></div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-8 shadow-xl">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">{t.achievements || 'Achievements'}</h3>
            <div className="space-y-4">
              {achievements.map((achievement) => (
                <div 
                  key={achievement.id}
                  className={`p-4 rounded-xl border-2 transition-all duration-300 ${
                    achievement.earned 
                      ? 'border-green-200 bg-green-50' 
                      : 'border-gray-200 bg-gray-50'
                  }`}
                >
                  <div className="flex items-center space-x-4">
                    <div className={`text-3xl ${achievement.earned ? 'grayscale-0' : 'grayscale'}`}>
                      {achievement.icon}
                    </div>
                    <div className="flex-1">
                      <h4 className={`font-semibold ${
                        achievement.earned ? 'text-green-800' : 'text-gray-700'
                      }`}>
                        {achievement.name}
                      </h4>
                      <p className={`text-sm ${
                        achievement.earned ? 'text-green-600' : 'text-gray-500'
                      }`}>
                        {achievement.description}
                      </p>
                      {!achievement.earned && (
                        <div className="mt-2">
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div 
                              className="bg-blue-500 h-2 rounded-full transition-all duration-500"
                              style={{ width: `${achievement.progress * 100}%` }}
                            ></div>
                          </div>
                        </div>
                      )}
                    </div>
                    {achievement.earned && (
                      <Trophy className="h-6 w-6 text-green-500" />
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className={`mt-12 backdrop-blur-sm rounded-2xl p-8 shadow-xl text-center ${
          completedCount >= 12 ? 'bg-gradient-to-r from-green-400 to-blue-500 text-white' : 'bg-white/95'
        }`}>
          {completedCount >= 25 ? (
            <>
              <Trophy className="h-16 w-16 text-yellow-300 mx-auto mb-4" />
              <h3 className="text-3xl font-bold mb-2">🎉 Congratulations! 🎉</h3>
              <p className="text-xl mb-4">You've completed all 25 lessons!</p>
              <p className="text-lg opacity-90">You're now a digital literacy expert!</p>
            </>
          ) : (
            <>
              <Target className="h-16 w-16 text-blue-500 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-gray-900 mb-2">{t.nextMilestone || 'Next Milestone'}</h3>
              <p className="text-gray-600 mb-4">
                {25 - completedCount} more lessons to complete all categories
              </p>
              <div className="w-full bg-gray-200 rounded-full h-4 max-w-md mx-auto">
                <div 
                  className="bg-gradient-to-r from-blue-500 to-purple-500 h-4 rounded-full transition-all duration-500"
                  style={{ width: `${(completedCount / 25) * 100}%` }}
                ></div>
              </div>
            </>
          )}
        </div>
        
        <Certificate
          isOpen={!!selectedCertificate}
          onClose={() => setSelectedCertificate(null)}
          userName={localStorage.getItem('userName') || 'Student'}
          category={selectedCertificate?.category || ''}
          completionDate={selectedCertificate?.completedAt || ''}
        />
      </div>
    </section>
  );
};

export default Progress;