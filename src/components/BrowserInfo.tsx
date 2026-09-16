'use client';

import React, { useState } from 'react';
import {
  Globe,
  Smartphone,
  Languages,
  Cookie,
  Shield,
  Copy,
  Check,
} from 'lucide-react';
import { useDeviceInfo } from '@/hooks/useDeviceInfo';

export default function BrowserInfo() {
  const {
    userAgent,
    platform,
    language,
    languages,
    cookieEnabled,
    doNotTrack,
    isLoading,
  } = useDeviceInfo();

  const [copied, setCopied] = useState(false);

  const formatBrowserName = () => {
    if (!userAgent || userAgent === 'Not available') {
      return 'Not available';
    }

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
    <div className="rounded-2xl border border-[var(--border-color)] bg-[var(--bg-card)] p-6 shadow-xl flex flex-col justify-between">

      <div className="flex items-center gap-3 border-b border-[var(--border-color)] pb-4 mb-4">
        <div className="p-2 rounded-lg bg-[var(--bg-icon)] border border-[var(--border-color)] text-[var(--accent-color)]">
          <Globe className="w-5 h-5" />
        </div>

        <div>
          <h2 className="text-sm font-bold uppercase tracking-wider text-[var(--text-main)]">
            Browser Information
          </h2>

          <p className="text-[11px] text-[var(--text-muted)]">
            Capabilities and user environment details
          </p>
        </div>
      </div>

      <div className="divide-y divide-[var(--border-color)] text-xs">

        <div className="flex items-center justify-between py-3">
          <div className="flex items-center gap-2 text-[var(--text-muted)]">
            <Smartphone className="w-3.5 h-3.5" />
            <span>Browser</span>
          </div>

          <span className="font-mono text-[var(--text-main)] bg-[var(--bg-icon)] px-2.5 py-1 rounded-md border border-[var(--border-color)]">
            {isLoading ? 'Loading...' : formatBrowserName()}
          </span>
        </div>

        <div className="flex items-center justify-between py-3 gap-4">
          <span className="text-[var(--text-muted)]">
            User Agent
          </span>

          <div className="flex items-center gap-2 min-w-0">
            <span
              className="font-mono text-[11px] text-[var(--accent-color)] bg-[var(--bg-icon)] px-2.5 py-1 rounded-md border border-[var(--border-color)] truncate max-w-[200px] sm:max-w-[260px]"
              title={userAgent}
            >
              {isLoading ? 'Loading...' : userAgent || 'N/A'}
            </span>

            {userAgent && (
              <button
                onClick={handleCopy}
                className="p-1.5 rounded-md bg-[var(--bg-icon)] border border-[var(--border-color)] text-[var(--text-muted)] hover:text-[var(--text-main)] transition-colors"
                title="Copy User Agent"
              >
                {copied ? (
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                ) : (
                  <Copy className="w-3.5 h-3.5" />
                )}
              </button>
            )}
          </div>
        </div>

        <div className="flex items-center justify-between py-3">
          <span className="text-[var(--text-muted)]">
            Platform
          </span>

          <span className="font-mono text-[var(--text-main)]">
            {isLoading ? 'Loading...' : platform || 'N/A'}
          </span>
        </div>

        <div className="flex items-center justify-between py-3">
          <div className="flex items-center gap-2 text-[var(--text-muted)]">
            <Languages className="w-3.5 h-3.5" />
            <span>Language</span>
          </div>

          <span className="font-mono text-[var(--text-main)]">
            {isLoading ? 'Loading...' : language || 'N/A'}
          </span>
        </div>

        <div className="flex items-center justify-between py-3">
          <span className="text-[var(--text-muted)]">
            Preferred Languages
          </span>

          <span
            className="font-mono text-[var(--text-main)] truncate max-w-[200px]"
            title={Array.from(languages || []).join(', ')}
          >
            {isLoading
              ? 'Loading...'
              : Array.from(languages || []).join(', ') || 'N/A'}
          </span>
        </div>

        <div className="flex items-center justify-between py-3">
          <div className="flex items-center gap-2 text-[var(--text-muted)]">
            <Cookie className="w-3.5 h-3.5" />
            <span>Cookies Enabled</span>
          </div>

          <span
            className={`font-mono text-xs font-semibold ${
              cookieEnabled
                ? 'text-emerald-400'
                : 'text-rose-400'
            }`}
          >
            {isLoading
              ? 'Loading...'
              : formatBoolean(cookieEnabled)}
          </span>
        </div>

        <div className="flex items-center justify-between py-3">
          <div className="flex items-center gap-2 text-[var(--text-muted)]">
            <Shield className="w-3.5 h-3.5" />
            <span>Do Not Track</span>
          </div>

          <span className="font-mono text-[var(--text-main)]">
            {isLoading
              ? 'Loading...'
              : doNotTrack === '1'
                ? 'Active'
                : 'Inactive'}
          </span>
        </div>

      </div>
    </div>
  );
}