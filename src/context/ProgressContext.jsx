import React, { createContext, useContext, useState, useEffect } from 'react';

const ProgressContext = createContext(undefined);

export const ProgressProvider = ({ children }) => {
  const [completedLessons, setCompletedLessons] = useState([]);
  const [quizScores, setQuizScores] = useState([]);
  const [userMobile, setUserMobile] = useState(null);
  const [learningDays, setLearningDays] = useState([]);
  const [earnedCertificates, setEarnedCertificates] = useState([]);

  useEffect(() => {
    const mobile = localStorage.getItem('userMobile');
    if (mobile) {
      setUserMobile(mobile);
      loadUserProgress(mobile);
    }
  }, []);

  const loadUserProgress = async (mobile) => {
    if (!mobile || !/^\d{10}$/.test(mobile)) {
      console.error('Invalid mobile number');
      return;
    }
    
    try {
      const token = localStorage.getItem('authToken');
      if (!token) {
        throw new Error('No auth token');
      }
      
      const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:3001';
      const response = await fetch(`${apiUrl}/api/user/${encodeURIComponent(mobile)}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
          'X-Requested-With': 'XMLHttpRequest'
        }
      });
      
      if (response.ok) {
        const data = await response.json();
        if (data.user) {
          setCompletedLessons(data.user.completedLessons || []);
          setQuizScores(data.user.progress?.practiceScores || []);
        }
      } else {
        throw new Error(`HTTP ${response.status}`);
      }
    } catch (error) {
      console.warn('Backend unavailable, using local storage:', error.message);
      try {
        const localProgress = localStorage.getItem(`progress_${mobile}`);
        const localScores = localStorage.getItem(`scores_${mobile}`);
        const localDays = localStorage.getItem(`days_${mobile}`);
        const localCerts = localStorage.getItem(`certificates_${mobile}`);
        if (localProgress) setCompletedLessons(JSON.parse(localProgress));
        if (localScores) setQuizScores(JSON.parse(localScores));
        if (localDays) setLearningDays(JSON.parse(localDays));
        if (localCerts) setEarnedCertificates(JSON.parse(localCerts));
      } catch (parseError) {
        console.error('Error parsing local storage data:', parseError);
      }
    }
  };

  const syncProgress = async (lessonId, score) => {
    try {
      if (!userMobile || !lessonId) {
        return; // Silently skip if no data
      }
      
      // Validate inputs
      if (!/^[6-9]\d{9}$/.test(userMobile)) {
        return; // Skip invalid mobile
      }
      
      if (typeof lessonId !== 'string' || lessonId.length === 0) {
        return; // Skip invalid lesson ID
      }
      
      if (score !== undefined && (typeof score !== 'number' || score < 0 || score > 100)) {
        return; // Skip invalid score
      }
      
      const token = localStorage.getItem('authToken');
      const csrfToken = localStorage.getItem('csrfToken');
      
      if (!token) {
        return; // Skip if no auth token
      }
      
      const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:3001';
      const response = await fetch(`${apiUrl}/api/progress`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
          ...(csrfToken && { 'X-CSRF-Token': csrfToken }),
          'X-Requested-With': 'XMLHttpRequest'
        },
        body: JSON.stringify({ 
          mobile: userMobile, 
          lessonId: String(lessonId), 
          score: score ? Number(score) : undefined 
        })
      });
      
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }
      
      const result = await response.json();
      return result;
    } catch (error) {
      // Silently fail - don't crash the app
      console.warn('Progress sync failed:', error.message);
    }
  };

  const markLessonComplete = (lessonId, category) => {
    try {
      if (!lessonId || !category) return;
      
      const lessonKey = `${category}-${lessonId}`;
      setCompletedLessons(prev => {
        if (!prev.includes(lessonKey)) {
          const updated = [...prev, lessonKey];
          
          try {
            if (userMobile) {
              localStorage.setItem(`progress_${userMobile}`, JSON.stringify(updated));
            }
          } catch (e) {
            console.warn('Failed to save progress to localStorage:', e);
          }
          
          // Track learning day
          const today = new Date().toDateString();
          setLearningDays(prevDays => {
            if (!prevDays.includes(today)) {
              const updatedDays = [...prevDays, today];
              try {
                if (userMobile) {
                  localStorage.setItem(`days_${userMobile}`, JSON.stringify(updatedDays));
                }
              } catch (e) {
                console.warn('Failed to save days to localStorage:', e);
              }
              return updatedDays;
            }
            return prevDays;
          });
          
          // Sync to backend (non-blocking)
          syncProgress(lessonKey).catch(() => {});
          
          // Check if all lessons are completed
          if (updated.length >= 10) { // Reduced from 25 to match actual lesson count
            setEarnedCertificates(prevCerts => {
              if (prevCerts.length === 0) {
                const newCert = {
                  category: 'Digital Literacy Master',
                  completedAt: new Date().toLocaleDateString(),
                  id: Date.now()
                };
                const updatedCerts = [newCert];
                try {
                  if (userMobile) {
                    localStorage.setItem(`certificates_${userMobile}`, JSON.stringify(updatedCerts));
                  }
                } catch (e) {
                  console.warn('Failed to save certificates to localStorage:', e);
                }
                return updatedCerts;
              }
              return prevCerts;
            });
          }
          
          return updated;
        }
        return prev;
      });
    } catch (error) {
      console.error('Error marking lesson complete:', error);
    }
  };

  const updateWatchTime = (lessonId, category, watchTime) => {
    // For now, just track watch time without syncing to backend
    // Can be enhanced later if needed
  };

  const getLessonProgress = (lessonId, category) => {
    const lessonKey = `${category}-${lessonId}`;
    return completedLessons.includes(lessonKey) ? { completed: true } : null;
  };

  const getOverallProgress = () => {
    try {
      const totalLessons = 10; // Match actual lesson count
      const completed = completedLessons.length;
      return Math.round((completed / totalLessons) * 100);
    } catch (error) {
      console.error('Error calculating progress:', error);
      return 0;
    }
  };

  const getCategoryProgress = (category) => {
    try {
      if (!category) return 0;
      const categoryLessons = completedLessons.filter(l => l.startsWith(category));
      const completed = categoryLessons.length;
      const totalForCategory = 2; // Most categories have 2 lessons
      return Math.round((completed / totalForCategory) * 100);
    } catch (error) {
      console.error('Error calculating category progress:', error);
      return 0;
    }
  };

  const updateQuizScore = (quizId, score) => {
    try {
      if (!quizId || typeof score !== 'number') return;
      
      setQuizScores(prev => {
        const existing = prev.find(q => q.lessonId === quizId);
        let updated;
        if (existing) {
          updated = prev.map(q => 
            q.lessonId === quizId 
              ? { ...q, score: Math.max(q.score, score), completedAt: new Date() }
              : q
          );
        } else {
          const newScore = { lessonId: quizId, score, completedAt: new Date() };
          updated = [...prev, newScore];
        }
        
        try {
          if (userMobile) {
            localStorage.setItem(`scores_${userMobile}`, JSON.stringify(updated));
          }
        } catch (e) {
          console.warn('Failed to save scores to localStorage:', e);
        }
        
        // Sync score to backend (non-blocking)
        syncProgress(quizId, score).catch(() => {});
        return updated;
      });
    } catch (error) {
      console.error('Error updating quiz score:', error);
    }
  };

  const getQuizScore = (quizId) => {
    const quiz = quizScores.find(q => q.lessonId === quizId);
    return quiz ? quiz.score : null;
  };

  const getStreak = () => {
    return learningDays.length;
  };

  return (
    <ProgressContext.Provider value={{
      completedLessons,
      quizScores,
      earnedCertificates,
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
    // Return default values instead of throwing error
    return {
      completedLessons: [],
      quizScores: [],
      earnedCertificates: [],
      markLessonComplete: () => {},
      updateWatchTime: () => {},
      updateQuizScore: () => {},
      getQuizScore: () => null,
      getLessonProgress: () => null,
      getOverallProgress: () => 0,
      getCategoryProgress: () => 0,
      getStreak: () => 0
    };
  }
  return context;
};