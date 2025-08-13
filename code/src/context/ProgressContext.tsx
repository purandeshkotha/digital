import React, { createContext, useContext, useState, useEffect } from 'react';

interface LessonProgress {
  id: number;
  category: string;
  completed: boolean;
  watchTime: number;
  completedAt?: Date;
}

interface QuizScore {
  quizId: string;
  score: number;
  completedAt: Date;
}

interface ProgressContextType {
  completedLessons: LessonProgress[];
  quizScores: QuizScore[];
  markLessonComplete: (lessonId: number, category: string) => void;
  updateWatchTime: (lessonId: number, category: string, watchTime: number) => void;
  updateQuizScore: (quizId: string, score: number) => void;
  getQuizScore: (quizId: string) => number | null;
  getLessonProgress: (lessonId: number, category: string) => LessonProgress | undefined;
  getOverallProgress: () => number;
  getCategoryProgress: (category: string) => number;
  getStreak: () => number;
}

const ProgressContext = createContext<ProgressContextType | undefined>(undefined);

export const ProgressProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [completedLessons, setCompletedLessons] = useState<LessonProgress[]>([]);
  const [quizScores, setQuizScores] = useState<QuizScore[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem('lessonProgress');
    if (saved) {
      setCompletedLessons(JSON.parse(saved));
    }
    const savedQuizzes = localStorage.getItem('quizScores');
    if (savedQuizzes) {
      setQuizScores(JSON.parse(savedQuizzes));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('lessonProgress', JSON.stringify(completedLessons));
  }, [completedLessons]);

  useEffect(() => {
    localStorage.setItem('quizScores', JSON.stringify(quizScores));
  }, [quizScores]);

  const markLessonComplete = (lessonId: number, category: string) => {
    setCompletedLessons(prev => {
      const existing = prev.find(l => l.id === lessonId && l.category === category);
      if (existing) {
        return prev.map(l => 
          l.id === lessonId && l.category === category 
            ? { ...l, completed: true, completedAt: new Date() }
            : l
        );
      }
      return [...prev, { 
        id: lessonId, 
        category, 
        completed: true, 
        watchTime: 100,
        completedAt: new Date()
      }];
    });
  };

  const updateWatchTime = (lessonId: number, category: string, watchTime: number) => {
    setCompletedLessons(prev => {
      const existing = prev.find(l => l.id === lessonId && l.category === category);
      if (existing) {
        return prev.map(l => 
          l.id === lessonId && l.category === category 
            ? { ...l, watchTime }
            : l
        );
      }
      return [...prev, { id: lessonId, category, completed: false, watchTime }];
    });
  };

  const getLessonProgress = (lessonId: number, category: string) => {
    return completedLessons.find(l => l.id === lessonId && l.category === category);
  };

  const getOverallProgress = () => {
    const totalLessons = 20;
    const completed = completedLessons.filter(l => l.completed).length;
    return Math.round((completed / totalLessons) * 100);
  };

  const getCategoryProgress = (category: string) => {
    const categoryLessons = completedLessons.filter(l => l.category === category);
    const completed = categoryLessons.filter(l => l.completed).length;
    return Math.round((completed / 5) * 100);
  };

  const updateQuizScore = (quizId: string, score: number) => {
    setQuizScores(prev => {
      const existing = prev.find(q => q.quizId === quizId);
      if (existing) {
        return prev.map(q => 
          q.quizId === quizId 
            ? { ...q, score: Math.max(q.score, score), completedAt: new Date() }
            : q
        );
      }
      return [...prev, { quizId, score, completedAt: new Date() }];
    });
  };

  const getQuizScore = (quizId: string) => {
    const quiz = quizScores.find(q => q.quizId === quizId);
    return quiz ? quiz.score : null;
  };

  const getStreak = () => {
    const completed = completedLessons
      .filter(l => l.completed && l.completedAt)
      .sort((a, b) => new Date(b.completedAt!).getTime() - new Date(a.completedAt!).getTime());
    
    if (completed.length === 0) return 0;
    
    let streak = 1;
    for (let i = 0; i < completed.length - 1; i++) {
      const current = new Date(completed[i].completedAt!);
      const next = new Date(completed[i + 1].completedAt!);
      current.setHours(0, 0, 0, 0);
      next.setHours(0, 0, 0, 0);
      
      const diffDays = (current.getTime() - next.getTime()) / (1000 * 60 * 60 * 24);
      if (diffDays === 1) {
        streak++;
      } else {
        break;
      }
    }
    
    return streak;
  };

  return (
    <ProgressContext.Provider value={{
      completedLessons,
      quizScores,
      markLessonComplete,
      updateWatchTime,
      updateQuizScore,
      getQuizScore,
      getLessonProgress,
      getOverallProgress,
      getCategoryProgress,
      getStreak
    }}>
      {children}
    </ProgressContext.Provider>
  );
};

export const useProgress = () => {
  const context = useContext(ProgressContext);
  if (!context) {
    throw new Error('useProgress must be used within ProgressProvider');
  }
  return context;
};