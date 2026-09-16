'use client';

import React from 'react';
import { MapPin, ShieldAlert } from 'lucide-react';
import { useDeviceInfo } from '@/hooks/useDeviceInfo';

export default function LocationInfo() {
  const { 
    locationPermission, 
    latitude, 
    longitude, 
    locationError, 
    requestLocation,
    isLoading 
  } = useDeviceInfo();

  const formatPermissionStatus = () => {
    if (locationPermission === 'granted') return 'Granted';
    if (locationPermission === 'denied') return 'Denied';
    if (locationPermission === 'prompt') return 'Prompt Needed';
    if (locationPermission === 'unknown') return 'Unknown';
    return locationPermission || 'N/A';
  };

  const formatCoordinates = (value: number | null) => {
    if (value === null || value === undefined) return '--';
    return value.toFixed(6);
  };

  const isGeolocationSupported = typeof navigator !== 'undefined' && 'geolocation' in navigator;

  return (
    <div className="rounded-2xl border border-[#251D33] bg-[#1A1428] p-6 shadow-xl flex flex-col justify-between">
      <div className="flex items-center gap-3 border-b border-[#251D33] pb-4 mb-4">
        <div className="p-2 rounded-lg bg-[#231A35] border border-[#322648] text-[#E6C5B8]">
          <MapPin className="w-5 h-5" />
        </div>
        <div>
          <h2 className="text-sm font-bold uppercase tracking-wider text-[#F5EFE6]">
            Geolocation Data
          </h2>
          <p className="text-[11px] text-[#9A8EA9]">Device location permissions & coordinates</p>
        </div>
      </div>
      <div className="divide-y divide-[#251D33] text-xs">
        <div className="flex items-center justify-between py-3">
          <div className="flex items-center gap-2 text-[#9A8EA9]">
            <ShieldAlert className="w-3.5 h-3.5" />
            <span>Permission Status</span>
          </div>
          <span className={`font-mono text-xs font-semibold ${
            locationPermission === 'granted' 
              ? 'text-emerald-400' 
              : locationPermission === 'denied' 
              ? 'text-rose-400' 
              : 'text-[#E6C5B8]'
          }`}>
            {isLoading ? 'Loading...' : formatPermissionStatus()}
          </span>
        </div>
        <div className="flex items-center justify-between py-3">
          <span className="text-[#9A8EA9]">Latitude</span>
          <span className="font-mono text-[#F5EFE6]">
            {isLoading ? 'Loading...' : formatCoordinates(latitude)}
          </span>
        </div>
        <div className="flex items-center justify-between py-3">
          <span className="text-[#9A8EA9]">Longitude</span>
          <span className="font-mono text-[#F5EFE6]">
            {isLoading ? 'Loading...' : formatCoordinates(longitude)}
          </span>
        </div>

      </div>
      {locationError && (
        <div className="mt-3 p-3 bg-rose-500/10 border border-rose-500/20 rounded-xl">
          <p className="text-xs text-rose-300 font-mono">{locationError}</p>
        </div>
      )}

      <div className="mt-4 pt-4 border-t border-[#251D33]">
        <button
          onClick={requestLocation}
          disabled={!isGeolocationSupported || isLoading}
          className={`w-full font-medium py-2.5 px-4 rounded-xl text-xs transition-all duration-200 flex items-center justify-center gap-2 shadow-sm ${
            isGeolocationSupported && !isLoading
              ? 'bg-[#231A35] hover:bg-[#2F2347] text-[#E6C5B8] border border-[#322648] hover:border-[#42335E] active:scale-[0.99]'
              : 'bg-[#181224] text-[#9A8EA9]/50 border border-[#251D33] cursor-not-allowed'
          }`}
        >
          <MapPin className="w-3.5 h-3.5 text-[#E6C5B8]" />
          Request Location Access
        </button>
        {!isGeolocationSupported && (
          <p className="text-[11px] text-[#9A8EA9] mt-2 text-center">
            Geolocation is not supported by this browser
          </p>
        )}
      </div>
    </div>
  );
}