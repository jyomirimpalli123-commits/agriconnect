import React, { useState, useEffect } from 'react';
import { AuthPage } from './components/AuthPage';
import { Navbar } from './components/Navbar';
import { VoiceAssistant } from './components/VoiceAssistant';
import { Notification } from './components/Notification';
import { HomePage } from './components/HomePage';
import { CropScanPage } from './components/CropScanPage';
import { SoilAnalysisPage } from './components/SoilAnalysisPage';
import { YieldPredictionPage } from './components/YieldPredictionPage';
import { NASAPage } from './components/NASAPage';
import { WeatherPage } from './components/WeatherPage';
import { ExpertAdvicePage } from './components/ExpertAdvicePage';
import { CommunityForumPage } from './components/CommunityForumPage';
import { useNotifications } from './hooks/useNotifications';
import { authManager } from './utils/auth';

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const notification = useNotifications();

  useEffect(() => {
    // Check if user is already logged in
    setIsAuthenticated(authManager.isLoggedIn());

    const handleHashChange = () => {
      const hash = window.location.hash.substring(1) || 'home';
      setCurrentPage(hash);
    };

    window.addEventListener('hashchange', handleHashChange);
    handleHashChange(); // Initial page load

    return () => {
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, []);

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setCurrentPage('home');
    window.location.hash = '#home';
  };

  if (!isAuthenticated) {
    return (
      <div>
        <Notification {...notification} />
        <AuthPage onLogin={handleLogin} />
      </div>
    );
  }

  const renderPage = () => {
    switch (currentPage) {
      case 'scan': return <CropScanPage />;
      case 'soil': return <SoilAnalysisPage />;
      case 'yield': return <YieldPredictionPage />;
      case 'nasa': return <NASAPage />;
      case 'weather': return <WeatherPage />;
      case 'expert': return <ExpertAdvicePage />;
      case 'forum': return <CommunityForumPage />;
      default: return <HomePage />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="max-w-7xl mx-auto p-5">
        <Navbar currentPage={currentPage} onLogout={handleLogout} />
        <Notification {...notification} />
        <main className="bg-white rounded-xl p-6 shadow-lg min-h-96">
          {renderPage()}
        </main>
        <VoiceAssistant />
      </div>
    </div>
  );
}

export default App;