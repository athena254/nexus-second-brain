'use client';

import { useEffect, useState } from 'react';

interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
}

export function useNotification() {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  const addNotification = (notification: Omit<Notification, 'id'>) => {
    const id = Date.now().toString();
    setNotifications(prev => [...prev, { ...notification, id }]);
    setTimeout(() => {
      setNotifications(prev => prev.filter(n => n.id !== id));
    }, 5000);
  };

  const removeNotification = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  return { notifications, addNotification, removeNotification };
}

export function NotificationContainer({ notifications, onRemove }: { 
  notifications: Notification[]; 
  onRemove: (id: string) => void;
}) {
  const colors = {
    info: 'bg-blue-500',
    success: 'bg-emerald-500',
    warning: 'bg-amber-500',
    error: 'bg-red-500'
  };

  const icons = {
    info: 'ℹ️',
    success: '✅',
    warning: '⚠️',
    error: '❌'
  };

  return (
    <div className="fixed bottom-4 right-4 z-50 space-y-2">
      {notifications.map((notification) => (
        <div
          key={notification.id}
          className="bg-slate-800 border-l-4 border-orange-500 rounded-lg p-4 shadow-lg max-w-sm animate-slide-in"
        >
          <div className="flex items-start gap-3">
            <span className="text-2xl">{icons[notification.type]}</span>
            <div className="flex-1">
              <h4 className="font-semibold text-white">{notification.title}</h4>
              <p className="text-sm text-slate-400">{notification.message}</p>
            </div>
            <button
              onClick={() => onRemove(notification.id)}
              className="text-slate-400 hover:text-white"
            >
              ✕
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
