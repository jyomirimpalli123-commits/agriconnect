import React from 'react';
import { Mic, MicOff, Languages } from 'lucide-react';
import { useVoiceAssistant } from '../hooks/useVoiceAssistant';
import { i18n } from '../utils/i18n';

export const VoiceAssistant: React.FC = () => {
  const { isListening, transcript, startListening, stopListening, changeLanguage, currentLanguage } = useVoiceAssistant();

  const languageOptions = [
    { value: 'en', label: 'English' },
    { value: 'te', label: 'తెలుగు' },
    { value: 'hi', label: 'हिंदी' }
  ];

  return (
    <div className="fixed bottom-5 right-5 z-40 flex flex-col items-end gap-3">
      <div className="flex items-center gap-2 bg-white px-3 py-2 rounded-full shadow-lg">
        <Languages className="w-4 h-4 text-green-700" />
        <select
          value={currentLanguage}
          onChange={(e) => changeLanguage(e.target.value)}
          className="bg-transparent border-none outline-none cursor-pointer text-sm font-medium"
        >
          {languageOptions.map(({ value, label }) => (
            <option key={value} value={value}>{label}</option>
          ))}
        </select>
      </div>

      <button
        onClick={isListening ? stopListening : startListening}
        className={`flex items-center gap-2 px-4 py-3 rounded-full shadow-lg transition-all duration-300 ${
          isListening 
            ? 'bg-red-500 hover:bg-red-600 animate-pulse' 
            : 'bg-green-500 hover:bg-green-600 hover:scale-105'
        } text-white font-medium`}
      >
        {isListening ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
        {isListening ? i18n.t('stopListening') : i18n.t('startListening')}
      </button>

      {isListening && (
        <div className="bg-white p-4 rounded-lg shadow-lg max-w-xs">
          <p className="text-center font-medium text-gray-800 mb-2">
            {i18n.t('listening')}...
          </p>
          {transcript && (
            <p className="text-center font-bold text-green-700 mb-3">{transcript}</p>
          )}
          
          <div className="text-xs text-gray-600">
            <p className="font-semibold mb-2">{i18n.t('availableCommands')}</p>
            <ul className="space-y-1">
              <li>• {i18n.t('commandHome')}</li>
              <li>• {i18n.t('commandScan')}</li>
              <li>• {i18n.t('commandWeather')}</li>
              <li>• {i18n.t('commandNASA')}</li>
              <li>• {i18n.t('commandExpert')}</li>
              <li>• {i18n.t('commandStop')}</li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};