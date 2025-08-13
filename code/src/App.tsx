import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Lessons from './components/Lessons';
import Progress from './components/Progress';
import Practice from './components/Practice';
import Footer from './components/Footer';
import Chatbot from './components/Chatbot';
import SimpleLogin from './components/SimpleLogin';
import { ProgressProvider } from './context/ProgressContext';
import { User } from './types';

function App() {
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const [currentPage, setCurrentPage] = useState('home');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const savedUser = localStorage.getItem('userName');
    if (savedUser) {
      setIsAuthenticated(true);
      setUser({ name: savedUser });
    }
  }, []);

  const handleLogin = (name: string) => {
    localStorage.setItem('userName', name);
    setIsAuthenticated(true);
    setUser({ name });
  };

  const handleLogout = () => {
    localStorage.removeItem('userName');
    setIsAuthenticated(false);
    setUser(null);
  };

  const handleLanguageChange = (lang: string) => {
    setCurrentLanguage(lang);
  };

  const handlePageChange = (page: string) => {
    setCurrentPage(page);
  };

  if (!isAuthenticated) {
    return <SimpleLogin onLogin={handleLogin} />;
  }

  return (
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
          {currentPage === 'lessons' && <Lessons currentLanguage={currentLanguage} />}
          {currentPage === 'practice' && <Practice currentLanguage={currentLanguage} />}
          {currentPage === 'progress' && <Progress currentLanguage={currentLanguage} />}
        </main>
        <Footer currentLanguage={currentLanguage} />
        <Chatbot currentLanguage={currentLanguage} />
      </div>
    </ProgressProvider>
  );
}

export default App;
