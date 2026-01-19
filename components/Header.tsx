
import React from 'react';
import { translations, Language } from '../translations';

interface HeaderProps {
  onViewChange: (view: 'home' | 'dashboard' | 'ai') => void;
  currentView: string;
  onAuthOpen: (mode: 'login' | 'register') => void;
  onDownloadOpen: () => void;
  language: Language;
  onLanguageChange: (lang: Language) => void;
}

const Header: React.FC<HeaderProps> = ({ 
  onViewChange, 
  currentView, 
  onAuthOpen, 
  onDownloadOpen, 
  language, 
  onLanguageChange 
}) => {
  const t = translations[language].nav;

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div 
            className="flex items-center cursor-pointer" 
            onClick={() => onViewChange('home')}
          >
            <span className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent">
              MojTermin
            </span>
          </div>
          
          <nav className="hidden md:flex space-x-8">
            <button 
              onClick={() => onViewChange('home')}
              className={`${currentView === 'home' ? 'text-indigo-600 font-semibold' : 'text-slate-600'} hover:text-indigo-500 transition-colors text-sm`}
            >
              {t.explore}
            </button>
            <button 
              onClick={() => onViewChange('ai')}
              className={`${currentView === 'ai' ? 'text-indigo-600 font-semibold' : 'text-slate-600'} hover:text-indigo-500 transition-colors text-sm`}
            >
              {t.ai}
            </button>
            <button 
              onClick={() => onViewChange('dashboard')}
              className={`${currentView === 'dashboard' ? 'text-indigo-600 font-semibold' : 'text-slate-600'} hover:text-indigo-500 transition-colors text-sm`}
            >
              {t.bookings}
            </button>
          </nav>

          <div className="flex items-center space-x-4">
             {/* Language Switcher */}
             <div className="flex bg-slate-100 rounded-lg p-0.5 border border-slate-200">
                <button 
                  onClick={() => onLanguageChange('sr')}
                  className={`px-2 py-1 rounded-md text-[10px] font-black transition-all ${language === 'sr' ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-400'}`}
                >
                  SR
                </button>
                <button 
                  onClick={() => onLanguageChange('en')}
                  className={`px-2 py-1 rounded-md text-[10px] font-black transition-all ${language === 'en' ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-400'}`}
                >
                  EN
                </button>
             </div>

             <div className="hidden sm:flex items-center space-x-3">
               <button 
                 onClick={() => onAuthOpen('login')}
                 className="text-slate-600 px-3 py-2 rounded-lg font-medium hover:bg-slate-50 transition-all text-sm"
               >
                 {t.login}
               </button>
               <button 
                 onClick={() => onAuthOpen('register')}
                 className="bg-indigo-600 text-white px-4 py-2 rounded-xl font-medium hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-100 text-sm"
               >
                 {t.register}
               </button>
             </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
