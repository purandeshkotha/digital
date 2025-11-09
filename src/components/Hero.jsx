import React from 'react';
import { Play, Smartphone, Monitor, Wifi } from 'lucide-react';
import { getTranslation } from '../utils/translations';

const Hero = ({ currentLanguage, onNavigate }) => {
  const t = getTranslation(currentLanguage);

  return (
    <section className="min-h-screen relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900/90 to-indigo-900/90">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20"
          style={{
            backgroundImage: `url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 800"><defs><pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse"><path d="M 40 0 L 0 0 0 40" fill="none" stroke="%23ffffff" stroke-width="1" opacity="0.1"/></pattern></defs><rect width="100%25" height="100%25" fill="url(%23grid)"/><circle cx="200" cy="150" r="60" fill="%23ffffff" opacity="0.1"/><circle cx="800" cy="300" r="80" fill="%23ffffff" opacity="0.08"/><circle cx="1000" cy="600" r="100" fill="%23ffffff" opacity="0.06"/><rect x="100" y="400" width="120" height="80" rx="10" fill="%23ffffff" opacity="0.1"/><rect x="600" y="100" width="100" height="60" rx="8" fill="%23ffffff" opacity="0.08"/></svg>')`
          }}
        ></div>
      </div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center min-h-[80vh]">
          <div className="text-center lg:text-left">
            <div className="mb-8">
              <h1 className="text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
                {t.heroTitle}
                <span className="block text-yellow-400 mt-2">{t.heroSubtitle}</span>
              </h1>
              <p className="text-xl text-blue-100 mb-8 leading-relaxed max-w-2xl">
                {t.heroDescription}
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <button 
                onClick={() => onNavigate?.('lessons')}
                className="group flex items-center justify-center px-10 py-4 bg-yellow-500 text-gray-900 rounded-xl hover:bg-yellow-400 transition-all duration-300 shadow-2xl hover:shadow-yellow-500/25 font-semibold text-lg"
              >
                <Play className="h-6 w-6 mr-3 group-hover:scale-110 transition-transform" />
                {t.startLearning}
              </button>

            </div>
          </div>
          
          <div className="relative">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-6 shadow-2xl hover:shadow-3xl transition-all duration-300 hover:-translate-y-2">
                <div className="bg-blue-500 p-4 rounded-xl mb-4 w-fit">
                  <Monitor className="h-8 w-8 text-white" />
                </div>
                <h3 className="font-bold text-gray-900 mb-3 text-lg">{t.computerBasics}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{t.computerBasicsDesc}</p>
              </div>
              
              <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-6 shadow-2xl hover:shadow-3xl transition-all duration-300 hover:-translate-y-2 mt-8 sm:mt-0">
                <div className="bg-green-500 p-4 rounded-xl mb-4 w-fit">
                  <Smartphone className="h-8 w-8 text-white" />
                </div>
                <h3 className="font-bold text-gray-900 mb-3 text-lg">{t.smartphoneSkills}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{t.smartphoneSkillsDesc}</p>
              </div>
              
              <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-6 shadow-2xl hover:shadow-3xl transition-all duration-300 hover:-translate-y-2">
                <div className="bg-purple-500 p-4 rounded-xl mb-4 w-fit">
                  <Wifi className="h-8 w-8 text-white" />
                </div>
                <h3 className="font-bold text-gray-900 mb-3 text-lg">{t.internetSafety}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{t.internetSafetyDesc}</p>
              </div>
              
              <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-6 shadow-2xl hover:shadow-3xl transition-all duration-300 hover:-translate-y-2">
                <div className="bg-red-500 p-4 rounded-xl mb-4 w-fit">
                  <span className="text-2xl">🏠</span>
                </div>
                <h3 className="font-bold text-gray-900 mb-3 text-lg">{t.homeAppliances}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{t.homeAppliancesDesc}</p>
              </div>
            </div>
            
            <div className="absolute -top-4 -right-4 w-20 h-20 bg-yellow-400/20 rounded-full blur-xl"></div>
            <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-blue-400/20 rounded-full blur-2xl"></div>
          </div>
        </div>
        
        <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
            <div className="text-3xl font-bold text-yellow-400 mb-2">10K+</div>
            <div className="text-blue-100 text-sm">Rural Learners</div>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
            <div className="text-3xl font-bold text-yellow-400 mb-2">25+</div>
            <div className="text-blue-100 text-sm">Video Lessons</div>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
            <div className="text-3xl font-bold text-yellow-400 mb-2">3</div>
            <div className="text-blue-100 text-sm">Languages</div>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
            <div className="text-3xl font-bold text-yellow-400 mb-2">95%</div>
            <div className="text-blue-100 text-sm">Success Rate</div>
          </div>
        </div>
        

      </div>
    </section>
  );
};

export default Hero;