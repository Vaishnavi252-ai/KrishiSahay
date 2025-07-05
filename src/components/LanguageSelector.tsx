import React from 'react';
import { Languages } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { languages } from '../utils/translations';

const LanguageSelector: React.FC = () => {
  const { language, setLanguage } = useLanguage();

  return (
    <div className="relative">
      <div className="flex items-center space-x-2">
        <Languages className="w-5 h-5 text-gray-600" />
        <select
          value={language}
          onChange={(e) => setLanguage(e.target.value as 'en' | 'hi' | 'mr')}
          className="bg-white border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
        >
          {languages.map((lang) => (
            <option key={lang.code} value={lang.code}>
              {lang.nativeName}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default LanguageSelector;