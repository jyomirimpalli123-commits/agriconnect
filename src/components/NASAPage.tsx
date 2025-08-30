import React from 'react';
import { Leaf, Droplets, CloudRain, Thermometer, ArrowLeft } from 'lucide-react';
import { i18n } from '../utils/i18n';
import { mockData } from '../data/mockData';

export const NASAPage: React.FC = () => {
  const nasaDataCards = [
    {
      icon: Leaf,
      titleKey: 'modisData',
      value: `NDVI: ${mockData.nasaData.ndvi}`,
      status: `${i18n.t('healthIndex')}: ${mockData.nasaData.ndvi > 0.6 ? 'Excellent' : mockData.nasaData.ndvi > 0.4 ? 'Good' : 'Needs Attention'}`,
      color: 'text-green-600'
    },
    {
      icon: Droplets,
      titleKey: 'smapData',
      value: `${i18n.t('soilMoisture')}: ${Math.round(mockData.nasaData.soilMoisture * 100)}%`,
      status: `Status: ${mockData.nasaData.soilMoisture > 0.4 ? 'Adequate' : 'Irrigation Needed'}`,
      color: 'text-blue-600'
    },
    {
      icon: CloudRain,
      titleKey: 'gpmData',
      value: `${i18n.t('precipitation')}: ${mockData.nasaData.precipitation}mm`,
      status: `Forecast: ${mockData.nasaData.precipitation > 100 ? 'Heavy Rain' : 'Moderate Rain'}`,
      color: 'text-indigo-600'
    },
    {
      icon: Thermometer,
      titleKey: 'landsatData',
      value: `${i18n.t('temperature')}: ${mockData.nasaData.temperature}°C`,
      status: `Condition: ${mockData.nasaData.temperature > 30 ? 'Hot' : 'Moderate'}`,
      color: 'text-orange-600'
    }
  ];

  return (
    <div className="max-w-6xl mx-auto">
      <h2 className="text-3xl font-bold text-green-700 mb-8 pb-3 border-b-2 border-gray-200">
        {i18n.t('nasaData')}
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {nasaDataCards.map(({ icon: Icon, titleKey, value, status, color }, index) => (
          <div key={index} className="bg-gradient-to-br from-white to-gray-50 p-6 rounded-xl shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
            <div className="flex items-center gap-3 mb-4">
              <Icon className={`w-8 h-8 ${color}`} />
              <h3 className="text-xl font-semibold text-gray-800">{i18n.t(titleKey)}</h3>
            </div>
            <p className="text-2xl font-bold text-gray-800 mb-2">{value}</p>
            <p className="text-gray-600">{status}</p>
          </div>
        ))}
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