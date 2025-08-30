import { useState, useEffect } from 'react';
import { i18n } from '../utils/i18n';

export const useI18n = () => {
  const [, forceUpdate] = useState({});

  useEffect(() => {
    const handleLanguageChange = () => {
      forceUpdate({});
    };

    i18n.addListener(handleLanguageChange);

    return () => {
      i18n.removeListener(handleLanguageChange);
    };
  }, []);

  return {
    t: (key: string) => i18n.t(key),
    changeLanguage: (lang: string) => i18n.changeLanguage(lang),
    currentLanguage: i18n.getCurrentLanguage()
  };
};