'use client';

import React, { useState, useEffect } from 'react';

export const Footer: React.FC = () => {
  const [timeStr, setTimeStr] = useState<string>('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTimeStr(now.toLocaleTimeString('en-US', { timeZone: 'Asia/Kolkata', hour: '2-digit', minute: '2-digit', hour12: false }) + ' IST');
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <footer
      style={{
        padding: '3rem 0',
        borderTop: '1px solid var(--border-light)',
        fontFamily: 'var(--font-mono)',
        fontSize: '0.8rem',
        color: 'var(--fg-muted)',
      }}
    >
      <div
        className="container"
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '1rem',
        }}
      >
        <div>NEVIN M © {new Date().getFullYear()}</div>
        <div>LOCAL TIME: {timeStr || '19:07 IST'}</div>
      </div>
    </footer>
  );
};
