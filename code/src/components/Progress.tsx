import React, { useState, useEffect } from 'react';
import { Trophy, Target, Calendar, Award, CheckCircle } from 'lucide-react';
import { getTranslation } from '../utils/translations';
import { useProgress } from '../context/ProgressContext';
import CertificateModal from './CertificateModal';

interface ProgressProps {
  currentLanguage: string;
}

const Progress: React.FC<ProgressProps> = ({ currentLanguage }) => {
  const [showCertificate, setShowCertificate] = useState(false);
  const [hasShownCertificate, setHasShownCertificate] = useState(false);
  const t = getTranslation(currentLanguage);
  const { getOverallProgress, getCategoryProgress, getStreak, completedLessons } = useProgress();

  const completedCount = completedLessons.filter(l => l.completed).length;
  const totalLessons = 12;
  const nextMilestoneTarget = Math.ceil((completedCount + 1) / 4) * 4;
  const lessonsToNextMilestone = nextMilestoneTarget - completedCount;
  const milestoneProgress = ((completedCount % 4) / 4) * 100;
  const isFullyCompleted = completedCount >= totalLessons;
  
  const progressData = {
    overallProgress: Math.round((completedCount / totalLessons) * 100),
    completedLessons: completedCount,
    totalLessons,
    streak: getStreak(),
    certificates: completedCount >= 12 ? 1 : Math.floor(completedCount / 4),
    nextMilestone: isFullyCompleted ? 'Course Completed!' : `Complete ${nextMilestoneTarget} lessons`,
    lessonsToNextMilestone: isFullyCompleted ? 0 : lessonsToNextMilestone,
    milestoneProgress: isFullyCompleted ? 100 : milestoneProgress
  };

  useEffect(() => {
    if (isFullyCompleted && !hasShownCertificate) {
      setShowCertificate(true);
      setHasShownCertificate(true);
      localStorage.setItem('certificateShown', 'true');
    }
  }, [isFullyCompleted, hasShownCertificate]);

  useEffect(() => {
    const shown = localStorage.getItem('certificateShown');
    if (shown) {
      setHasShownCertificate(true);
    }
  }, []);

  const skillProgress = t.categoryNames.map((name, index) => {
    const categoryId = ['computer', 'smartphone', 'internet', 'apps'][index];
    const categoryLessons = completedLessons.filter(l => l.category === categoryId);
    const completedInCategory = categoryLessons.filter(l => l.completed).length;
    const progress = Math.round((completedInCategory / 3) * 100);
    
    return {
      skill: name,
      progress,
      color: ['blue', 'green', 'purple', 'orange'][index],
      completed: completedInCategory,
      total: 3
    };
  });

  const achievements = t.achievementNames.map((name, index) => {
    let earned = false;
    switch(index) {
      case 0: // First Steps
        earned = completedCount > 0;
        break;
      case 1: // Week Warrior
        earned = progressData.streak >= 7;
        break;
      case 2: // Computer Expert
        earned = skillProgress[0]?.progress === 100;
        break;
      case 3: // Safety Champion
        earned = skillProgress[2]?.progress === 100;
        break;
    }
    return {
      id: index + 1,
      name,
      description: t.achievementDescriptions[index],
      earned,
      icon: ['🎯', '🔥', '💻', '🛡️'][index],
    };
  });

  return (
    <section className="min-h-screen relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-10 left-10 w-96 h-96 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full mix-blend-multiply filter blur-3xl animate-pulse"></div>
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full mix-blend-multiply filter blur-3xl animate-pulse delay-1000"></div>
        </div>
      </div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
            {t.progressTitle}
          </h2>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto leading-relaxed">
            {t.progressSubtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Overall Progress */}
          <div className="lg:col-span-2">
            <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl p-8 text-white mb-8">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-2xl font-bold mb-2">{t.learningProgress}</h3>
                  <p className="text-blue-100">{t.keepUpWork}</p>
                </div>
                <div className="text-right">
                  <div className="text-3xl font-bold">{progressData.overallProgress}%</div>
                  <div className="text-sm text-blue-100">{t.overallCompletion}</div>
                </div>
              </div>
              
              <div className="bg-white bg-opacity-20 rounded-full h-3 mb-6">
                <div 
                  className="bg-white rounded-full h-3 transition-all duration-300"
                  style={{ width: `${progressData.overallProgress}%` }}
                ></div>
              </div>

              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold">{progressData.completedLessons}/{progressData.totalLessons}</div>
                  <div className="text-sm text-blue-100">{t.lessonsComplete}</div>
                </div>
                <div>
                  <div className="text-2xl font-bold">{progressData.streak}</div>
                  <div className="text-sm text-blue-100">{t.dayStreak}</div>
                </div>
                <div>
                  <div className="text-2xl font-bold">{progressData.certificates}</div>
                  <div className="text-sm text-blue-100">{t.certificates}</div>
                </div>
              </div>
            </div>

            {/* Skill Progress */}
            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-8">{t.skillProgress}</h3>
              <div className="space-y-8">
                {skillProgress.map((skill, index) => (
                  <div key={index} className="bg-gray-50 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <span className="font-bold text-gray-900 text-lg">{skill.skill}</span>
                      <div className="text-right">
                        <span className="text-lg font-bold text-gray-800 bg-gray-200 px-3 py-1 rounded-full">{skill.progress}%</span>
                        <div className="text-xs text-gray-600 mt-1">{skill.completed}/{skill.total} lessons</div>
                      </div>
                    </div>
                    <div className="bg-gray-300 rounded-full h-4 shadow-inner">
                      <div 
                        className={`rounded-full h-4 transition-all duration-500 shadow-sm ${
                          skill.color === 'blue' ? 'bg-blue-500' :
                          skill.color === 'green' ? 'bg-green-500' :
                          skill.color === 'purple' ? 'bg-purple-500' :
                          'bg-orange-500'
                        }`}
                        style={{ width: `${skill.progress}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <div className={`${isFullyCompleted ? 'bg-gradient-to-br from-green-100 to-emerald-100 border-green-300' : 'bg-gradient-to-br from-orange-50 to-red-50 border-orange-200'} rounded-2xl p-6 border-2 shadow-lg`}>
              <div className="flex items-center space-x-3 mb-4">
                {isFullyCompleted ? (
                  <Trophy className="h-10 w-10 text-green-600" />
                ) : (
                  <Target className="h-8 w-8 text-orange-600" />
                )}
                <div>
                  <h3 className="font-bold text-gray-900 text-lg">{isFullyCompleted ? 'Course Completed!' : t.nextMilestone}</h3>
                  <p className="text-sm text-gray-700 font-medium">{isFullyCompleted ? 'Congratulations!' : t.almostThere}</p>
                </div>
              </div>
              <p className={`${isFullyCompleted ? 'text-green-800' : 'text-orange-700'} font-bold mb-4 text-lg`}>{progressData.nextMilestone}</p>
              <div className={`${isFullyCompleted ? 'bg-green-200' : 'bg-orange-200'} rounded-full h-4 mb-3 shadow-inner`}>
                <div 
                  className={`${isFullyCompleted ? 'bg-green-600' : 'bg-orange-500'} rounded-full h-4 transition-all duration-500`}
                  style={{ width: `${progressData.milestoneProgress}%` }}
                ></div>
              </div>
              <p className="text-sm text-gray-700 font-medium mb-4">
                {isFullyCompleted ? '🎉 All lessons completed!' : `${progressData.lessonsToNextMilestone} ${t.moreLessons}`}
              </p>
              {isFullyCompleted && (
                <button 
                  onClick={() => setShowCertificate(true)}
                  className="w-full bg-gradient-to-r from-yellow-500 to-yellow-600 text-white py-3 rounded-xl hover:from-yellow-600 hover:to-yellow-700 transition-all duration-300 text-lg font-bold shadow-lg transform hover:scale-105 border-2 border-yellow-400"
                >
                  🏆 View Certificate
                </button>
              )}
            </div>

            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6">
              <div className="flex items-center space-x-3 mb-6">
                <Calendar className="h-10 w-10 text-green-600" />
                <div>
                  <h3 className="font-bold text-gray-900 text-lg">{t.learningStreak}</h3>
                  <p className="text-sm text-gray-700 font-medium">{t.keepGoing}</p>
                </div>
              </div>
              <div className="text-center bg-green-50 rounded-lg p-4">
                <div className="text-4xl font-bold text-green-600 mb-3">
                  {progressData.streak} {t.days}
                </div>
                <div className="flex justify-center space-x-2">
                  {[...Array(7)].map((_, i) => (
                    <div
                      key={i}
                      className={`w-4 h-4 rounded-full border-2 ${
                        i < progressData.streak ? 'bg-green-500 border-green-600 shadow-sm' : 'bg-gray-200 border-gray-300'
                      }`}
                    ></div>
                  ))}
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6">
              <div className="flex items-center space-x-3 mb-6">
                <Trophy className="h-10 w-10 text-yellow-600" />
                <h3 className="font-bold text-gray-900 text-lg">{t.achievements}</h3>
              </div>
              <div className="space-y-4">
                {achievements.map((achievement) => (
                  <div
                    key={achievement.id}
                    className={`flex items-center space-x-4 p-4 rounded-xl border-2 transition-all duration-300 ${
                      achievement.earned
                        ? 'bg-gradient-to-r from-yellow-50 to-orange-50 border-yellow-300 shadow-md transform scale-105'
                        : 'bg-gray-50 border-gray-200 opacity-70'
                    }`}
                  >
                    <span className="text-3xl">{achievement.icon}</span>
                    <div className="flex-1">
                      <h4 className="font-bold text-gray-900 text-base">{achievement.name}</h4>
                      <p className="text-sm text-gray-700 font-medium">{achievement.description}</p>
                    </div>
                    {achievement.earned ? (
                      <CheckCircle className="h-7 w-7 text-green-600 ml-auto" />
                    ) : (
                      <div className="w-7 h-7 border-2 border-gray-300 rounded-full ml-auto"></div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        
        <CertificateModal
          isOpen={showCertificate}
          onClose={() => setShowCertificate(false)}
          userName={localStorage.getItem('userName') || 'Digital Learner'}
        />
      </div>
    </section>
  );
};

export default Progress;