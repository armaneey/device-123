'use client';

import React from 'react';
import { Monitor, Maximize, Layers, Square } from 'lucide-react';
import { useDeviceInfo } from '@/hooks/useDeviceInfo';

export default function ScreenInfo() {
  const {
    screenWidth,
    screenHeight,
    availScreenWidth,
    availScreenHeight,
    colorDepth,
    pixelDepth,
    viewportWidth,
    viewportHeight,
    devicePixelRatio,
    isLoading,
  } = useDeviceInfo();

  const formatResolution = (width: number, height: number) => {
    if (!width || !height) return 'N/A';
    return `${width} × ${height}`;
  };

  return (
    <div className="rounded-2xl border border-[var(--border-color)] bg-[var(--bg-card)] p-6 shadow-xl flex flex-col justify-between">

      <div className="flex items-center gap-3 border-b border-[var(--border-color)] pb-4 mb-4">
        <div className="p-2 rounded-lg bg-[var(--bg-icon)] border border-[var(--border-color)] text-[var(--accent-color)]">
          <Monitor className="w-5 h-5" />
        </div>

        <div>
          <h2 className="text-sm font-bold uppercase tracking-wider text-[var(--text-main)]">
            Screen Information
          </h2>

          <p className="text-[11px] text-[var(--text-muted)]">
            Display metrics and viewports
          </p>
        </div>
      </div>

      <div className="divide-y divide-[var(--border-color)] text-xs">

        <div className="flex items-center justify-between py-3">
          <div className="flex items-center gap-2 text-[var(--text-muted)]">
            <Monitor className="w-3.5 h-3.5" />
            <span>Screen Resolution</span>
          </div>

          <span className="font-mono text-[var(--text-main)] bg-[var(--bg-icon)] px-2.5 py-1 rounded-md border border-[var(--border-color)]">
            {isLoading
              ? 'Loading...'
              : formatResolution(screenWidth, screenHeight)}
          </span>
        </div>

        <div className="flex items-center justify-between py-3">
          <div className="flex items-center gap-2 text-[var(--text-muted)]">
            <Maximize className="w-3.5 h-3.5" />
            <span>Available Screen Size</span>
          </div>

          <span className="font-mono text-[var(--text-main)]">
            {isLoading
              ? 'Loading...'
              : formatResolution(availScreenWidth, availScreenHeight)}
          </span>
        </div>

        <div className="flex items-center justify-between py-3">
          <div className="flex items-center gap-2 text-[var(--text-muted)]">
            <Layers className="w-3.5 h-3.5" />
            <span>Browser Viewport</span>
          </div>

          <span className="font-mono text-[var(--text-main)]">
            {isLoading
              ? 'Loading...'
              : formatResolution(viewportWidth, viewportHeight)}
          </span>
        </div>

        <div className="flex items-center justify-between py-3">
          <div className="flex items-center gap-2 text-[var(--text-muted)]">
            <Square className="w-3.5 h-3.5" />
            <span>Device Pixel Ratio</span>
          </div>

          <span className="font-mono text-[var(--accent-color)]">
            {isLoading
              ? 'Loading...'
              : devicePixelRatio
                ? `${devicePixelRatio}x`
                : 'N/A'}
          </span>
        </div>

        <div className="flex items-center justify-between py-3">
          <div className="flex items-center gap-2 text-[var(--text-muted)]">
            <Square className="w-3.5 h-3.5" />
            <span>Color Depth</span>
          </div>

          <span className="font-mono text-[var(--text-main)]">
            {isLoading
              ? 'Loading...'
              : colorDepth
                ? `${colorDepth}-bit`
                : 'N/A'}
          </span>
        </div>

        <div className="flex items-center justify-between py-3">
          <div className="flex items-center gap-2 text-[var(--text-muted)]">
            <Square className="w-3.5 h-3.5" />
            <span>Pixel Depth</span>
          </div>

          <span className="font-mono text-[var(--text-main)]">
            {isLoading
              ? 'Loading...'
              : pixelDepth
                ? `${pixelDepth}-bit`
                : 'N/A'}
          </span>
        </div>

      </div>
    </div>
  );
}