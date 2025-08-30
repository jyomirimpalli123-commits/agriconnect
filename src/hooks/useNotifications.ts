import { useState, useEffect } from 'react';
import { notificationManager } from '../utils/notifications';
import type { NotificationState } from '../types';

export const useNotifications = (): NotificationState => {
  const [notification, setNotification] = useState<NotificationState>(
    notificationManager.getState()
  );

  useEffect(() => {
    const handleNotificationChange = (state: NotificationState) => {
      setNotification(state);
    };

    notificationManager.addListener(handleNotificationChange);

    return () => {
      notificationManager.removeListener(handleNotificationChange);
    };
  }, []);

  return notification;
};