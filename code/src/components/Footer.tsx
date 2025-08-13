import React, { useState } from 'react';
import { BookOpen, Mail, Phone, MapPin, Facebook, Twitter, Youtube, Instagram } from 'lucide-react';
import { getTranslation } from '../utils/translations';

interface FooterProps {
  currentLanguage: string;
}

const Footer: React.FC<FooterProps> = ({ currentLanguage }) => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const t = getTranslation(currentLanguage);

  const handleSubscribe = () => {
    if (!email) {
      setMessage('Please enter your email');
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setMessage('Please enter a valid email');
      return;
    }
    
    // Save to localStorage with error handling
    try {
      const subscribers = JSON.parse(localStorage.getItem('newsletter_subscribers') || '[]');
      if (subscribers.includes(email)) {
        setMessage('Already subscribed!');
        return;
      }
      
      subscribers.push(email);
      localStorage.setItem('newsletter_subscribers', JSON.stringify(subscribers));
    } catch (error) {
      setMessage('Error saving subscription. Please try again.');
      return;
    }
    setMessage('Success! Thank you for subscribing.');
    setEmail('');
    
    setTimeout(() => setMessage(''), 3000);
  };

  return (
    <footer className="bg-gray-900 text-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center mb-4">
              <BookOpen className="h-8 w-8 text-blue-400" />
              <span className="ml-2 text-xl font-bold">{t.appName}</span>
            </div>
            <p className="text-gray-400 mb-4">
              {t.footerDescription}
            </p>
            <div className="flex space-x-4">
              <Facebook className="h-6 w-6 text-gray-400 hover:text-blue-400 cursor-pointer transition-colors" />
              <Twitter className="h-6 w-6 text-gray-400 hover:text-blue-400 cursor-pointer transition-colors" />
              <Youtube className="h-6 w-6 text-gray-400 hover:text-red-400 cursor-pointer transition-colors" />
              <Instagram className="h-6 w-6 text-gray-400 hover:text-pink-400 cursor-pointer transition-colors" />
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">{t.quickLinks}</h3>
            <ul className="space-y-2">
              <li><a href="#home" className="text-gray-400 hover:text-white transition-colors">{t.home}</a></li>
              <li><a href="#lessons" className="text-gray-400 hover:text-white transition-colors">{t.lessons}</a></li>
              <li><a href="#practice" className="text-gray-400 hover:text-white transition-colors">{t.practice}</a></li>
              <li><a href="#progress" className="text-gray-400 hover:text-white transition-colors">{t.progress}</a></li>
              <li><a href="#about" className="text-gray-400 hover:text-white transition-colors">{t.aboutUs}</a></li>
            </ul>
          </div>

          {/* Learning Categories */}
          <div>
            <h3 className="text-lg font-semibold mb-4">{t.learningCategoriesFooter}</h3>
            <ul className="space-y-2">
              <li><a href="#computer" className="text-gray-400 hover:text-white transition-colors">{t.categoryNames[0]}</a></li>
              <li><a href="#smartphone" className="text-gray-400 hover:text-white transition-colors">{t.categoryNames[1]}</a></li>
              <li><a href="#internet" className="text-gray-400 hover:text-white transition-colors">{t.categoryNames[2]}</a></li>
              <li><a href="#apps" className="text-gray-400 hover:text-white transition-colors">{t.categoryNames[3]}</a></li>
              <li><a href="#government" className="text-gray-400 hover:text-white transition-colors">{t.governmentServices}</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">{t.contactUs}</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-gray-400" />
                <span className="text-gray-400">purandesh268@gmail.com</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-gray-400" />
                <span className="text-gray-400">8019904590</span>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="h-5 w-5 text-gray-400" />
                <span className="text-gray-400">Rural Development Center, India</span>
              </div>
            </div>
            
            <div className="mt-6">
              <h4 className="font-semibold mb-2">{t.newsletter}</h4>
              <div className="flex">
                <input
                  type="email"
                  placeholder={t.enterEmail}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1 px-3 py-2 bg-gray-800 text-white rounded-l-lg border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button 
                  onClick={handleSubscribe}
                  className="bg-blue-600 text-white px-4 py-2 rounded-r-lg hover:bg-blue-700 transition-colors"
                >
                  {t.subscribe}
                </button>
              </div>
              {message && (
                <p className={`mt-2 text-sm ${message.includes('Success') ? 'text-green-400' : 'text-red-400'}`}>
                  {message}
                </p>
              )}
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm mb-4 md:mb-0">
              {t.footerCopyright}
            </p>
            <div className="flex space-x-6 text-sm">
              <a href="#privacy" className="text-gray-400 hover:text-white transition-colors">{t.privacyPolicy}</a>
              <a href="#terms" className="text-gray-400 hover:text-white transition-colors">{t.termsOfService}</a>
              <a href="#accessibility" className="text-gray-400 hover:text-white transition-colors">{t.accessibility}</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;