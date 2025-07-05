import React from 'react';
import { ArrowRight, Shield, TrendingUp, Users } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface HeroProps {
  onGetStarted: () => void;
}

const Hero: React.FC<HeroProps> = ({ onGetStarted }) => {
  const { t } = useLanguage();

  return (
    <div className="bg-gradient-to-br from-green-50 to-blue-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16">
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            {t('title')}
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto">
            {t('subtitle')}
          </p>
          <button
            onClick={onGetStarted}
            className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-lg text-lg font-semibold flex items-center space-x-2 mx-auto transition-colors duration-200"
          >
            <span>{t('getStarted')}</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>

        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-8 rounded-xl shadow-lg">
            <div className="bg-green-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
              <Shield className="w-6 h-6 text-green-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Fair Assessment</h3>
            <p className="text-gray-600">
              Credit scoring based on actual farming data and agricultural practices, not just traditional financial records.
            </p>
          </div>

          <div className="bg-white p-8 rounded-xl shadow-lg">
            <div className="bg-blue-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
              <TrendingUp className="w-6 h-6 text-blue-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Data-Driven</h3>
            <p className="text-gray-600">
              AI algorithms analyze yield patterns, soil health, weather resilience, and farming practices for accurate scoring.
            </p>
          </div>

          <div className="bg-white p-8 rounded-xl shadow-lg">
            <div className="bg-amber-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
              <Users className="w-6 h-6 text-amber-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Inclusive</h3>
            <p className="text-gray-600">
              Helping unbanked farmers access formal credit through alternative data and community verification.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;