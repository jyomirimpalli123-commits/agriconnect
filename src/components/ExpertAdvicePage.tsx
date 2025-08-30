import React from 'react';
import { Phone, GraduationCap, ArrowLeft, ArrowRight, CalendarCheck } from 'lucide-react';
import { i18n } from '../utils/i18n';

export const ExpertAdvicePage: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold text-green-700 mb-8 pb-3 border-b-2 border-gray-200">
        {i18n.t('expertAdvice')}
      </h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <div className="bg-gradient-to-br from-white to-gray-50 p-6 rounded-xl shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
          <div className="flex items-center gap-3 mb-4">
            <Phone className="w-6 h-6 text-green-700" />
            <h3 className="text-xl font-semibold text-green-700">{i18n.t('kisanCallCenter')}</h3>
          </div>
          <p className="text-gray-600 mb-4">24/7 helpline for agricultural advice</p>
          <p className="text-2xl font-bold text-green-700 mb-4">1800-180-1551</p>
          <button className="flex items-center gap-2 bg-green-700 text-white px-4 py-2 rounded-lg hover:bg-green-800 transition-colors duration-200">
            <Phone className="w-4 h-4" />
            {i18n.t('callNow')}
          </button>
        </div>

        <div className="bg-gradient-to-br from-white to-gray-50 p-6 rounded-xl shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
          <div className="flex items-center gap-3 mb-4">
            <GraduationCap className="w-6 h-6 text-green-700" />
            <h3 className="text-xl font-semibold text-green-700">{i18n.t('kvkSessions')}</h3>
          </div>
          <p className="text-gray-600 mb-2">Next training session:</p>
          <p className="font-bold text-gray-800 mb-2">August 22, 2024 - 10:00 AM</p>
          <p className="text-gray-600 mb-4">Topic: Organic Farming Techniques</p>
          <button className="flex items-center gap-2 bg-green-700 text-white px-4 py-2 rounded-lg hover:bg-green-800 transition-colors duration-200">
            <CalendarCheck className="w-4 h-4" />
            {i18n.t('register')}
          </button>
        </div>
      </div>

      <div className="mb-8">
        <h3 className="text-xl font-bold text-green-700 mb-4">{i18n.t('govAdvisories')}</h3>
        <div className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded-lg">
          <h4 className="font-semibold text-blue-800 mb-2">New Subsidy Scheme</h4>
          <p className="text-blue-700 mb-4">
            Government announces 50% subsidy on drip irrigation systems for small farmers. 
            Apply before September 30, 2024.
          </p>
          <button className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200">
            {i18n.t('viewMore')}
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="text-center">
        <button
          onClick={() => window.location.hash = '#home'}
          className="flex items-center gap-2 bg-green-700 text-white px-6 py-3 rounded-lg hover:bg-green-800 transition-colors duration-200 mx-auto"
        >
          <ArrowLeft className="w-4 h-4" />
          {i18n.t('backToHome')}
        </button>
      </div>
    </div>
  );
};