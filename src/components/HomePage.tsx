import React from 'react';
import { Users, Scaling as Seedling, TrendingUp, Calendar, Camera, Satellite, Cloud, Phone, ArrowRight } from 'lucide-react';
import { i18n } from '../utils/i18n';

export const HomePage: React.FC = () => {
  const stats = [
    { icon: Users, value: '50,000+', key: 'farmersSupported' },
    { icon: Seedling, value: '1,20,000+', key: 'cropsAnalyzed' },
    { icon: TrendingUp, value: '95%', key: 'accuracyRate' },
    { icon: Calendar, value: '500+', key: 'dailyAdvisories' }
  ];

  const features = [
    { 
      id: 'scan', 
      icon: Camera, 
      key: 'scanCrop', 
      description: 'Upload an image of your crop to analyze its health and detect diseases using AI technology.' 
    },
    { 
      id: 'nasa', 
      icon: Satellite, 
      key: 'nasaData', 
      description: 'Access real-time NASA satellite data for vegetation index, soil moisture, temperature and precipitation monitoring.' 
    },
    { 
      id: 'weather', 
      icon: Cloud, 
      key: 'weatherForecast', 
      description: 'Get accurate weather forecasts and early warnings for cyclones, heavy rainfall, and other extreme weather events.' 
    },
    { 
      id: 'expert', 
      icon: Phone, 
      key: 'expertAdvice', 
      description: 'Connect with agricultural experts from Krishi Vigyan Kendras and get personalized advice for your farming needs.' 
    }
  ];

  return (
    <div>
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-green-700 mb-3">{i18n.t('welcome')}</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
          {i18n.t('welcomeDescription')}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map(({ icon: Icon, value, key }, index) => (
          <div key={index} className="bg-white p-6 rounded-xl text-center shadow-lg hover:shadow-xl transition-shadow duration-300">
            <Icon className="w-10 h-10 text-green-700 mx-auto mb-4" />
            <h3 className="text-3xl font-bold text-gray-800 mb-2">{value}</h3>
            <p className="text-gray-600">{i18n.t(key)}</p>
          </div>
        ))}
      </div>

      <h2 className="text-2xl font-bold text-green-700 mb-6 pb-3 border-b-2 border-gray-200">
        Featured Services
      </h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {features.map(({ id, icon: Icon, key, description }) => (
          <div key={id} className="bg-gradient-to-br from-gray-50 to-gray-100 p-6 rounded-xl shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
            <div className="flex items-center gap-3 mb-4">
              <Icon className="w-6 h-6 text-green-700" />
              <h3 className="text-xl font-semibold text-green-700">{i18n.t(key)}</h3>
            </div>
            <p className="text-gray-600 mb-4 leading-relaxed">{description}</p>
            <button
              onClick={() => window.location.hash = `#${id}`}
              className="flex items-center gap-2 bg-green-700 text-white px-4 py-2 rounded-lg hover:bg-green-800 transition-colors duration-200"
            >
              {i18n.t('viewDetails')}
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};