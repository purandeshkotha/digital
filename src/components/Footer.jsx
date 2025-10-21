import React from 'react';
import { BookOpen, Mail, Phone, MapPin } from 'lucide-react';
import { getTranslation } from '../utils/translations';

const Footer = ({ currentLanguage }) => {
  const t = getTranslation(currentLanguage);

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-1">
            <div className="flex items-center mb-4">
              <BookOpen className="h-8 w-8 text-blue-400" />
              <span className="ml-2 text-xl font-bold">{t.appName}</span>
            </div>
            <p className="text-gray-300 text-sm leading-relaxed mb-4">
              {t.footerDescription}
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">{t.quickLinks}</h3>
            <ul className="space-y-2 text-gray-300">
              <li><a href="#" className="hover:text-white transition-colors">{t.aboutUs}</a></li>
              <li><a href="#" className="hover:text-white transition-colors">{t.lessons}</a></li>
              <li><a href="#" className="hover:text-white transition-colors">{t.practice}</a></li>
              <li><a href="#" className="hover:text-white transition-colors">{t.progress}</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">{t.learningCategoriesFooter}</h3>
            <ul className="space-y-2 text-gray-300">
              {t.categoryNames.map((category, index) => (
                <li key={index}>
                  <a href="#" className="hover:text-white transition-colors">{category}</a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">{t.contactUs}</h3>
            <div className="space-y-3 text-gray-300">
              <div className="flex items-center space-x-3">
                <Mail className="h-4 w-4 text-blue-400" />
                <span className="text-sm">support@digitaleducation.com</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="h-4 w-4 text-blue-400" />
                <span className="text-sm">+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="h-4 w-4 text-blue-400" />
                <span className="text-sm">Rural Education Center</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm mb-4 md:mb-0">
              {t.footerCopyright}
            </p>
            <div className="flex space-x-6 text-sm text-gray-400">
              <a href="#" className="hover:text-white transition-colors">{t.privacyPolicy}</a>
              <a href="#" className="hover:text-white transition-colors">{t.termsOfService}</a>
              <a href="#" className="hover:text-white transition-colors">{t.accessibility}</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;