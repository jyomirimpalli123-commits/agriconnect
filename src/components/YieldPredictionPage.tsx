import React, { useState } from 'react';
import { ArrowLeft, Calculator, TrendingUp, Thermometer, CloudRain, Droplets, Waves } from 'lucide-react';
import { i18n } from '../utils/i18n';
import { mockData } from '../data/mockData';
import { notificationManager } from '../utils/notifications';
import type { YieldPrediction } from '../types';

export const YieldPredictionPage: React.FC = () => {
  const [selectedField, setSelectedField] = useState('');
  const [selectedCrop, setSelectedCrop] = useState('');
  const [prediction, setPrediction] = useState<YieldPrediction | null>(null);

  const generatePrediction = () => {
    if (!selectedField || !selectedCrop) {
      notificationManager.show('Please select both field and crop', 'error');
      return;
    }

    // Simulate prediction generation with realistic factors
    const factors = {
      temperature: Math.random() * 0.3 + 0.7,
      rainfall: Math.random() * 0.3 + 0.6,
      humidity: Math.random() * 0.3 + 0.6,
      soilMoisture: Math.random() * 0.3 + 0.7
    };

    const overallScore = (factors.temperature + factors.rainfall + factors.humidity + factors.soilMoisture) / 4;

    setPrediction({
      factors,
      overallScore,
      estimatedYield: Math.round(overallScore * 1000) + ' kg/acre',
      confidence: Math.round(overallScore * 100) + '%'
    });

    notificationManager.show('Yield prediction generated successfully', 'success');
  };

  const getStatus = (value: number): 'optimal' | 'good' | 'fair' | 'poor' => {
    if (value >= 0.8) return 'optimal';
    if (value >= 0.7) return 'good';
    if (value >= 0.6) return 'fair';
    return 'poor';
  };

  const getProgressColor = (status: string) => {
    switch (status) {
      case 'optimal': return 'bg-green-500';
      case 'good': return 'bg-green-400';
      case 'fair': return 'bg-yellow-500';
      case 'poor': return 'bg-red-500';
      default: return 'bg-gray-400';
    }
  };

  const factorIcons = {
    temperature: Thermometer,
    rainfall: CloudRain,
    humidity: Droplets,
    soilMoisture: Waves
  };

  return (
    <div className="max-w-6xl mx-auto">
      <h2 className="text-3xl font-bold text-green-700 mb-8 pb-3 border-b-2 border-gray-200">
        {i18n.t('yieldPrediction')}
      </h2>

      <div className="bg-white p-6 rounded-xl shadow-lg mb-6">
        <p className="text-gray-600 mb-6">AI-powered yield predictions based on weather, soil, and crop data</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {i18n.t('selectField')}
            </label>
            <select
              value={selectedField}
              onChange={(e) => setSelectedField(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            >
              <option value="">{i18n.t('selectField')}</option>
              {mockData.fields.map((field, index) => (
                <option key={index} value={field}>{field}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {i18n.t('selectCrop')}
            </label>
            <select
              value={selectedCrop}
              onChange={(e) => setSelectedCrop(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            >
              <option value="">{i18n.t('selectCrop')}</option>
              {mockData.crops.map((crop, index) => (
                <option key={index} value={crop}>{crop}</option>
              ))}
            </select>
          </div>
        </div>

        <button
          onClick={generatePrediction}
          className="bg-green-700 text-white px-6 py-3 rounded-lg hover:bg-green-800 transition-colors duration-200 flex items-center gap-2"
        >
          <Calculator className="w-5 h-5" />
          {i18n.t('generatePrediction')}
        </button>
      </div>

      {prediction && (
        <div>
          <div className="bg-white p-6 rounded-xl shadow-lg mb-6">
            <h4 className="text-lg font-semibold text-gray-800 mb-4">
              Yield Prediction for {selectedCrop} in {selectedField}
            </h4>
            <div className="text-center py-6">
              <div className="text-4xl font-bold text-green-700 mb-2">{prediction.estimatedYield}</div>
              <div className="text-gray-600">Confidence: {prediction.confidence}</div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-lg mb-6">
            <h4 className="text-lg font-semibold text-gray-800 mb-6">Prediction Factors</h4>
            <div className="space-y-4">
              {Object.entries(prediction.factors).map(([key, value]) => {
                const status = getStatus(value);
                const Icon = factorIcons[key as keyof typeof factorIcons];
                const label = key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1');
                
                return (
                  <div key={key} className="flex items-center gap-4">
                    <Icon className="w-6 h-6 text-green-700 flex-shrink-0" />
                    <div className="flex-1">
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-medium text-gray-800">{label}</span>
                        <span className="text-gray-600">{Math.round(value * 100)}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className={`h-2 rounded-full transition-all duration-500 ${getProgressColor(status)}`}
                          style={{ width: `${value * 100}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-lg mb-6">
            <h4 className="text-lg font-semibold text-gray-800 mb-6 flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-green-700" />
              {i18n.t('historicalYield')}
            </h4>
            <div className="flex items-end justify-center gap-6 h-48">
              {['2021', '2022', '2023', '2024', '2025'].map((year, index) => {
                const height = 60 + Math.random() * 120;
                const isCurrentYear = index === 4;
                return (
                  <div key={index} className="text-center">
                    <div
                      className={`w-12 rounded-t-lg transition-all duration-500 ${
                        isCurrentYear ? 'bg-green-700' : 'bg-gray-400'
                      }`}
                      style={{ height: `${height}px` }}
                    ></div>
                    <div className="mt-2 text-sm font-medium text-gray-600">{year}</div>
                    <div className="text-xs text-gray-500">
                      {Math.round(height * 5)} kg
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      <div className="text-center">
        <button
          onClick={() => window.location.hash = '#home'}
          className="bg-green-700 text-white px-6 py-3 rounded-lg hover:bg-green-800 transition-colors duration-200 flex items-center gap-2 mx-auto"
        >
          <ArrowLeft className="w-4 h-4" />
          {i18n.t('backToHome')}
        </button>
      </div>
    </div>
  );
};