import React, { useState, useEffect } from 'react';
import { BarChart3, Clock, Target, TrendingUp } from 'lucide-react';

const LearningInsights = ({ currentLanguage }) => {
  const [insights, setInsights] = useState({
    totalTime: 0,
    lessonsCompleted: 0,
    averageScore: 0,
    streakDays: 0,
    weakAreas: [],
    strongAreas: []
  });

  useEffect(() => {
    const analytics = JSON.parse(localStorage.getItem('analytics') || '[]');
    const progress = JSON.parse(localStorage.getItem('userProgress') || '{}');
    
    // Calculate insights
    const totalTime = analytics
      .filter(e => e.event === 'lesson_completed')
      .reduce((sum, e) => sum + (e.properties.duration || 0), 0);
    
    const lessonsCompleted = Object.values(progress).filter(p => p.completed).length;
    
    const quizScores = analytics
      .filter(e => e.event === 'quiz_attempted')
      .map(e => e.properties.accuracy);
    
    const averageScore = quizScores.length > 0 
      ? quizScores.reduce((sum, score) => sum + score, 0) / quizScores.length 
      : 0;

    setInsights({
      totalTime: Math.round(totalTime / 60000), // Convert to minutes
      lessonsCompleted,
      averageScore: Math.round(averageScore * 100),
      streakDays: calculateStreak(analytics),
      weakAreas: findWeakAreas(analytics),
      strongAreas: findStrongAreas(analytics)
    });
  }, []);

  const calculateStreak = (analytics) => {
    const dates = [...new Set(analytics.map(e => new Date(e.timestamp).toDateString()))];
    return dates.length;
  };

  const findWeakAreas = (analytics) => {
    const categoryScores = {};
    analytics.filter(e => e.event === 'quiz_attempted').forEach(e => {
      const category = e.properties.category || 'general';
      if (!categoryScores[category]) categoryScores[category] = [];
      categoryScores[category].push(e.properties.accuracy);
    });

    return Object.entries(categoryScores)
      .map(([category, scores]) => ({
        category,
        avgScore: scores.reduce((sum, s) => sum + s, 0) / scores.length
      }))
      .filter(item => item.avgScore < 0.7)
      .sort((a, b) => a.avgScore - b.avgScore)
      .slice(0, 3);
  };

  const findStrongAreas = (analytics) => {
    const categoryScores = {};
    analytics.filter(e => e.event === 'quiz_attempted').forEach(e => {
      const category = e.properties.category || 'general';
      if (!categoryScores[category]) categoryScores[category] = [];
      categoryScores[category].push(e.properties.accuracy);
    });

    return Object.entries(categoryScores)
      .map(([category, scores]) => ({
        category,
        avgScore: scores.reduce((sum, s) => sum + s, 0) / scores.length
      }))
      .filter(item => item.avgScore >= 0.8)
      .sort((a, b) => b.avgScore - a.avgScore)
      .slice(0, 3);
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl p-6">
      <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
        <BarChart3 className="h-6 w-6 mr-2 text-blue-600" />
        Learning Insights
      </h3>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-blue-50 p-4 rounded-xl text-center">
          <Clock className="h-8 w-8 text-blue-600 mx-auto mb-2" />
          <div className="text-2xl font-bold text-blue-600">{insights.totalTime}</div>
          <div className="text-sm text-gray-600">Minutes Learned</div>
        </div>
        
        <div className="bg-green-50 p-4 rounded-xl text-center">
          <Target className="h-8 w-8 text-green-600 mx-auto mb-2" />
          <div className="text-2xl font-bold text-green-600">{insights.lessonsCompleted}</div>
          <div className="text-sm text-gray-600">Lessons Completed</div>
        </div>
        
        <div className="bg-purple-50 p-4 rounded-xl text-center">
          <TrendingUp className="h-8 w-8 text-purple-600 mx-auto mb-2" />
          <div className="text-2xl font-bold text-purple-600">{insights.averageScore}%</div>
          <div className="text-sm text-gray-600">Average Score</div>
        </div>
        
        <div className="bg-orange-50 p-4 rounded-xl text-center">
          <div className="text-2xl font-bold text-orange-600">{insights.streakDays}</div>
          <div className="text-sm text-gray-600">Learning Days</div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h4 className="font-semibold text-gray-900 mb-3">Areas to Improve</h4>
          {insights.weakAreas.length > 0 ? (
            <div className="space-y-2">
              {insights.weakAreas.map((area, index) => (
                <div key={index} className="flex justify-between items-center p-2 bg-red-50 rounded">
                  <span className="capitalize">{area.category}</span>
                  <span className="text-red-600 font-medium">{Math.round(area.avgScore * 100)}%</span>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500">Great job! No weak areas identified.</p>
          )}
        </div>

        <div>
          <h4 className="font-semibold text-gray-900 mb-3">Strong Areas</h4>
          {insights.strongAreas.length > 0 ? (
            <div className="space-y-2">
              {insights.strongAreas.map((area, index) => (
                <div key={index} className="flex justify-between items-center p-2 bg-green-50 rounded">
                  <span className="capitalize">{area.category}</span>
                  <span className="text-green-600 font-medium">{Math.round(area.avgScore * 100)}%</span>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500">Complete more quizzes to see your strengths.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default LearningInsights;