import React from 'react';
import { ArrowLeft, AlertTriangle } from 'lucide-react';
import { i18n } from '../utils/i18n';
import { mockData } from '../data/mockData';

export const WeatherPage: React.FC = () => {
  const getWeatherIcon = (iconName: string) => {
    // Using text-based icons for simplicity since we can't access FontAwesome
    const iconMap: Record<string, string> = {
      'cloud-sun': '⛅',
      'cloud-rain': '🌧️',
      'cloud-showers-heavy': '🌦️',
      'sun': '☀️'
    };
    return iconMap[iconName] || '🌤️';
  };

  return (
    <div className="max-w-6xl mx-auto">
      <h2 className="text-3xl font-bold text-green-700 mb-8 pb-3 border-b-2 border-gray-200">
        {i18n.t('weatherForecast')}
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {mockData.weather.map((day, index) => (
          <div key={index} className="bg-gradient-to-br from-white to-gray-50 p-6 rounded-xl shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300 text-center">
            <h3 className="text-lg font-semibold text-gray-800 mb-3">{day.day}</h3>
            <div className="text-6xl mb-4">{getWeatherIcon(day.icon)}</div>
            <p className="text-2xl font-bold text-gray-800 mb-2">{day.temp}</p>
            <p className="text-gray-600">Rain: {day.rain}</p>
          </div>
        ))}
      </div>

      <div className="mb-8">
        <h3 className="text-xl font-bold text-green-700 mb-4">{i18n.t('weatherAlerts')}</h3>
        <div className="bg-orange-50 border-l-4 border-orange-500 p-6 rounded-lg">
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-6 h-6 text-orange-500 mt-1" />
            <div>
              <h4 className="font-semibold text-orange-800 mb-2">Heavy Rainfall Warning</h4>
              <p className="text-orange-700 mb-2">
                Heavy to very heavy rainfall likely at isolated places over district during next 48 hours.
              </p>
              <p className="font-semibold text-red-600">
                Advisory: Delay irrigation activities for next 2 days.
              </p>
            </div>
          </div>
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