import { resources } from '../data/translations';
import type { Translation } from '../types';

export class I18n {
  private language: string = 'en';
  private listeners: (() => void)[] = [];

  changeLanguage(lang: string) {
    this.language = lang;
    this.notifyListeners();
  }

  t(key: string): string {
    return resources[this.language]?.translation[key] || key;
  }

  getCurrentLanguage(): string {
    return this.language;
  }

  addListener(callback: () => void) {
    this.listeners.push(callback);
  }

  removeListener(callback: () => void) {
    this.listeners = this.listeners.filter(listener => listener !== callback);
  }

  private notifyListeners() {
    this.listeners.forEach(listener => listener());
  }
}

export const i18n = new I18n();