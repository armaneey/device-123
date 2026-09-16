'use client';

import React, { useSyncExternalStore } from 'react';
import { ShieldCheck } from 'lucide-react';

export default function BrowserCapabilities() {
  const telemetry = JSON.parse(
    useSyncExternalStore(
      (onStoreChange) => {
        window.addEventListener('online', onStoreChange);
        window.addEventListener('offline', onStoreChange);

        return () => {
          window.removeEventListener('online', onStoreChange);
          window.removeEventListener('offline', onStoreChange);
        };
      },
      () => {
        const nav = navigator as Navigator & {
          gpu?: unknown;
          wakeLock?: unknown;
          globalPrivacyControl?: boolean;
        };

        return JSON.stringify({
          onLine: nav.onLine ?? true,
          cookieEnabled: nav.cookieEnabled ?? false,
          language: nav.language || 'N/A',
          platform: nav.platform || 'N/A',
          webGPU: 'gpu' in nav,
          wakeLock: 'wakeLock' in nav,
          gpc: nav.globalPrivacyControl ?? false,
        });
      },
      () =>
        JSON.stringify({
          onLine: true,
          cookieEnabled: false,
          language: '--',
          platform: '--',
          webGPU: false,
          wakeLock: false,
          gpc: false,
        }),
    ),
  );

  return (
    <div className="rounded-2xl border border-[var(--border-color)] bg-[var(--bg-card)] p-6 shadow-xl flex flex-col justify-between">
      <div>
        <div className="flex items-center gap-3 border-b border-[var(--border-color)] pb-4 mb-4">
          <div className="p-2 rounded-lg bg-[var(--bg-icon)] border border-[var(--border-color)] text-[var(--accent-color)]">
            <ShieldCheck className="w-5 h-5" />
          </div>

          <div>
            <h2 className="text-sm font-bold uppercase tracking-wider text-[var(--text-main)]">
              Browser & Privacy State
            </h2>

            <p className="text-[11px] text-[var(--text-muted)]">
              Web API support and privacy flags
            </p>
          </div>
        </div>

        <div className="divide-y divide-[var(--border-color)] text-xs">
          <div className="flex items-center justify-between py-2.5">
            <span className="text-[var(--text-muted)]">
              Network Status
            </span>

            <span
              className={`font-mono font-semibold ${
                telemetry.onLine
                  ? 'text-emerald-400'
                  : 'text-rose-400'
              }`}
            >
              {telemetry.onLine ? 'Online' : 'Offline'}
            </span>
          </div>

          <div className="flex items-center justify-between py-2.5">
            <span className="text-[var(--text-muted)]">
              Cookies Enabled
            </span>

            <span className="font-mono text-[var(--text-main)]">
              {telemetry.cookieEnabled ? 'Yes' : 'No'}
            </span>
          </div>

          <div className="flex items-center justify-between py-2.5">
            <span className="text-[var(--text-muted)]">
              Primary Language
            </span>

            <span className="font-mono text-[var(--text-main)]">
              {telemetry.language}
            </span>
          </div>

          <div className="flex items-center justify-between py-2.5">
            <span className="text-[var(--text-muted)]">
              OS Platform
            </span>

            <span className="font-mono text-[var(--text-main)]">
              {telemetry.platform}
            </span>
          </div>

          <div className="flex items-center justify-between py-2.5">
            <span className="text-[var(--text-muted)]">
              WebGPU Support
            </span>

            <span
              className={`font-mono ${
                telemetry.webGPU
                  ? 'text-emerald-400'
                  : 'text-[var(--text-muted)]'
              }`}
            >
              {telemetry.webGPU ? 'Supported' : 'Unsupported'}
            </span>
          </div>

          <div className="flex items-center justify-between py-2.5">
            <span className="text-[var(--text-muted)]">
              Global Privacy Control
            </span>

            <span className="font-mono text-[var(--accent-color)]">
              {telemetry.gpc ? 'Active' : 'Inactive'}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}