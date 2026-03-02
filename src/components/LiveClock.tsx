'use client';

import { useState, useEffect } from 'react';

export function LiveClock() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true,
      timeZone: 'Africa/Nairobi'
    });
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      timeZone: 'Africa/Nairobi'
    });
  };

  return (
    <div className="text-right">
      <div className="text-2xl font-mono font-bold text-white">
        {formatTime(time)}
      </div>
      <div className="text-sm text-slate-400">
        {formatDate(time)} • EAT
      </div>
    </div>
  );
}
