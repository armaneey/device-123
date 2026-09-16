'use client';

import React from 'react';
import { Cpu, MemoryStick, Touchpad } from 'lucide-react';
import { useDeviceInfo } from '@/hooks/useDeviceInfo';

export default function DeviceInfo() {
  const { 
    hardwareConcurrency, 
    deviceMemory, 
    maxTouchPoints, 
    touchSupport,
    isLoading 
  } = useDeviceInfo();

  const formatDeviceMemory = () => {
    if (deviceMemory === null || deviceMemory === undefined) return 'N/A';
    return `${deviceMemory} GB`;
  };

  const formatBoolean = (val: boolean | null | undefined) => {
    if (val === null || val === undefined) return 'N/A';
    return val ? 'Supported' : 'Unsupported';
  };

  return (
    <div className="rounded-2xl border border-[#251D33] bg-[#1A1428] p-6 shadow-xl flex flex-col justify-between">
      <div className="flex items-center gap-3 border-b border-[#251D33] pb-4 mb-4">
        <div className="p-2 rounded-lg bg-[#231A35] border border-[#322648] text-[#E6C5B8]">
          <Cpu className="w-5 h-5" />
        </div>
        <div>
          <h2 className="text-sm font-bold uppercase tracking-wider text-[#F5EFE6]">
            Device Specifications
          </h2>
          <p className="text-[11px] text-[#9A8EA9]">Hardware & interface capabilities</p>
        </div>
      </div>

      <div className="divide-y divide-[#251D33] text-xs">
        
      
        <div className="flex items-center justify-between py-3">
          <div className="flex items-center gap-2 text-[#9A8EA9]">
            <Cpu className="w-3.5 h-3.5" />
            <span>CPU Cores</span>
          </div>
          <span className="font-mono text-[#F5EFE6] bg-[#231A35] px-2.5 py-1 rounded-md border border-[#322648]">
            {isLoading ? 'Loading...' : hardwareConcurrency || 'N/A'}
          </span>
        </div>
        <div className="flex items-center justify-between py-3">
          <div className="flex items-center gap-2 text-[#9A8EA9]">
            <MemoryStick className="w-3.5 h-3.5" />
            <span>Device Memory</span>
          </div>
          <span className="font-mono text-[#F5EFE6]">
            {isLoading ? 'Loading...' : formatDeviceMemory()}
          </span>
        </div>
        <div className="flex items-center justify-between py-3">
          <div className="flex items-center gap-2 text-[#9A8EA9]">
            <Touchpad className="w-3.5 h-3.5" />
            <span>Max Touch Points</span>
          </div>
          <span className="font-mono text-[#F5EFE6]">
            {isLoading ? 'Loading...' : maxTouchPoints ?? 'N/A'}
          </span>
        </div>
        <div className="flex items-center justify-between py-3">
          <div className="flex items-center gap-2 text-[#9A8EA9]">
            <Touchpad className="w-3.5 h-3.5" />
            <span>Touch Support</span>
          </div>
          <span className={`font-mono text-xs font-semibold ${touchSupport ? 'text-emerald-400' : 'text-[#9A8EA9]'}`}>
            {isLoading ? 'Loading...' : formatBoolean(touchSupport)}
          </span>
        </div>

      </div>
    </div>
  );
}