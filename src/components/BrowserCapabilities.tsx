'use client';

import React, { useState } from 'react';
import { ShieldCheck, MonitorCheck, Radio } from 'lucide-react';

export default function BrowserCapabilities() {
  const [telemetry] = useState(() => {
    if (typeof navigator === 'undefined') {
      return {
        onLine: true,
        cookieEnabled: true,
        language: 'N/A',
        platform: 'N/A',
        webGPU: false,
        wakeLock: false,
        gpc: false,
      };
    }

    const nav = navigator as Navigator & {
      gpu?: unknown;
      wakeLock?: unknown;
      globalPrivacyControl?: boolean;
    };

    return {
      onLine: nav.onLine ?? true,
      cookieEnabled: nav.cookieEnabled ?? false,
      language: nav.language || 'N/A',
      platform: nav.platform || 'N/A',
      webGPU: 'gpu' in nav,
      wakeLock: 'wakeLock' in nav,
      gpc: nav.globalPrivacyControl ?? false,
    };
  });

  return (
    <div className="rounded-2xl border border-[#251D33] bg-[#1A1428] p-6 shadow-xl flex flex-col justify-between">
      <div>
        <div className="flex items-center gap-3 border-b border-[#251D33] pb-4 mb-4">
          <div className="p-2 rounded-lg bg-[#231A35] border border-[#322648] text-[#E6C5B8]">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-sm font-bold uppercase tracking-wider text-[#F5EFE6]">
              Browser & Privacy State
            </h2>
            <p className="text-[11px] text-[#9A8EA9]">Web API support and privacy flags</p>
          </div>
        </div>

        <div className="divide-y divide-[#251D33] text-xs">
          <div className="flex items-center justify-between py-2.5">
            <span className="text-[#9A8EA9]">Network Status</span>
            <span className={`font-mono font-semibold ${telemetry.onLine ? 'text-emerald-400' : 'text-rose-400'}`}>
              {telemetry.onLine ? 'Online' : 'Offline'}
            </span>
          </div>
          <div className="flex items-center justify-between py-2.5">
            <span className="text-[#9A8EA9]">Cookies Enabled</span>
            <span className="font-mono text-[#F5EFE6]">{telemetry.cookieEnabled ? 'Yes' : 'No'}</span>
          </div>
          <div className="flex items-center justify-between py-2.5">
            <span className="text-[#9A8EA9]">Primary Language</span>
            <span className="font-mono text-[#F5EFE6]">{telemetry.language}</span>
          </div>
          <div className="flex items-center justify-between py-2.5">
            <span className="text-[#9A8EA9]">OS Platform</span>
            <span className="font-mono text-[#F5EFE6]">{telemetry.platform}</span>
          </div>
          <div className="flex items-center justify-between py-2.5">
            <span className="text-[#9A8EA9]">WebGPU Support</span>
            <span className={`font-mono ${telemetry.webGPU ? 'text-emerald-400' : 'text-[#9A8EA9]'}`}>
              {telemetry.webGPU ? 'Supported' : 'Unsupported'}
            </span>
          </div>
          <div className="flex items-center justify-between py-2.5">
            <span className="text-[#9A8EA9]">Global Privacy Control</span>
            <span className="font-mono text-[#E6C5B8]">{telemetry.gpc ? 'Active' : 'Inactive'}</span>
          </div>
        </div>
      </div>
    </div>
  );
}