import React, { useState } from 'react';
import { Sprout } from 'lucide-react';
import { authManager } from '../utils/auth';
import { notificationManager } from '../utils/notifications';
import { i18n } from '../utils/i18n';

interface AuthPageProps {
  onLogin: () => void;
}

export const AuthPage: React.FC<AuthPageProps> = ({ onLogin }) => {
  const [activeTab, setActiveTab] = useState<'login' | 'register'>('login');
  const [loginData, setLoginData] = useState({ username: '', password: '' });
  const [registerData, setRegisterData] = useState({
    name: '',
    username: '',
    password: '',
    confirmPassword: '',
    phone: '',
    location: ''
  });

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!loginData.username || !loginData.password) {
      notificationManager.show('Please enter both username and password', 'error');
      return;
    }

    const user = authManager.login(loginData.username, loginData.password);
    
    if (user) {
      notificationManager.show(`Welcome back, ${user.name}!`, 'success');
      onLogin();
    } else {
      notificationManager.show('Invalid username or password', 'error');
    }
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!registerData.name || !registerData.username || !registerData.password || !registerData.confirmPassword) {
      notificationManager.show('Please fill in all required fields', 'error');
      return;
    }

    if (registerData.password !== registerData.confirmPassword) {
      notificationManager.show('Passwords do not match', 'error');
      return;
    }

    const success = authManager.register({
      name: registerData.name,
      username: registerData.username,
      password: registerData.password,
      phone: registerData.phone,
      location: registerData.location
    });

    if (success) {
      notificationManager.show('Account created successfully! You can now login.', 'success');
      setActiveTab('login');
      setRegisterData({
        name: '',
        username: '',
        password: '',
        confirmPassword: '',
        phone: '',
        location: ''
      });
    } else {
      notificationManager.show('Username already exists', 'error');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 flex items-center justify-center p-5">
      <div className="bg-white rounded-xl shadow-xl p-8 w-full max-w-md">
        <div className="text-center mb-8">
          <Sprout className="w-16 h-16 text-green-700 mx-auto mb-4" />
          <h1 className="text-3xl font-bold text-green-700">AgriConnect</h1>
          <p className="text-gray-600 mt-2">Farmer Assistance System</p>
        </div>

        <div className="flex mb-6 border-b border-gray-200">
          <button
            className={`flex-1 py-3 text-center font-medium transition-colors ${
              activeTab === 'login'
                ? 'text-green-700 border-b-2 border-green-700'
                : 'text-gray-500 hover:text-gray-700'
            }`}
            onClick={() => setActiveTab('login')}
          >
            {i18n.t('login')}
          </button>
          <button
            className={`flex-1 py-3 text-center font-medium transition-colors ${
              activeTab === 'register'
                ? 'text-green-700 border-b-2 border-green-700'
                : 'text-gray-500 hover:text-gray-700'
            }`}
            onClick={() => setActiveTab('register')}
          >
            {i18n.t('register')}
          </button>
        </div>

        {activeTab === 'login' ? (
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {i18n.t('username')}
              </label>
              <input
                type="text"
                value={loginData.username}
                onChange={(e) => setLoginData({ ...loginData, username: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder="Enter your username"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {i18n.t('password')}
              </label>
              <input
                type="password"
                value={loginData.password}
                onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder="Enter your password"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-green-700 text-white py-3 rounded-lg font-medium hover:bg-green-800 transition-colors"
            >
              {i18n.t('login')}
            </button>
          </form>
        ) : (
          <form onSubmit={handleRegister} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {i18n.t('fullName')} *
              </label>
              <input
                type="text"
                value={registerData.name}
                onChange={(e) => setRegisterData({ ...registerData, name: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder="Enter your full name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {i18n.t('username')} *
              </label>
              <input
                type="text"
                value={registerData.username}
                onChange={(e) => setRegisterData({ ...registerData, username: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder="Choose a username"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {i18n.t('password')} *
              </label>
              <input
                type="password"
                value={registerData.password}
                onChange={(e) => setRegisterData({ ...registerData, password: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder="Create a password"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {i18n.t('confirmPassword')} *
              </label>
              <input
                type="password"
                value={registerData.confirmPassword}
                onChange={(e) => setRegisterData({ ...registerData, confirmPassword: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder="Confirm your password"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {i18n.t('phoneNumber')}
              </label>
              <input
                type="tel"
                value={registerData.phone}
                onChange={(e) => setRegisterData({ ...registerData, phone: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder="Enter your phone number"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {i18n.t('location')}
              </label>
              <input
                type="text"
                value={registerData.location}
                onChange={(e) => setRegisterData({ ...registerData, location: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder="Enter your location"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-green-700 text-white py-3 rounded-lg font-medium hover:bg-green-800 transition-colors"
            >
              {i18n.t('createAccount')}
            </button>
          </form>
        )}

        <div className="mt-6 text-center text-sm text-gray-600">
          {activeTab === 'login' ? (
            <p>
              {i18n.t('dontHaveAccount')}{' '}
              <button
                onClick={() => setActiveTab('register')}
                className="text-green-700 font-medium hover:underline"
              >
                {i18n.t('registerHere')}
              </button>
            </p>
          ) : (
            <p>
              {i18n.t('alreadyHaveAccount')}{' '}
              <button
                onClick={() => setActiveTab('login')}
                className="text-green-700 font-medium hover:underline"
              >
                {i18n.t('loginHere')}
              </button>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};