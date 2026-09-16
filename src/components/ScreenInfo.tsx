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
    isLoading 
  } = useDeviceInfo();

  const formatResolution = (width: number, height: number) => {
    if (!width || !height) return 'N/A';
    return `${width} × ${height}`;
  };

  return (
    <div className="rounded-2xl border border-[#251D33] bg-[#1A1428] p-6 shadow-xl flex flex-col justify-between">
     
      <div className="flex items-center gap-3 border-b border-[#251D33] pb-4 mb-4">
        <div className="p-2 rounded-lg bg-[#231A35] border border-[#322648] text-[#E6C5B8]">
          <Monitor className="w-5 h-5" />
        </div>
        <div>
          <h2 className="text-sm font-bold uppercase tracking-wider text-[#F5EFE6]">
            Screen Information
          </h2>
          <p className="text-[11px] text-[#9A8EA9]">Display metrics and viewports</p>
        </div>
      </div>

     
      <div className="divide-y divide-[#251D33] text-xs">
        
       
        <div className="flex items-center justify-between py-3">
          <div className="flex items-center gap-2 text-[#9A8EA9]">
            <Monitor className="w-3.5 h-3.5" />
            <span>Screen Resolution</span>
          </div>
          <span className="font-mono text-[#F5EFE6] bg-[#231A35] px-2.5 py-1 rounded-md border border-[#322648]">
            {isLoading ? 'Loading...' : formatResolution(screenWidth, screenHeight)}
          </span>
        </div>

        <div className="flex items-center justify-between py-3">
          <div className="flex items-center gap-2 text-[#9A8EA9]">
            <Maximize className="w-3.5 h-3.5" />
            <span>Available Screen Size</span>
          </div>
          <span className="font-mono text-[#F5EFE6]">
            {isLoading ? 'Loading...' : formatResolution(availScreenWidth, availScreenHeight)}
          </span>
        </div>

      
        <div className="flex items-center justify-between py-3">
          <div className="flex items-center gap-2 text-[#9A8EA9]">
            <Layers className="w-3.5 h-3.5" />
            <span>Browser Viewport</span>
          </div>
          <span className="font-mono text-[#F5EFE6]">
            {isLoading ? 'Loading...' : formatResolution(viewportWidth, viewportHeight)}
          </span>
        </div>

       
        <div className="flex items-center justify-between py-3">
          <div className="flex items-center gap-2 text-[#9A8EA9]">
            <Square className="w-3.5 h-3.5" />
            <span>Device Pixel Ratio</span>
          </div>
          <span className="font-mono text-[#E6C5B8]">
            {isLoading ? 'Loading...' : devicePixelRatio ? `${devicePixelRatio}x` : 'N/A'}
          </span>
        </div>

        <div className="flex items-center justify-between py-3">
          <div className="flex items-center gap-2 text-[#9A8EA9]">
            <Square className="w-3.5 h-3.5" />
            <span>Color Depth</span>
          </div>
          <span className="font-mono text-[#F5EFE6]">
            {isLoading ? 'Loading...' : colorDepth ? `${colorDepth}-bit` : 'N/A'}
          </span>
        </div>

       
        <div className="flex items-center justify-between py-3">
          <div className="flex items-center gap-2 text-[#9A8EA9]">
            <Square className="w-3.5 h-3.5" />
            <span>Pixel Depth</span>
          </div>
          <span className="font-mono text-[#F5EFE6]">
            {isLoading ? 'Loading...' : pixelDepth ? `${pixelDepth}-bit` : 'N/A'}
          </span>
        </div>

      </div>
    </div>
  );
}