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
    isLoading,
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
    <div className="rounded-2xl border border-[var(--border-color)] bg-[var(--bg-card)] p-6 shadow-xl flex flex-col justify-between">
      <div>
        <div className="flex items-center gap-3 border-b border-[var(--border-color)] pb-4 mb-4">
          <div className="p-2 rounded-lg bg-[var(--bg-icon)] border border-[var(--border-color)] text-[var(--accent-color)]">
            <Cpu className="w-5 h-5" />
          </div>

          <div>
            <h2 className="text-sm font-bold uppercase tracking-wider text-[var(--text-main)]">
              Device Specifications
            </h2>

            <p className="text-[11px] text-[var(--text-muted)]">
              Hardware & interface capabilities
            </p>
          </div>
        </div>

        <div className="divide-y divide-[var(--border-color)] text-xs">

          <div className="flex items-center justify-between py-3">
            <div className="flex items-center gap-2 text-[var(--text-muted)]">
              <Cpu className="w-3.5 h-3.5" />
              <span>CPU Cores</span>
            </div>

            <span className="font-mono text-[var(--text-main)] bg-[var(--bg-icon)] px-2.5 py-1 rounded-md border border-[var(--border-color)]">
              {isLoading
                ? 'Loading...'
                : hardwareConcurrency || 'N/A'}
            </span>
          </div>

          <div className="flex items-center justify-between py-3">
            <div className="flex items-center gap-2 text-[var(--text-muted)]">
              <MemoryStick className="w-3.5 h-3.5" />
              <span>Device Memory</span>
            </div>

            <span className="font-mono text-[var(--text-main)]">
              {isLoading ? 'Loading...' : formatDeviceMemory()}
            </span>
          </div>

          <div className="flex items-center justify-between py-3">
            <div className="flex items-center gap-2 text-[var(--text-muted)]">
              <Touchpad className="w-3.5 h-3.5" />
              <span>Max Touch Points</span>
            </div>

            <span className="font-mono text-[var(--text-main)]">
              {isLoading
                ? 'Loading...'
                : maxTouchPoints ?? 'N/A'}
            </span>
          </div>

          <div className="flex items-center justify-between py-3">
            <div className="flex items-center gap-2 text-[var(--text-muted)]">
              <Touchpad className="w-3.5 h-3.5" />
              <span>Touch Support</span>
            </div>

            <span
              className={`font-mono text-xs font-semibold ${
                touchSupport
                  ? 'text-emerald-400'
                  : 'text-[var(--text-muted)]'
              }`}
            >
              {isLoading
                ? 'Loading...'
                : formatBoolean(touchSupport)}
            </span>
          </div>

        </div>
      </div>
    </div>
  );
}