import React from 'react';
import { Phone, GraduationCap, ArrowLeft, ArrowRight, CalendarCheck, Star, Clock } from 'lucide-react';
import { i18n } from '../utils/i18n';
import { mockData } from '../data/mockData';

export const ExpertAdvicePage: React.FC = () => {
  const [activeTab, setActiveTab] = React.useState<'free' | 'premium'>('free');

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(<Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />);
    }

    if (hasHalfStar) {
      stars.push(<Star key="half" className="w-4 h-4 fill-yellow-400/50 text-yellow-400" />);
    }

    const remainingStars = 5 - Math.ceil(rating);
    for (let i = 0; i < remainingStars; i++) {
      stars.push(<Star key={`empty-${i}`} className="w-4 h-4 text-gray-300" />);
    }

    return stars;
  };

  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold text-green-700 mb-8 pb-3 border-b-2 border-gray-200">
        {i18n.t('expertAdvice')}
      </h2>

      <div className="flex mb-6 border-b border-gray-200">
        <button
          className={`px-6 py-3 font-medium transition-colors ${
            activeTab === 'free'
              ? 'text-green-700 border-b-2 border-green-700'
              : 'text-gray-500 hover:text-gray-700'
          }`}
          onClick={() => setActiveTab('free')}
        >
          {i18n.t('freeAdvice')}
        </button>
        <button
          className={`px-6 py-3 font-medium transition-colors ${
            activeTab === 'premium'
              ? 'text-green-700 border-b-2 border-green-700'
              : 'text-gray-500 hover:text-gray-700'
          }`}
          onClick={() => setActiveTab('premium')}
        >
          {i18n.t('premiumExperts')}
        </button>
      </div>

      {activeTab === 'free' && (
        <div>
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
            <h3 className="text-xl font-bold text-green-700 mb-4">{i18n.t('governmentSchemes')}</h3>
            <div className="space-y-4">
              {mockData.governmentSchemes.map((scheme, index) => (
                <div key={index} className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded-lg">
                  <h4 className="font-semibold text-blue-800 mb-2">{scheme.title}</h4>
                  <p className="text-blue-700 mb-4">{scheme.description}</p>
                  <button className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200">
                    {i18n.t('viewMore')}
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {activeTab === 'premium' && (
        <div>
          <h3 className="text-xl font-semibold text-gray-800 mb-4">{i18n.t('premiumExperts')}</h3>
          <p className="text-gray-600 mb-6">Connect with certified agricultural experts for personalized advice</p>
          
          <div className="space-y-4">
            {mockData.experts.map((expert, index) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 flex items-center">
                <div className="w-16 h-16 bg-green-700 text-white rounded-full flex items-center justify-center text-xl font-bold mr-6">
                  {getInitials(expert.name)}
                </div>
                <div className="flex-1">
                  <h4 className="text-lg font-semibold text-gray-800 mb-1">{expert.name}</h4>
                  <p className="text-gray-600 mb-2">{expert.specialty}</p>
                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    <div className="flex items-center gap-1">
                      {renderStars(expert.rating)}
                      <span className="ml-1">{expert.rating}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      <span>{expert.experience}</span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-lg font-bold text-green-700 mb-2">{expert.price}</div>
                  <button className="bg-green-700 text-white px-4 py-2 rounded-lg hover:bg-green-800 transition-colors duration-200 flex items-center gap-2">
                    <Phone className="w-4 h-4" />
                    {i18n.t('connect')}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

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