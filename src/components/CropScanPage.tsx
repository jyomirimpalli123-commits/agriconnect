import React, { useState } from 'react';
import { Upload, RotateCcw, Search, Camera } from 'lucide-react';
import { i18n } from '../utils/i18n';
import { mockData } from '../data/mockData';
import { notificationManager } from '../utils/notifications';
import type { CropPrediction } from '../types';

export const CropScanPage: React.FC = () => {
  const [image, setImage] = useState<string | null>(null);
  const [isScanning, setIsScanning] = useState(false);
  const [prediction, setPrediction] = useState<CropPrediction | null>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImage(e.target?.result as string);
        setPrediction(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleScan = () => {
    if (!image) return;

    setIsScanning(true);

    // Simulate AI processing
    setTimeout(() => {
      const randomCrop = mockData.crops[Math.floor(Math.random() * mockData.crops.length)];
      setPrediction({
        cropType: randomCrop,
        confidence: Math.random() * 0.3 + 0.7, // 70-100% confidence
        diseases: mockData.diseases[randomCrop] || [],
        recommendations: mockData.recommendations[randomCrop] || []
      });
      setIsScanning(false);
      notificationManager.show('Crop analysis completed successfully', 'success');
    }, 2000);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-green-700 mb-3">{i18n.t('cropHealthScanner')}</h2>
        <p className="text-gray-600 text-lg">{i18n.t('scanDescription')}</p>
      </div>

      <div className="mb-8">
        {!image ? (
          <label 
            htmlFor="crop-image" 
            className="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed border-green-500 rounded-xl cursor-pointer bg-green-50 hover:bg-green-100 transition-colors duration-200"
          >
            <Upload className="w-16 h-16 text-green-600 mb-4" />
            <p className="text-lg font-medium text-green-700">{i18n.t('uploadImage')}</p>
            <input
              id="crop-image"
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
            />
          </label>
        ) : (
          <div className="text-center">
            <img 
              src={image} 
              alt="Crop preview" 
              className="max-w-full max-h-80 mx-auto rounded-xl shadow-lg mb-6"
            />
            <div className="flex justify-center gap-4">
              <button
                onClick={() => setImage(null)}
                className="flex items-center gap-2 bg-gray-500 text-white px-6 py-3 rounded-lg hover:bg-gray-600 transition-colors duration-200"
              >
                <RotateCcw className="w-4 h-4" />
                {i18n.t('retake')}
              </button>
              <button
                onClick={handleScan}
                disabled={isScanning}
                className="flex items-center gap-2 bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
              >
                <Search className="w-4 h-4" />
                {isScanning ? i18n.t('scanning') : i18n.t('analyzeImage')}
              </button>
            </div>
          </div>
        )}
      </div>

      {prediction && (
        <div className="bg-gray-50 p-6 rounded-xl">
          <h3 className="text-2xl font-bold text-green-700 mb-6">{i18n.t('analysisResults')}</h3>
          
          <div className="bg-white p-4 rounded-lg shadow-sm mb-4">
            <h4 className="font-semibold text-gray-800 mb-2">{i18n.t('cropType')}</h4>
            <p className="text-lg">
              {prediction.cropType} ({Math.round(prediction.confidence * 100)}% {i18n.t('confidence')})
            </p>
          </div>

          {prediction.diseases.length > 0 && (
            <div className="bg-white p-4 rounded-lg shadow-sm mb-4">
              <h4 className="font-semibold text-gray-800 mb-3">{i18n.t('diseaseDetection')}</h4>
              <div className="space-y-2">
                {prediction.diseases.map((disease, index) => (
                  <div key={index} className="flex justify-between items-center py-2 border-b border-gray-100 last:border-b-0">
                    <span className="font-medium">{disease.name}</span>
                    <div className="flex gap-4 text-sm">
                      <span className={`px-2 py-1 rounded ${
                        disease.severity === 'High' ? 'bg-red-100 text-red-700' :
                        disease.severity === 'Medium' ? 'bg-yellow-100 text-yellow-700' :
                        'bg-green-100 text-green-700'
                      }`}>
                        {disease.severity}
                      </span>
                      <span className="text-gray-600">
                        {Math.round(disease.probability * 100)}% {i18n.t('probability')}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="bg-white p-4 rounded-lg shadow-sm">
            <h4 className="font-semibold text-gray-800 mb-3">{i18n.t('recommendations')}</h4>
            <ul className="space-y-2 pl-5">
              {prediction.recommendations.map((rec, index) => (
                <li key={index} className="relative before:content-['•'] before:text-green-600 before:font-bold before:absolute before:-ml-5">
                  {rec}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};