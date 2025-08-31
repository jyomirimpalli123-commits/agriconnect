import React, { useState, useEffect } from 'react';
import { ArrowLeft, Plus, X, Beaker, TrendingUp } from 'lucide-react';
import { i18n } from '../utils/i18n';
import { soilAnalysisManager } from '../utils/soilAnalysis';
import { notificationManager } from '../utils/notifications';
import type { SoilTest } from '../types';

export const SoilAnalysisPage: React.FC = () => {
  const [soilTests, setSoilTests] = useState<SoilTest[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [newTest, setNewTest] = useState({
    pH: '',
    nitrogen: '',
    phosphorus: '',
    potassium: ''
  });

  useEffect(() => {
    setSoilTests(soilAnalysisManager.getSoilTests());
  }, []);

  const handleInputChange = (field: string, value: string) => {
    setNewTest({
      ...newTest,
      [field]: value
    });
  };

  const handleSubmitTest = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newTest.pH || !newTest.nitrogen || !newTest.phosphorus || !newTest.potassium) {
      notificationManager.show('Please fill all fields', 'error');
      return;
    }

    const test: SoilTest = {
      id: Date.now(),
      ...newTest,
      date: new Date().toLocaleDateString()
    };

    soilAnalysisManager.saveSoilTest(test);
    setSoilTests(soilAnalysisManager.getSoilTests());
    
    setShowForm(false);
    setNewTest({
      pH: '',
      nitrogen: '',
      phosphorus: '',
      potassium: ''
    });
    
    notificationManager.show('Soil test recorded successfully', 'success');
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'optimal': return 'bg-green-500 text-white';
      case 'good': return 'bg-green-400 text-white';
      case 'fair': return 'bg-yellow-500 text-black';
      case 'poor': return 'bg-red-500 text-white';
      default: return 'bg-gray-500 text-white';
    }
  };

  return (
    <div className="max-w-6xl mx-auto">
      <h2 className="text-3xl font-bold text-green-700 mb-8 pb-3 border-b-2 border-gray-200">
        {i18n.t('soilHealth')}
      </h2>

      {soilTests.length === 0 && !showForm ? (
        <div className="text-center py-16">
          <Beaker className="w-24 h-24 text-gray-300 mx-auto mb-6" />
          <h3 className="text-xl font-semibold text-gray-600 mb-4">{i18n.t('noTests')}</h3>
          <p className="text-gray-500 mb-8 max-w-md mx-auto">{i18n.t('noTestsDesc')}</p>
          <button
            onClick={() => setShowForm(true)}
            className="bg-green-700 text-white px-6 py-3 rounded-lg hover:bg-green-800 transition-colors duration-200 flex items-center gap-2 mx-auto"
          >
            <Plus className="w-5 h-5" />
            {i18n.t('recordFirstTest')}
          </button>
        </div>
      ) : (
        <div>
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-semibold text-gray-800">{i18n.t('soilTests')}</h3>
            <button
              onClick={() => setShowForm(!showForm)}
              className={`px-4 py-2 rounded-lg transition-colors duration-200 flex items-center gap-2 ${
                showForm 
                  ? 'bg-gray-500 hover:bg-gray-600 text-white' 
                  : 'bg-green-700 hover:bg-green-800 text-white'
              }`}
            >
              {showForm ? <X className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
              {showForm ? 'Cancel' : i18n.t('recordTest')}
            </button>
          </div>

          {showForm && (
            <div className="bg-white p-6 rounded-xl shadow-lg mb-6">
              <h4 className="text-lg font-semibold text-gray-800 mb-4">Record New Soil Test</h4>
              <form onSubmit={handleSubmitTest}>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {i18n.t('pHLevel')}
                    </label>
                    <input
                      type="number"
                      step="0.1"
                      min="0"
                      max="14"
                      value={newTest.pH}
                      onChange={(e) => handleInputChange('pH', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      placeholder="6.5"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {i18n.t('nitrogen')} (mg/kg)
                    </label>
                    <input
                      type="number"
                      min="0"
                      value={newTest.nitrogen}
                      onChange={(e) => handleInputChange('nitrogen', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      placeholder="45"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {i18n.t('phosphorus')} (mg/kg)
                    </label>
                    <input
                      type="number"
                      min="0"
                      value={newTest.phosphorus}
                      onChange={(e) => handleInputChange('phosphorus', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      placeholder="30"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {i18n.t('potassium')} (mg/kg)
                    </label>
                    <input
                      type="number"
                      min="0"
                      value={newTest.potassium}
                      onChange={(e) => handleInputChange('potassium', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      placeholder="150"
                    />
                  </div>
                </div>
                <button
                  type="submit"
                  className="bg-green-700 text-white px-6 py-3 rounded-lg hover:bg-green-800 transition-colors duration-200"
                >
                  Save Test
                </button>
              </form>
            </div>
          )}

          {soilTests.length > 0 && (
            <div>
              <div className="bg-white p-6 rounded-xl shadow-lg mb-6">
                <h4 className="text-lg font-semibold text-gray-800 mb-4">
                  Latest Test - {soilTests[0].date}
                </h4>
                
                <div className="space-y-4">
                  {[
                    { key: 'pH', label: i18n.t('pHLevel'), value: soilTests[0].pH, unit: '', optimal: 'Optimal: 6.0-7.5' },
                    { key: 'nitrogen', label: i18n.t('nitrogen'), value: soilTests[0].nitrogen, unit: 'mg/kg', optimal: 'Good: >40 mg/kg' },
                    { key: 'phosphorus', label: i18n.t('phosphorus'), value: soilTests[0].phosphorus, unit: 'mg/kg', optimal: 'Good: >25 mg/kg' },
                    { key: 'potassium', label: i18n.t('potassium'), value: soilTests[0].potassium, unit: 'mg/kg', optimal: 'Good: >120 mg/kg' }
                  ].map(({ key, label, value, unit, optimal }) => {
                    const status = soilAnalysisManager.getStatus(parseFloat(value), key as any);
                    return (
                      <div key={key} className="flex justify-between items-center py-3 border-b border-gray-100 last:border-b-0">
                        <div>
                          <div className="font-medium text-gray-800">{label}</div>
                          <div className="text-sm text-gray-500">{optimal}</div>
                        </div>
                        <div className="text-right">
                          <div className="font-bold text-gray-800">{value} {unit}</div>
                          <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(status)}`}>
                            {i18n.t(status)}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-lg mb-6">
                <h4 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-green-700" />
                  {i18n.t('soilGuide')}
                </h4>
                <p className="text-gray-600 mb-4">Based on your soil test results, here are some recommendations:</p>
                <ul className="space-y-2">
                  {soilAnalysisManager.getRecommendations(soilTests[0]).map((recommendation, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <span className="w-2 h-2 bg-green-600 rounded-full mt-2 flex-shrink-0"></span>
                      <span className="text-gray-700">{recommendation}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>
      )}

      <div className="text-center mt-8">
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