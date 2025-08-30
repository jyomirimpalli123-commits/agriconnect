import React, { useEffect } from 'react';
import { CheckCircle, XCircle, Info } from 'lucide-react';
import type { NotificationState } from '../types';

interface NotificationProps extends NotificationState {}

export const Notification: React.FC<NotificationProps> = ({ message, type, show }) => {
  const getIcon = () => {
    switch (type) {
      case 'success': return <CheckCircle className="w-5 h-5" />;
      case 'error': return <XCircle className="w-5 h-5" />;
      default: return <Info className="w-5 h-5" />;
    }
  };

  const getBorderColor = () => {
    switch (type) {
      case 'success': return 'border-green-500';
      case 'error': return 'border-red-500';
      default: return 'border-blue-500';
    }
  };

  if (!show) return null;

  return (
    <div className={`fixed top-5 right-5 bg-white p-4 rounded-lg shadow-lg border-l-4 ${getBorderColor()} flex items-center gap-3 z-50 transform transition-transform duration-300 ${show ? 'translate-x-0' : 'translate-x-full'}`}>
      {getIcon()}
      <span className="text-gray-800">{message}</span>
    </div>
  );
};