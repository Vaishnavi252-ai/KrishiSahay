import React from 'react';
import { Sprout, Info, HelpCircle } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import LanguageSelector from './LanguageSelector';
import logoImage from '../assets/images/logo.png';

interface HeaderProps {
  onShowAbout?: () => void;
  onShowHowTo?: () => void;
}

const Header: React.FC<HeaderProps> = ({ onShowAbout, onShowHowTo }) => {
  const { t } = useLanguage();

  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-3">
            <div className="bg-green-600 p-2 rounded-lg">
              <img 
                src={logoImage} 
                alt="KrishiCredit Logo" 
                className="w-6 h-6 text-white"
                onError={(e) => {
                  // Fallback to Sprout icon if logo fails to load
                  const target = e.target as HTMLImageElement;
                  target.style.display = 'none';
                  const parent = target.parentElement;
                  if (parent) {
                    const sproutIcon = document.createElement('div');
                    sproutIcon.innerHTML = '<svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 3v1m0 3v1m0 3v1m0 3v1m0 3v1m-6-9h1m3 0h1m3 0h1m3 0h1m3 0h1m3 0h1"></path></svg>';
                    parent.appendChild(sproutIcon);
                  }
                }}
              />
              <Sprout className="w-6 h-6 text-white hidden" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">KrishiSahay</h1>
              <p className="text-sm text-gray-600">{t('subtitle')}</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-6">
            {/* Navigation Links */}
            <nav className="hidden md:flex items-center space-x-6">
              {onShowAbout && (
                <button
                  onClick={onShowAbout}
                  className="flex items-center space-x-2 text-gray-600 hover:text-green-600 transition-colors font-medium"
                >
                  <Info className="w-4 h-4" />
                  <span>About Us</span>
                </button>
              )}
              
              {onShowHowTo && (
                <button
                  onClick={onShowHowTo}
                  className="flex items-center space-x-2 text-gray-600 hover:text-green-600 transition-colors font-medium"
                >
                  <HelpCircle className="w-4 h-4" />
                  <span>How to Use</span>
                </button>
              )}
            </nav>

            {/* Mobile Navigation Menu */}
            <div className="md:hidden">
              <div className="relative group">
                <button className="p-2 text-gray-600 hover:text-green-600 transition-colors">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                </button>
                
                {/* Mobile Dropdown */}
                <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                  <div className="py-2">
                    {onShowAbout && (
                      <button
                        onClick={onShowAbout}
                        className="w-full text-left px-4 py-2 text-gray-700 hover:bg-green-50 hover:text-green-600 transition-colors flex items-center space-x-2"
                      >
                        <Info className="w-4 h-4" />
                        <span>About Us</span>
                      </button>
                    )}
                    
                    {onShowHowTo && (
                      <button
                        onClick={onShowHowTo}
                        className="w-full text-left px-4 py-2 text-gray-700 hover:bg-green-50 hover:text-green-600 transition-colors flex items-center space-x-2"
                      >
                        <HelpCircle className="w-4 h-4" />
                        <span>How to Use</span>
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
            
            <LanguageSelector />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;