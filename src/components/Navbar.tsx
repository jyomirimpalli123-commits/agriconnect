import React from 'react';
import { Home, Camera, Satellite, Cloud, Phone } from 'lucide-react';
import { i18n } from '../utils/i18n';
import { useVoiceAssistant } from '../hooks/useVoiceAssistant';

interface NavbarProps {
  currentPage: string;
}

export const Navbar: React.FC<NavbarProps> = ({ currentPage }) => {
  const { currentLanguage, changeLanguage } = useVoiceAssistant();

  const navItems = [
    { id: 'home', icon: Home, key: 'home' },
    { id: 'scan', icon: Camera, key: 'scanCrop' },
    { id: 'nasa', icon: Satellite, key: 'viewSatellite' },
    { id: 'weather', icon: Cloud, key: 'weather' },
    { id: 'expert', icon: Phone, key: 'expertAdvice' }
  ];

  const handleNavigation = (page: string) => {
    window.location.hash = `#${page}`;
  };

  return (
    <nav className="bg-gradient-to-r from-green-700 to-green-500 text-white p-4 rounded-xl mb-5 shadow-lg">
      <div className="flex flex-col lg:flex-row justify-between items-center gap-4">
        <div className="flex items-center gap-3">
          <span className="text-2xl">🌱</span>
          <h1 className="text-2xl font-bold">AgriConnect</h1>
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

        <select
          value={currentLanguage}
          onChange={(e) => changeLanguage(e.target.value)}
          className="px-3 py-2 rounded-lg bg-white text-green-700 font-semibold cursor-pointer"
        >
          <option value="en">EN</option>
          <option value="te">TE</option>
          <option value="hi">HI</option>
        </select>
      </div>
    </nav>
  );
};