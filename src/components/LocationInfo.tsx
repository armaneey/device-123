'use client';

import React, { useState, useEffect } from 'react';
import { MapPin, RefreshCw, ExternalLink } from 'lucide-react';

export default function LocationInfo() {
  const [coords, setCoords] = useState<{ lat: number; lng: number } | null>(null);
  const [address, setAddress] = useState<string>('Fetching location details...');
  const [status, setStatus] = useState<'Granted' | 'Denied' | 'Prompt' | 'Loading'>('Loading');

  const getLocation = () => {
    if (!navigator.geolocation) {
      setStatus('Denied');
      setAddress('Geolocation is not supported by your browser.');
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        setCoords({ lat: latitude, lng: longitude });
        setStatus('Granted');

        // Reverse Geocoding via OpenStreetMap Nominatim API
        try {
          const res = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitude}&lon=${longitude}`
          );
          const data = await res.json();
          if (data && data.display_name) {
            setAddress(data.display_name);
          } else {
            setAddress('Address lookup unavailable');
          }
        } catch {
          setAddress('Failed to fetch address');
        }
      },
      () => {
        setStatus('Denied');
        setAddress('Location access denied.');
      }
    );
  };

  useEffect(() => {
    const timeoutId = window.setTimeout(getLocation, 0);

    return () => window.clearTimeout(timeoutId);
  }, []);

  return (
    <div className="rounded-2xl border border-[var(--border-color)] bg-[var(--bg-card)] p-6 shadow-xl flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between border-b border-[var(--border-color)] pb-4 mb-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-[var(--bg-icon)] text-[var(--accent-color)]">
              <MapPin className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-sm font-bold uppercase tracking-wider text-[var(--text-main)]">
                Geolocation Data
              </h2>
              <p className="text-[11px] text-[var(--text-muted)]">Device location permissions & coordinates</p>
            </div>
          </div>
          <span className={`text-xs px-2.5 py-1 rounded-full font-mono ${
            status === 'Granted' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-rose-500/10 text-rose-400'
          }`}>
            {status}
          </span>
        </div>

      
        <div className="grid grid-cols-2 gap-4 mb-4 text-xs font-mono">
          <div className="bg-[var(--bg-input)] p-3 rounded-xl border border-[var(--border-color)]">
            <span className="text-[var(--text-muted)] block text-[10px] uppercase">Latitude</span>
            <span className="text-[var(--text-main)] font-semibold">{coords ? coords.lat.toFixed(6) : 'N/A'}</span>
          </div>
          <div className="bg-[var(--bg-input)] p-3 rounded-xl border border-[var(--border-color)]">
            <span className="text-[var(--text-muted)] block text-[10px] uppercase">Longitude</span>
            <span className="text-[var(--text-main)] font-semibold">{coords ? coords.lng.toFixed(6) : 'N/A'}</span>
          </div>
        </div>

       
        {coords && (
          <div className="relative w-full h-56 rounded-xl overflow-hidden border border-[var(--border-color)] mb-4">
            <iframe
              title="Device Location Map"
              width="100%"
              height="100%"
              style={{ border: 0, pointerEvents: 'auto' }}
              loading="lazy"
              allowFullScreen
              src={`https://maps.google.com/maps?q=${coords.lat},${coords.lng}&z=15&output=embed`}
            />
          </div>
        )}

        
        <div className="bg-[var(--bg-input)] p-3 rounded-xl border border-[var(--border-color)] text-xs mb-4">
          <span className="text-[10px] uppercase font-bold text-[var(--text-muted)] block mb-1">
            Detected Location Name
          </span>
          <p className="text-[var(--text-main)] leading-relaxed font-sans">{address}</p>
        </div>
      </div>


      <div className="flex gap-2">
        <button
          onClick={getLocation}
          className="flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-xl bg-[var(--bg-button)] hover:bg-[var(--bg-button-hover)] text-[var(--text-main)] text-xs font-medium transition-colors border border-[var(--border-color)]"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          Recalibrate
        </button>
        {coords && (
          <a
            href={`https://www.google.com/maps?q=${coords.lat},${coords.lng}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center p-2 rounded-xl bg-[var(--bg-button)] hover:bg-[var(--bg-button-hover)] text-[var(--text-main)] transition-colors border border-[var(--border-color)]"
            title="Open in Google Maps"
          >
            <ExternalLink className="w-4 h-4" />
          </a>
        )}
      </div>
    </div>
  );
}