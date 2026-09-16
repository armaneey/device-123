'use client';

import React from 'react';
import { Wifi, Signal, Activity, Database } from 'lucide-react';
import { useDeviceInfo } from '@/hooks/useDeviceInfo';

export default function NetworkInfo() {
  const {
    connectionType,
    effectiveConnectionType,
    downlink,
    rtt,
    saveData,
    networkAvailable,
    isLoading,
  } = useDeviceInfo();

  const formatDownlink = () => {
    if (downlink === null || downlink === undefined) return 'N/A';
    return `${downlink} Mbps`;
  };

  const formatRtt = () => {
    if (rtt === null || rtt === undefined) return 'N/A';
    return `${rtt} ms`;
  };

  const formatBoolean = (val: boolean | null | undefined) => {
    if (val === null || val === undefined) return 'N/A';
    return val ? 'Enabled' : 'Disabled';
  };

  return (
    <div className="rounded-2xl border border-[var(--border-color)] bg-[var(--bg-card)] p-6 shadow-xl flex flex-col justify-between">

      <div className="flex items-center gap-3 border-b border-[var(--border-color)] pb-4 mb-4">
        <div className="p-2 rounded-lg bg-[var(--bg-icon)] border border-[var(--border-color)] text-[var(--accent-color)]">
          <Wifi className="w-5 h-5" />
        </div>

        <div>
          <h2 className="text-sm font-bold uppercase tracking-wider text-[var(--text-main)]">
            Network Diagnostics
          </h2>

          <p className="text-[11px] text-[var(--text-muted)]">
            Connection performance and transfer metrics
          </p>
        </div>
      </div>

      <div className="divide-y divide-[var(--border-color)] text-xs">

        <div className="flex items-center justify-between py-3">
          <div className="flex items-center gap-2 text-[var(--text-muted)]">
            <Wifi className="w-3.5 h-3.5" />
            <span>Connection Type</span>
          </div>

          <span className="font-mono text-[var(--text-main)] bg-[var(--bg-icon)] px-2.5 py-1 rounded-md border border-[var(--border-color)]">
            {isLoading
              ? 'Loading...'
              : networkAvailable
                ? connectionType || 'N/A'
                : 'Unsupported Browser'}
          </span>
        </div>

        <div className="flex items-center justify-between py-3">
          <div className="flex items-center gap-2 text-[var(--text-muted)]">
            <Signal className="w-3.5 h-3.5" />
            <span>Effective Speed Class</span>
          </div>

          <span className="font-mono text-[var(--accent-color)] uppercase">
            {isLoading
              ? 'Loading...'
              : networkAvailable
                ? effectiveConnectionType || 'N/A'
                : 'Unsupported Browser'}
          </span>
        </div>

        <div className="flex items-center justify-between py-3">
          <div className="flex items-center gap-2 text-[var(--text-muted)]">
            <Activity className="w-3.5 h-3.5" />
            <span>Downlink Speed</span>
          </div>

          <span className="font-mono text-[var(--text-main)]">
            {isLoading
              ? 'Loading...'
              : networkAvailable
                ? formatDownlink()
                : 'Unsupported Browser'}
          </span>
        </div>

        <div className="flex items-center justify-between py-3">
          <div className="flex items-center gap-2 text-[var(--text-muted)]">
            <Activity className="w-3.5 h-3.5" />
            <span>Round Trip Time (RTT)</span>
          </div>

          <span className="font-mono text-[var(--text-main)]">
            {isLoading
              ? 'Loading...'
              : networkAvailable
                ? formatRtt()
                : 'Unsupported Browser'}
          </span>
        </div>

        <div className="flex items-center justify-between py-3">
          <div className="flex items-center gap-2 text-[var(--text-muted)]">
            <Database className="w-3.5 h-3.5" />
            <span>Data Saver Mode</span>
          </div>

          <span className="font-mono text-[var(--text-main)]">
            {isLoading
              ? 'Loading...'
              : networkAvailable
                ? formatBoolean(saveData)
                : 'Unsupported Browser'}
          </span>
        </div>

      </div>
    </div>
  );
}