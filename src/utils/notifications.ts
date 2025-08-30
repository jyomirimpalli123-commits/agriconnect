import type { NotificationState } from '../types';

export class NotificationManager {
  private state: NotificationState = { show: false, message: '', type: 'info' };
  private listeners: ((state: NotificationState) => void)[] = [];

  show(message: string, type: 'info' | 'success' | 'error' = 'info') {
    this.state = { show: true, message, type };
    this.notifyListeners();
    
    // Auto-hide after 3 seconds
    setTimeout(() => {
      this.hide();
    }, 3000);
  }

  hide() {
    this.state = { ...this.state, show: false };
    this.notifyListeners();
  }

  getState(): NotificationState {
    return this.state;
  }

  addListener(callback: (state: NotificationState) => void) {
    this.listeners.push(callback);
  }

  removeListener(callback: (state: NotificationState) => void) {
    this.listeners = this.listeners.filter(listener => listener !== callback);
  }

  private notifyListeners() {
    this.listeners.forEach(listener => listener(this.state));
  }
}

export const notificationManager = new NotificationManager();