import { useState, useEffect, useCallback } from 'react';
import { i18n } from '../utils/i18n';
import { notificationManager } from '../utils/notifications';

interface VoiceAssistantHook {
  isListening: boolean;
  transcript: string;
  startListening: () => void;
  stopListening: () => void;
  changeLanguage: (lang: string) => void;
  currentLanguage: string;
}

declare global {
  interface Window {
    SpeechRecognition: any;
    webkitSpeechRecognition: any;
  }
}

export const useVoiceAssistant = (): VoiceAssistantHook => {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const [recognition, setRecognition] = useState<any>(null);
  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | null>(null);

  const getLanguageCode = (lang: string): string => {
    switch (lang) {
      case 'te': return 'te-IN';
      case 'hi': return 'hi-IN';
      default: return 'en-US';
    }
  };

  const processVoiceCommand = useCallback((commandAlternatives: string[]) => {
    let commandProcessed = false;

    for (const command of commandAlternatives) {
      const lowerCommand = command.toLowerCase();

      if (currentLanguage === 'en') {
        if (lowerCommand.includes('home') || lowerCommand.includes('main') || lowerCommand.includes('house')) {
          window.location.hash = '#home';
          notificationManager.show('Navigating to home', 'success');
          commandProcessed = true;
          break;
        } else if (lowerCommand.includes('scan') || lowerCommand.includes('crop') || lowerCommand.includes('plant')) {
          window.location.hash = '#scan';
          notificationManager.show('Navigating to crop scanner', 'success');
          commandProcessed = true;
          break;
        } else if (lowerCommand.includes('weather') || lowerCommand.includes('rain') || lowerCommand.includes('forecast')) {
          window.location.hash = '#weather';
          notificationManager.show('Navigating to weather', 'success');
          commandProcessed = true;
          break;
        } else if (lowerCommand.includes('nasa') || lowerCommand.includes('satellite') || lowerCommand.includes('data')) {
          window.location.hash = '#nasa';
          notificationManager.show('Navigating to NASA data', 'success');
          commandProcessed = true;
          break;
        } else if (lowerCommand.includes('expert') || lowerCommand.includes('advice') || lowerCommand.includes('help')) {
          window.location.hash = '#expert';
          notificationManager.show('Navigating to expert advice', 'success');
          commandProcessed = true;
          break;
        } else if (lowerCommand.includes('soil') || lowerCommand.includes('health') || lowerCommand.includes('test')) {
          window.location.hash = '#soil';
          notificationManager.show('Navigating to soil health', 'success');
          commandProcessed = true;
          break;
        } else if (lowerCommand.includes('forum') || lowerCommand.includes('community') || lowerCommand.includes('discuss')) {
          window.location.hash = '#forum';
          notificationManager.show('Navigating to community forum', 'success');
          commandProcessed = true;
          break;
        } else if (lowerCommand.includes('yield') || lowerCommand.includes('prediction') || lowerCommand.includes('harvest')) {
          window.location.hash = '#yield';
          notificationManager.show('Navigating to yield prediction', 'success');
          commandProcessed = true;
          break;
        }
      } else if (currentLanguage === 'te') {
        if (lowerCommand.includes('హోమ్') || lowerCommand.includes('ముఖ్య') || lowerCommand.includes('గృహ')) {
          window.location.hash = '#home';
          notificationManager.show('హోమ్‌కి నావిగేట్ చేస్తున్నారు', 'success');
          commandProcessed = true;
          break;
        } else if (lowerCommand.includes('స్కాన్') || lowerCommand.includes('పంట') || lowerCommand.includes('మొక్క')) {
          window.location.hash = '#scan';
          notificationManager.show('పంట స్కానర్‌కి నావిగేట్ చేస్తున్నారు', 'success');
          commandProcessed = true;
          break;
        }
      } else if (currentLanguage === 'hi') {
        if (lowerCommand.includes('होम') || lowerCommand.includes('मुख्य') || lowerCommand.includes('घर')) {
          window.location.hash = '#home';
          notificationManager.show('होम पर नेविगेट कर रहे हैं', 'success');
          commandProcessed = true;
          break;
        } else if (lowerCommand.includes('स्कैन') || lowerCommand.includes('फसल') || lowerCommand.includes('पौधा')) {
          window.location.hash = '#scan';
          notificationManager.show('फसल स्कैनर पर नेविगेट कर रहे हैं', 'success');
          commandProcessed = true;
          break;
        }
      }
    }

    if (!commandProcessed) {
      notificationManager.show('Command not recognized. Please try again.', 'error');
    }
  }, [currentLanguage]);

  useEffect(() => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      const recognitionInstance = new SpeechRecognition();
      recognitionInstance.continuous = false;
      recognitionInstance.interimResults = false;
      recognitionInstance.maxAlternatives = 3;

      recognitionInstance.onresult = (event: any) => {
        const results = event.results[0];
        const bestMatch = results[0].transcript;
        const alternatives: string[] = [];

        for (let i = 0; i < results.length; i++) {
          alternatives.push(results[i].transcript.toLowerCase());
        }

        setTranscript(bestMatch);
        processVoiceCommand(alternatives);
      };

      recognitionInstance.onerror = (event: any) => {
        console.error('Speech recognition error', event.error);
        notificationManager.show(`Speech recognition error: ${event.error}`, 'error');
        setIsListening(false);
        if (timeoutId) clearTimeout(timeoutId);
      };

      recognitionInstance.onend = () => {
        setIsListening(false);
        if (timeoutId) clearTimeout(timeoutId);
      };

      setRecognition(recognitionInstance);
    }
  }, [processVoiceCommand, timeoutId]);

  useEffect(() => {
    if (recognition) {
      recognition.lang = getLanguageCode(currentLanguage);
    }
  }, [currentLanguage, recognition]);

  const startListening = useCallback(() => {
    if (!recognition) {
      notificationManager.show(i18n.t('voiceNotSupported'), 'error');
      return;
    }

    try {
      recognition.start();
      setIsListening(true);
      setTranscript('');
      notificationManager.show('Voice assistant started. Speak now.', 'info');

      const id = setTimeout(() => {
        if (isListening) {
          stopListening();
          notificationManager.show('Listening timeout after 5 seconds', 'info');
        }
      }, 5000);

      setTimeoutId(id);
    } catch (error) {
      console.error('Error starting speech recognition:', error);
      notificationManager.show('Error starting voice assistant', 'error');
    }
  }, [recognition, isListening]);

  const stopListening = useCallback(() => {
    if (recognition) {
      recognition.stop();
    }
    setIsListening(false);
    setTranscript('');
    if (timeoutId) clearTimeout(timeoutId);
    notificationManager.show('Voice assistant stopped', 'info');
  }, [recognition, timeoutId]);

  const changeLanguage = useCallback((lang: string) => {
    setCurrentLanguage(lang);
    i18n.changeLanguage(lang);
    notificationManager.show(`Language changed to ${lang.toUpperCase()}`, 'success');
  }, []);

  return {
    isListening,
    transcript,
    startListening,
    stopListening,
    changeLanguage,
    currentLanguage
  };
};