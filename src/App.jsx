import React, { useState, useEffect, Suspense, lazy } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Footer from './components/Footer';
import MobileLogin from './components/MobileLogin';
import LoadingSpinner from './components/LoadingSpinner';
import { ProgressProvider } from './context/ProgressContext';
import ErrorBoundary from './components/ErrorBoundary';

const Lessons = lazy(() => import('./components/Lessons'));
const Progress = lazy(() => import('./components/Progress'));
const Practice = lazy(() => import('./components/Practice'));
const Chatbot = lazy(() => import('./components/Chatbot'));

function App() {
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const [currentPage, setCurrentPage] = useState('home');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    try {
      const savedMobile = localStorage.getItem('userMobile');
      const savedUserData = localStorage.getItem('userData');
      if (savedMobile && savedUserData) {
        const userData = JSON.parse(savedUserData);
        if (userData && userData.mobile) {
          setIsAuthenticated(true);
          setUser(userData);
        }
      }
    } catch (err) {
      console.error('Error loading saved user data:', err);
      localStorage.removeItem('userMobile');
      localStorage.removeItem('userData');
    }
  }, []);

  const handleLogin = (userData) => {
    try {
      if (!userData || !userData.mobile) {
        throw new Error('Invalid user data');
      }
      localStorage.setItem('userMobile', userData.mobile);
      localStorage.setItem('userData', JSON.stringify(userData));
      setIsAuthenticated(true);
      setUser(userData);
      setError(null);
    } catch (err) {
      console.error('Login error:', err);
      setError('Login failed');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('userMobile');
    localStorage.removeItem('userData');
    setIsAuthenticated(false);
    setUser(null);
  };

  const handleLanguageChange = (lang) => {
    setCurrentLanguage(lang);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-red-50">
        <div className="text-center">
          <div className="text-red-600 mb-4">{error}</div>
          <button 
            onClick={() => setError(null)}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <MobileLogin onLogin={handleLogin} />;
  }

  return (
    <ErrorBoundary>
      <ProgressProvider>
        <div className="min-h-screen bg-white">
          <Header 
            currentLanguage={currentLanguage} 
            onLanguageChange={handleLanguageChange}
            currentPage={currentPage}
            onPageChange={handlePageChange}
            user={user}
            onLogout={handleLogout}
          />
          <main>
            {currentPage === 'home' && <Hero currentLanguage={currentLanguage} onNavigate={handlePageChange} />}
            <Suspense fallback={<LoadingSpinner />}>
              {currentPage === 'lessons' && <Lessons currentLanguage={currentLanguage} />}
              {currentPage === 'practice' && <Practice currentLanguage={currentLanguage} />}
              {currentPage === 'progress' && <Progress currentLanguage={currentLanguage} />}
            </Suspense>
          </main>
          <Footer currentLanguage={currentLanguage} />
          <Suspense fallback={<LoadingSpinner />}>
            <Chatbot currentLanguage={currentLanguage} />
          </Suspense>
        </div>
      </ProgressProvider>
    </ErrorBoundary>
  );
}

export default App;