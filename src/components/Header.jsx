import React, { useState } from 'react';
import { Globe, Menu, X, BookOpen } from 'lucide-react';
import { getTranslation } from '../utils/translations';

const Header = ({ currentLanguage, onLanguageChange, currentPage, onPageChange, user, onLogout }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLanguageDropdownOpen, setIsLanguageDropdownOpen] = useState(false);

  const t = getTranslation(currentLanguage);

  const languages = [
    { code: 'en', name: 'English', nativeName: 'English' },
    { code: 'hi', name: 'Hindi', nativeName: 'हिंदी' },
    { code: 'te', name: 'Telugu', nativeName: 'తెలుగు' },
  ];

  const currentLang = languages.find(lang => lang.code === currentLanguage) || languages[0];

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <BookOpen className="h-8 w-8 text-blue-600" />
            <span className="ml-2 text-xl font-bold text-gray-900">{t.appName}</span>
          </div>

          <nav className="hidden md:flex space-x-8">
            <button 
              onClick={() => onPageChange('home')}
              className={`transition-colors ${
                currentPage === 'home' ? 'text-blue-600 font-semibold' : 'text-gray-700 hover:text-blue-600'
              }`}
            >
              {t.home}
            </button>
            <button 
              onClick={() => onPageChange('lessons')}
              className={`transition-colors ${
                currentPage === 'lessons' ? 'text-blue-600 font-semibold' : 'text-gray-700 hover:text-blue-600'
              }`}
            >
              {t.lessons}
            </button>
            <button 
              onClick={() => onPageChange('practice')}
              className={`transition-colors ${
                currentPage === 'practice' ? 'text-blue-600 font-semibold' : 'text-gray-700 hover:text-blue-600'
              }`}
            >
              {t.practice}
            </button>
            <button 
              onClick={() => onPageChange('progress')}
              className={`transition-colors ${
                currentPage === 'progress' ? 'text-blue-600 font-semibold' : 'text-gray-700 hover:text-blue-600'
              }`}
            >
              {t.progress}
            </button>
          </nav>

          <div className="hidden md:flex items-center space-x-4">
            <div className="relative">
              <button
                onClick={() => setIsLanguageDropdownOpen(!isLanguageDropdownOpen)}
                className="flex items-center space-x-2 px-3 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
              >
                <Globe className="h-4 w-4" />
                <span className="text-sm font-medium">{currentLang.nativeName}</span>
              </button>
              
              {isLanguageDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10">
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => {
                        onLanguageChange(lang.code);
                        setIsLanguageDropdownOpen(false);
                      }}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                    >
                      {lang.nativeName}
                    </button>
                  ))}
                </div>
              )}
            </div>
            <button
              onClick={onLogout}
              className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
            >
              Logout
            </button>
          </div>

          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-md text-gray-700 hover:text-blue-600 transition-colors"
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {isMenuOpen && (
          <div className="md:hidden py-4 border-t">
            <nav className="flex flex-col space-y-4">
              <button 
                onClick={() => { onPageChange('home'); setIsMenuOpen(false); }}
                className={`text-left transition-colors ${
                  currentPage === 'home' ? 'text-blue-600 font-semibold' : 'text-gray-700 hover:text-blue-600'
                }`}
              >
                {t.home}
              </button>
              <button 
                onClick={() => { onPageChange('lessons'); setIsMenuOpen(false); }}
                className={`text-left transition-colors ${
                  currentPage === 'lessons' ? 'text-blue-600 font-semibold' : 'text-gray-700 hover:text-blue-600'
                }`}
              >
                {t.lessons}
              </button>
              <button 
                onClick={() => { onPageChange('practice'); setIsMenuOpen(false); }}
                className={`text-left transition-colors ${
                  currentPage === 'practice' ? 'text-blue-600 font-semibold' : 'text-gray-700 hover:text-blue-600'
                }`}
              >
                {t.practice}
              </button>
              <button 
                onClick={() => { onPageChange('progress'); setIsMenuOpen(false); }}
                className={`text-left transition-colors ${
                  currentPage === 'progress' ? 'text-blue-600 font-semibold' : 'text-gray-700 hover:text-blue-600'
                }`}
              >
                {t.progress}
              </button>
              <button 
                onClick={() => { onLogout(); setIsMenuOpen(false); }}
                className="text-left px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
              >
                Logout
              </button>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;