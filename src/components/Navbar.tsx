import React from 'react';
import { Home, Camera, Satellite, Cloud, Phone, Beaker, TrendingUp, Users, LogOut } from 'lucide-react';
import { i18n } from '../utils/i18n';
import { useVoiceAssistant } from '../hooks/useVoiceAssistant';
import { authManager } from '../utils/auth';
import { notificationManager } from '../utils/notifications';

interface NavbarProps {
  currentPage: string;
  onLogout: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentPage, onLogout }) => {
  const { currentLanguage, changeLanguage } = useVoiceAssistant();
  const currentUser = authManager.getCurrentUser();

  const navItems = [
    { id: 'home', icon: Home, key: 'home' },
    { id: 'scan', icon: Camera, key: 'scanCrop' },
    { id: 'soil', icon: Beaker, key: 'soilAnalysis' },
    { id: 'yield', icon: TrendingUp, key: 'yieldPrediction' },
    { id: 'nasa', icon: Satellite, key: 'viewSatellite' },
    { id: 'weather', icon: Cloud, key: 'weather' },
    { id: 'expert', icon: Phone, key: 'expertAdvice' }
    { id: 'forum', icon: Users, key: 'communityForum' }
  ];

  const handleNavigation = (page: string) => {
    window.location.hash = `#${page}`;
  };

  const handleLogout = () => {
    authManager.logout();
    notificationManager.show('Logged out successfully', 'success');
    onLogout();
  };
  return (
    <nav className="bg-gradient-to-r from-green-700 to-green-500 text-white p-4 rounded-xl mb-5 shadow-lg">
      <div className="flex flex-col lg:flex-row justify-between items-center gap-4">
        <div className="flex items-center gap-3">
          <span className="text-2xl">🌱</span>
          <div>
            <h1 className="text-2xl font-bold">AgriConnect</h1>
            {currentUser && (
              <p className="text-sm text-green-100">Welcome, {currentUser.name}</p>
            )}
          </div>
        </div>

        <div className="flex flex-wrap justify-center gap-3">
          {navItems.map(({ id, icon: Icon, key }) => (
            <button
              key={id}
              onClick={() => handleNavigation(id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-200 hover:bg-white/20 ${
                currentPage === id ? 'bg-white/20' : ''
              }`}
            >
              <Icon className="w-4 h-4" />
              {i18n.t(key)}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <select
            value={currentLanguage}
            onChange={(e) => changeLanguage(e.target.value)}
            className="px-3 py-2 rounded-lg bg-white text-green-700 font-semibold cursor-pointer"
          >
            <option value="en">EN</option>
            <option value="te">TE</option>
            <option value="hi">HI</option>
          </select>
          
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-red-500 hover:bg-red-600 transition-colors duration-200"
          >
            <LogOut className="w-4 h-4" />
            {i18n.t('logout')}
          </button>
        </div>
      </div>
    </nav>
  );
};