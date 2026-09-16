'use client';

import React from 'react';
import { useDeviceInfo } from '@/hooks/useDeviceInfo';

export default function Overview() {
  const {
    currentTime,
    timezone,
    isOnline,
    isLoading,
    hardwareConcurrency,
    screenWidth,
    screenHeight,
  } = useDeviceInfo();

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false,
    });
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
    });
  };

  if (isLoading || !currentTime) {
    return (
      <div className="w-full bg-[var(--bg-card)] border border-[var(--border-color)] rounded-2xl p-6 text-[var(--text-muted)] text-sm text-center font-mono">
        Initializing telemetry streams...
      </div>
    );
  }

  return (
    <div className="w-full bg-[var(--bg-card)] border border-[var(--border-color)] rounded-2xl p-6 shadow-2xl">
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6 divide-y sm:divide-y-0 lg:divide-x divide-[var(--border-color)]">

        <div className="flex flex-col justify-center px-2 pt-3 sm:pt-0">
          <span className="text-[10px] uppercase font-bold tracking-widest text-[var(--text-muted)]">
            Live Time
          </span>

          <span className="font-mono text-lg font-bold text-[var(--text-main)] mt-1">
            {formatTime(currentTime)}
          </span>
        </div>

        <div className="flex flex-col justify-center px-2 pt-3 sm:pt-0">
          <span className="text-[10px] uppercase font-bold tracking-widest text-[var(--text-muted)]">
            Date
          </span>

          <span className="font-mono text-xs font-semibold text-[var(--text-main)] mt-1 truncate">
            {formatDate(currentTime)}
          </span>
        </div>

        <div className="flex flex-col justify-center px-2 pt-3 sm:pt-0 min-w-0 overflow-hidden">
          <span className="text-[10px] uppercase font-bold tracking-widest text-[var(--text-muted)]">
            Timezone
          </span>

          <span
            className="font-mono text-xs font-semibold text-[var(--accent-color)] truncate mt-1"
            title={timezone}
          >
            {timezone || 'N/A'}
          </span>
        </div>

        <div className="flex flex-col justify-center px-2 pt-3 sm:pt-0">
          <span className="text-[10px] uppercase font-bold tracking-widest text-[var(--text-muted)]">
            Status
          </span>

          <span
            className={`font-mono text-xs font-bold mt-1 ${
              isOnline ? 'text-emerald-400' : 'text-rose-400'
            }`}
          >
            {isOnline ? 'Connected' : 'Offline'}
          </span>
        </div>

        <div className="flex flex-col justify-center px-2 pt-3 sm:pt-0">
          <span className="text-[10px] uppercase font-bold tracking-widest text-[var(--text-muted)]">
            CPU Cores
          </span>

          <span className="font-mono text-lg font-bold text-[var(--text-main)] mt-1">
            {hardwareConcurrency || 'N/A'}
          </span>
        </div>

        <div className="flex flex-col justify-center px-2 pt-3 sm:pt-0">
          <span className="text-[10px] uppercase font-bold tracking-widest text-[var(--text-muted)]">
            Resolution
          </span>

          <span className="font-mono text-xs font-semibold text-[var(--text-main)] mt-1 truncate">
            {screenWidth && screenHeight
              ? `${screenWidth} × ${screenHeight}`
              : 'N/A'}
          </span>
        </div>

      </div>
    </div>
  );
}