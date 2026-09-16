'use client';

import React from 'react';
import { HardDrive, Cpu } from 'lucide-react';
import { useExtendedTelemetry } from '../hooks/useExtendedTelemetry';

export default function ExtendedHardware() {
  const { gpu, storage } = useExtendedTelemetry();

  return (
    <div className="rounded-2xl border border-[var(--border-color)] bg-[var(--bg-card)] p-6 shadow-xl flex flex-col justify-between">
      <div>
        <div className="flex items-center gap-3 border-b border-[var(--border-color)] pb-4 mb-4">
          <div className="p-2 rounded-lg bg-[var(--bg-icon)] border border-[var(--border-color)] text-[var(--accent-color)]">
            <HardDrive className="w-5 h-5" />
          </div>

          <div>
            <h2 className="text-sm font-bold uppercase tracking-wider text-[var(--text-main)]">
              Hardware & Storage
            </h2>

            <p className="text-[11px] text-[var(--text-muted)]">
              Graphics processor & local storage quota
            </p>
          </div>
        </div>

        <div className="divide-y divide-[var(--border-color)] text-xs">
          <div className="flex items-center justify-between py-3 gap-4">
            <div className="flex items-center gap-2 text-[var(--text-muted)] shrink-0">
              <Cpu className="w-3.5 h-3.5" />
              <span>GPU Renderer</span>
            </div>

            <span
              className="font-mono text-[11px] text-[var(--text-main)] text-right truncate max-w-[200px]"
              title={gpu}
            >
              {gpu}
            </span>
          </div>

          <div className="flex items-center justify-between py-3">
            <span className="text-[var(--text-muted)]">
              Available Storage
            </span>

            <span className="font-mono text-[var(--text-main)]">
              {storage.quota}
            </span>
          </div>

          <div className="flex items-center justify-between py-3">
            <span className="text-[var(--text-muted)]">
              App Usage
            </span>

            <span className="font-mono text-[var(--accent-color)]">
              {storage.usage}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}