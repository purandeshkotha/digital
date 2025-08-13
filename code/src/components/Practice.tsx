import React, { useState } from 'react';
import { CheckCircle, Play, Lock, Award, Clock, Target } from 'lucide-react';
import { getTranslation } from '../utils/translations';
import { useProgress } from '../context/ProgressContext';
import { getColorClasses } from '../utils/colorMapping';
import { Quiz } from '../types';
import QuizModal from './QuizModal';

interface PracticeProps {
  currentLanguage: string;
}

const Practice: React.FC<PracticeProps> = ({ currentLanguage }) => {
  const [selectedQuiz, setSelectedQuiz] = useState<Quiz | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { getCategoryProgress, getLessonProgress, getQuizScore } = useProgress();
  const t = getTranslation(currentLanguage);

  const categories = [
    { id: 'computer', name: t.categoryNames[0], icon: '💻', color: 'blue' },
    { id: 'smartphone', name: t.categoryNames[1], icon: '📱', color: 'green' },
    { id: 'internet', name: t.categoryNames[2], icon: '🌐', color: 'purple' },
    { id: 'apps', name: t.categoryNames[3], icon: '📲', color: 'orange' },
  ];

  // Create quizzes for each lesson
  const quizzes = categories.flatMap(category => {
    return t.lessonModules[category.id].map((lesson, index) => {
      const lessonProgress = getLessonProgress(index + 1, category.id);
      const isUnlocked = lessonProgress?.completed || false;
      
      const quizId = `${category.id}-${index + 1}`;
      const quizScore = getQuizScore(quizId);
      
      return {
        id: quizId,
        categoryId: category.id,
        lessonId: index + 1,
        title: `${lesson.title} Quiz`,
        description: `Test your knowledge of ${lesson.title.toLowerCase()}`,
        icon: category.icon,
        color: category.color,
        questions: 5,
        duration: 5,
        unlocked: isUnlocked,
        completed: quizScore !== null,
        score: quizScore
      };
    });
  });

  const handleQuizClick = (quiz: Quiz) => {
    if (quiz.unlocked) {
      setSelectedQuiz(quiz);
      setIsModalOpen(true);
    }
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
            {t.practice}
          </h2>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto leading-relaxed">
            Test your knowledge with interactive quizzes. Complete lessons to unlock their quizzes.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {quizzes.map((quiz) => (
            <div
              key={quiz.id}
              className={`group bg-white/95 backdrop-blur-sm rounded-2xl border border-white/20 shadow-xl hover:shadow-2xl transition-all duration-300 p-8 ${
                quiz.unlocked ? 'hover:-translate-y-2 cursor-pointer' : 'opacity-60'
              }`}
              onClick={() => handleQuizClick(quiz)}
            >
              <div className="flex items-start justify-between mb-6">
                <div className="flex items-center space-x-4">
                  <div className={`p-3 rounded-xl ${
                    quiz.unlocked ? getColorClasses(quiz.color).bg : 'bg-gray-400'
                  }`}>
                    {quiz.unlocked ? (
                      <span className="text-3xl">{quiz.icon}</span>
                    ) : (
                      <Lock className="h-8 w-8 text-white" />
                    )}
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 text-lg mb-2">{quiz.title}</h3>
                    <p className="text-gray-600 text-sm">{quiz.description}</p>
                  </div>
                </div>
                {quiz.completed && (
                  <CheckCircle className="h-8 w-8 text-green-500" />
                )}
              </div>
              
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="flex items-center space-x-2">
                  <Target className="h-4 w-4 text-gray-500" />
                  <span className="text-sm text-gray-600">{quiz.questions} Questions</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Clock className="h-4 w-4 text-gray-500" />
                  <span className="text-sm text-gray-600">{quiz.duration} Minutes</span>
                </div>
              </div>

              {quiz.score && (
                <div className="mb-4 p-3 bg-green-50 rounded-lg">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-green-800">Best Score</span>
                    <span className="text-lg font-bold text-green-600">{quiz.score}%</span>
                  </div>
                </div>
              )}
              
              <div className="flex items-center justify-between">
                <div className="text-sm text-gray-500">
                  {quiz.unlocked ? 'Ready to start' : 'Complete all lessons to unlock'}
                </div>
                <button
                  disabled={!quiz.unlocked}
                  className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                    quiz.unlocked
                      ? `${getColorClasses(quiz.color).bg} text-white ${getColorClasses(quiz.color).hover} shadow-lg hover:scale-105`
                      : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                  }`}
                >
                  {quiz.unlocked ? (
                    <>
                      <Play className="h-4 w-4 mr-2 inline" />
                      Start Quiz
                    </>
                  ) : (
                    <>
                      <Lock className="h-4 w-4 mr-2 inline" />
                      Locked
                    </>
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>

        <QuizModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          quiz={selectedQuiz}
          currentLanguage={currentLanguage}
        />
      </div>
    </section>
  );
};

export default Practice;