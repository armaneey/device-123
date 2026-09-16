'use client';

import React from 'react';
import { Calendar, Monitor } from 'lucide-react';
import { useDeviceInfo } from '@/hooks/useDeviceInfo';

export default function DashboardHeader() {
  const { currentTime, isOnline, isLoading } = useDeviceInfo();

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric'
    });
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false
    });
  };

  if (isLoading || !currentTime) {
    return (
      <header className="border-b border-[#251D33] bg-[#120E1D]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="flex items-center gap-3.5">
              <div className="bg-[#1A1428] p-3 rounded-xl border border-[#251D33]">
                <Monitor className="w-5 h-5 text-[#E6C5B8]" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-[#F5EFE6] tracking-tight">
                  Device Information
                </h1>
                <p className="text-[#9A8EA9] text-xs">
                  Real-time browser and device telemetry
                </p>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="text-right">
                <div className="text-xs text-[#9A8EA9] font-medium">Loading...</div>
                <div className="text-base font-mono text-[#9A8EA9]">--:--:--</div>
              </div>
            </div>
          </div>
        </div>
      </header>
    );
  }

  return (
    <header className="border-b border-[#251D33] bg-[#120E1D]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="bg-[#1A1428] p-3 rounded-xl border border-[#251D33] text-[#E6C5B8] shadow-inner">
              <Monitor className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-[#F5EFE6] tracking-tight">
                Device Information
              </h1>
              <p className="text-[#9A8EA9] text-xs mt-0.5">
                Real-time browser and device telemetry
              </p>
            </div>
          </div>
      
          <div className="flex items-center gap-5">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#1A1428] border border-[#251D33] text-xs font-semibold">
              <span className={`w-2 h-2 rounded-full ${isOnline ? 'bg-emerald-400 animate-pulse' : 'bg-rose-400'}`} />
              <span className={isOnline ? 'text-emerald-400' : 'text-rose-400'}>
                {isOnline ? 'Online' : 'Offline'}
              </span>
            </div>
          
         
            <div className="text-right pl-2">
              <div className="text-[11px] text-[#9A8EA9] font-medium flex items-center gap-1.5 justify-end">
                <Calendar className="w-3 h-3 text-[#E6C5B8]" />
                {formatDate(currentTime)}
              </div>
              <div className="text-lg font-mono font-bold text-[#E6C5B8] tracking-wider mt-0.5">
                {formatTime(currentTime)}
              </div>
            </div>
          </div>

        </div>
      </div>
    </header>
  );
}