import type { User } from '../types';

export class AuthManager {
  private storageKey = 'agriConnectUsers';
  private sessionKey = 'currentUser';

  getUsers(): User[] {
    return JSON.parse(localStorage.getItem(this.storageKey) || '[]');
  }

  saveUser(user: User): void {
    const users = this.getUsers();
    users.push(user);
    localStorage.setItem(this.storageKey, JSON.stringify(users));
  }

  login(username: string, password: string): User | null {
    const users = this.getUsers();
    const user = users.find(u => u.username === username && u.password === password);
    
    if (user) {
      sessionStorage.setItem(this.sessionKey, JSON.stringify(user));
      return user;
    }
    
    return null;
  }

  register(userData: Omit<User, 'joinDate'>): boolean {
    const users = this.getUsers();
    
    // Check if username already exists
    if (users.some(u => u.username === userData.username)) {
      return false;
    }

    const newUser: User = {
      ...userData,
      joinDate: new Date().toISOString()
    };

    this.saveUser(newUser);
    return true;
  }

  getCurrentUser(): User | null {
    const userStr = sessionStorage.getItem(this.sessionKey);
    return userStr ? JSON.parse(userStr) : null;
  }

  logout(): void {
    sessionStorage.removeItem(this.sessionKey);
  }

  isLoggedIn(): boolean {
    return this.getCurrentUser() !== null;
  }
}

export const authManager = new AuthManager();