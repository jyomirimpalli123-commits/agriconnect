import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { VoiceAssistant } from './components/VoiceAssistant';
import { Notification } from './components/Notification';
import { HomePage } from './components/HomePage';
import { CropScanPage } from './components/CropScanPage';
import { NASAPage } from './components/NASAPage';
import { WeatherPage } from './components/WeatherPage';
import { ExpertAdvicePage } from './components/ExpertAdvicePage';
import { useNotifications } from './hooks/useNotifications';

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const notification = useNotifications();

  useEffect(() => {
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

  const renderPage = () => {
    switch (currentPage) {
      case 'scan': return <CropScanPage />;
      case 'nasa': return <NASAPage />;
      case 'weather': return <WeatherPage />;
      case 'expert': return <ExpertAdvicePage />;
      default: return <HomePage />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="max-w-7xl mx-auto p-5">
        <Navbar currentPage={currentPage} />
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