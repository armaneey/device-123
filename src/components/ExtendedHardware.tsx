'use client';

import React from 'react';
import { HardDrive, Cpu } from 'lucide-react';
import { useExtendedTelemetry } from '../hooks/useExtendedTelemetry';

export default function ExtendedHardware() {
  const { gpu, storage } = useExtendedTelemetry();

  return (
    <div className="rounded-2xl border border-[#251D33] bg-[#1A1428] p-6 shadow-xl flex flex-col justify-between">
      <div>
        <div className="flex items-center gap-3 border-b border-[#251D33] pb-4 mb-4">
          <div className="p-2 rounded-lg bg-[#231A35] border border-[#322648] text-[#E6C5B8]">
            <HardDrive className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-sm font-bold uppercase tracking-wider text-[#F5EFE6]">
              Hardware & Storage
            </h2>
            <p className="text-[11px] text-[#9A8EA9]">Graphics processor & local storage quota</p>
          </div>
        </div>

        <div className="divide-y divide-[#251D33] text-xs">
          <div className="flex items-center justify-between py-3 gap-4">
            <div className="flex items-center gap-2 text-[#9A8EA9] shrink-0">
              <Cpu className="w-3.5 h-3.5" />
              <span>GPU Renderer</span>
            </div>
            <span className="font-mono text-[11px] text-[#F5EFE6] text-right truncate max-w-[200px]" title={gpu}>
              {gpu}
            </span>
          </div>
          <div className="flex items-center justify-between py-3">
            <span className="text-[#9A8EA9]">Available Storage</span>
            <span className="font-mono text-[#F5EFE6]">{storage.quota}</span>
          </div>
          <div className="flex items-center justify-between py-3">
            <span className="text-[#9A8EA9]">App Usage</span>
            <span className="font-mono text-[#E6C5B8]">{storage.usage}</span>
          </div>
        </div>
      </div>
    </div>
  );
}