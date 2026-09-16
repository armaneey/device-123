'use client';

import React, { useState, useEffect } from 'react';
import { Calendar, Monitor } from 'lucide-react';
import { useDeviceInfo } from '@/hooks/useDeviceInfo';

type ThemeMode = 'sys' | 'dark' | 'light';

export default function DashboardHeader() {
  const { currentTime, isOnline } = useDeviceInfo();

  // Always start with SYS during SSR and initial hydration
  const [theme, setTheme] = useState<ThemeMode>('sys');

  // Load saved theme after hydration
  useEffect(() => {
    const savedTheme = localStorage.getItem('app-theme');

    if (
      savedTheme === 'sys' ||
      savedTheme === 'dark' ||
      savedTheme === 'light'
    ) {
      // Defer the state update so hydration completes before synchronizing
      // with the persisted browser preference.
      const timeoutId = window.setTimeout(() => setTheme(savedTheme), 0);
      return () => window.clearTimeout(timeoutId);
    }
  }, []);

  // Apply the selected theme
  useEffect(() => {
    const root = document.documentElement;

    if (theme === 'sys') {
      root.removeAttribute('data-theme');
    } else {
      root.setAttribute('data-theme', theme);
    }

    localStorage.setItem('app-theme', theme);
  }, [theme]);

  const applyTheme = (mode: ThemeMode) => {
    setTheme(mode);
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
    });
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false,
    });
  };

  return (
    <header className="border-b border-[var(--border-color)] bg-[var(--bg-header)] transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="bg-[var(--bg-card)] p-3 rounded-xl border border-[var(--border-color)] text-[var(--accent-color)] shadow-inner">
              <Monitor className="w-5 h-5" />
            </div>

            <div>
              <h1 className="text-xl font-bold text-[var(--text-main)] tracking-tight">
                Device Information
              </h1>

              <p className="text-[var(--text-muted)] text-xs mt-0.5">
                Real-time browser and device telemetry
              </p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center bg-[var(--bg-input)] border border-[var(--border-color)] rounded-xl p-1 text-[11px] font-mono">

              <button
                type="button"
                onClick={() => applyTheme('sys')}
                className={`px-2.5 py-1 rounded-lg transition-all ${
                  theme === 'sys'
                    ? 'bg-[var(--bg-button-hover)] text-[var(--text-main)] font-semibold shadow-sm'
                    : 'text-[var(--text-muted)] hover:text-[var(--text-main)]'
                }`}
              >
                SYS
              </button>

              <button
                type="button"
                onClick={() => applyTheme('dark')}
                className={`px-2.5 py-1 rounded-lg transition-all ${
                  theme === 'dark'
                    ? 'bg-[var(--bg-button-hover)] text-[var(--text-main)] font-semibold shadow-sm'
                    : 'text-[var(--text-muted)] hover:text-[var(--text-main)]'
                }`}
              >
                DARK
              </button>

              <button
                type="button"
                onClick={() => applyTheme('light')}
                className={`px-2.5 py-1 rounded-lg transition-all ${
                  theme === 'light'
                    ? 'bg-[var(--bg-button-hover)] text-[var(--text-main)] font-semibold shadow-sm'
                    : 'text-[var(--text-muted)] hover:text-[var(--text-main)]'
                }`}
              >
                LIGHT
              </button>

            </div>
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-[var(--bg-card)] border border-[var(--border-color)] text-xs font-semibold">
              <span
                className={`w-2 h-2 rounded-full ${
                  isOnline
                    ? 'bg-emerald-400 animate-pulse'
                    : 'bg-rose-400'
                }`}
              />

              <span
                className={
                  isOnline
                    ? 'text-emerald-400'
                    : 'text-rose-400'
                }
              >
                {isOnline ? 'Online' : 'Offline'}
              </span>
            </div>
            <div className="text-right pl-2">
              <div className="text-[11px] text-[var(--text-muted)] font-medium flex items-center gap-1.5 justify-end">
                <Calendar className="w-3 h-3 text-[var(--accent-color)]" />
                {currentTime ? formatDate(currentTime) : '---'}
              </div>

              <div className="text-lg font-mono font-bold text-[var(--accent-color)] tracking-wider mt-0.5">
                {currentTime ? formatTime(currentTime) : '--:--:--'}
              </div>
            </div>

          </div>
        </div>
      </div>
    </header>
  );
}