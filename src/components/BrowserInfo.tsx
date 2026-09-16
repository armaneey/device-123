'use client';

import React, { useState } from 'react';
import { Globe, Smartphone, Languages, Cookie, Shield, Copy, Check } from 'lucide-react';
import { useDeviceInfo } from '@/hooks/useDeviceInfo';

export default function BrowserInfo() {
  const { 
    userAgent, 
    platform, 
    language, 
    languages, 
    cookieEnabled, 
    doNotTrack,
    isLoading 
  } = useDeviceInfo();

  const [copied, setCopied] = useState(false);

  const formatBrowserName = () => {
    if (!userAgent || userAgent === 'Not available') return 'Not available';
    
    const ua = userAgent.toLowerCase();
    if (ua.includes('chrome') && !ua.includes('edg')) return 'Chrome';
    if (ua.includes('safari') && !ua.includes('chrome')) return 'Safari';
    if (ua.includes('firefox')) return 'Firefox';
    if (ua.includes('edg')) return 'Edge';
    if (ua.includes('opera') || ua.includes('opr')) return 'Opera';
    return 'Unknown';
  };

  const handleCopy = () => {
    if (userAgent && userAgent !== 'Not available') {
      navigator.clipboard.writeText(userAgent);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const formatBoolean = (val: boolean | null | undefined) => {
    if (val === null || val === undefined) return 'N/A';
    return val ? 'Enabled' : 'Disabled';
  };

  return (
    <div className="rounded-2xl border border-[#251D33] bg-[#1A1428] p-6 shadow-xl flex flex-col justify-between">
      <div className="flex items-center gap-3 border-b border-[#251D33] pb-4 mb-4">
        <div className="p-2 rounded-lg bg-[#231A35] border border-[#322648] text-[#E6C5B8]">
          <Globe className="w-5 h-5" />
        </div>
        <div>
          <h2 className="text-sm font-bold uppercase tracking-wider text-[#F5EFE6]">
            Browser Information
          </h2>
          <p className="text-[11px] text-[#9A8EA9]">Capabilities and user environment details</p>
        </div>
      </div>
      <div className="divide-y divide-[#251D33] text-xs">
        <div className="flex items-center justify-between py-3">
          <div className="flex items-center gap-2 text-[#9A8EA9]">
            <Smartphone className="w-3.5 h-3.5" />
            <span>Browser</span>
          </div>
          <span className="font-mono text-[#F5EFE6] bg-[#231A35] px-2.5 py-1 rounded-md border border-[#322648]">
            {isLoading ? 'Loading...' : formatBrowserName()}
          </span>
        </div>

        <div className="flex items-center justify-between py-3 gap-4">
          <span className="text-[#9A8EA9]">User Agent</span>
          <div className="flex items-center gap-2 min-w-0">
            <span className="font-mono text-[11px] text-[#E6C5B8] bg-[#231A35] px-2.5 py-1 rounded-md border border-[#322648] truncate max-w-[200px] sm:max-w-[260px]" title={userAgent}>
              {isLoading ? 'Loading...' : userAgent || 'N/A'}
            </span>
            {userAgent && (
              <button 
                onClick={handleCopy}
                className="p-1.5 rounded-md bg-[#231A35] border border-[#322648] text-[#9A8EA9] hover:text-[#F5EFE6] transition-colors"
                title="Copy User Agent"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              </button>
            )}
          </div>
        </div>
        <div className="flex items-center justify-between py-3">
          <span className="text-[#9A8EA9]">Platform</span>
          <span className="font-mono text-[#F5EFE6]">
            {isLoading ? 'Loading...' : platform || 'N/A'}
          </span>
        </div>
        <div className="flex items-center justify-between py-3">
          <div className="flex items-center gap-2 text-[#9A8EA9]">
            <Languages className="w-3.5 h-3.5" />
            <span>Language</span>
          </div>
          <span className="font-mono text-[#F5EFE6]">
            {isLoading ? 'Loading...' : language || 'N/A'}
          </span>
        </div>
        <div className="flex items-center justify-between py-3">
          <span className="text-[#9A8EA9]">Preferred Languages</span>
          <span className="font-mono text-[#F5EFE6] truncate max-w-[200px]" title={Array.from(languages || []).join(', ')}>
            {isLoading ? 'Loading...' : Array.from(languages || []).join(', ') || 'N/A'}
          </span>
        </div>

       
        <div className="flex items-center justify-between py-3">
          <div className="flex items-center gap-2 text-[#9A8EA9]">
            <Cookie className="w-3.5 h-3.5" />
            <span>Cookies Enabled</span>
          </div>
          <span className={`font-mono text-xs font-semibold ${cookieEnabled ? 'text-emerald-400' : 'text-rose-400'}`}>
            {isLoading ? 'Loading...' : formatBoolean(cookieEnabled)}
          </span>
        </div>
        <div className="flex items-center justify-between py-3">
          <div className="flex items-center gap-2 text-[#9A8EA9]">
            <Shield className="w-3.5 h-3.5" />
            <span>Do Not Track</span>
          </div>
          <span className="font-mono text-[#F5EFE6]">
            {isLoading ? 'Loading...' : doNotTrack === '1' ? 'Active' : 'Inactive'}
          </span>
        </div>

      </div>
    </div>
  );
}