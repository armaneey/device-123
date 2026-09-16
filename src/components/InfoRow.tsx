'use client';

import React, { useState } from 'react';
import { Copy, Check } from 'lucide-react';

interface InfoRowProps {
  label: string;
  value: string | number | boolean;
  icon?: React.ReactNode;
  className?: string;
  showCopy?: boolean;
}

export default function InfoRow({ label, value, icon, className = '', showCopy = false }: InfoRowProps) {
  const [copied, setCopied] = useState(false);
  const displayValue = typeof value === 'boolean' ? (value ? 'Yes' : 'No') : String(value);
  const valueStr = String(displayValue);
  const isLongValue = valueStr.length > 30;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(valueStr);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <div className={`flex items-start justify-between py-3 border-b border-[#262630] last:border-0 hover:bg-[#1A1A24] transition-colors rounded-lg px-2 -mx-2 ${className}`}>
      <div className="flex items-center gap-2 min-w-0 flex-1">
        {icon && <div className="text-slate-500 flex-shrink-0">{icon}</div>}
        <span className="text-sm font-medium text-slate-400">{label}</span>
      </div>
      <div className="flex items-center gap-2">
        <span className={`text-sm font-mono text-right truncate max-w-[200px] sm:max-w-xs ${
          isLongValue 
            ? 'bg-[#20202B] text-slate-200 px-2.5 py-1 text-xs rounded-md border border-white/5' 
            : 'text-slate-200'
        }`}>
          {displayValue}
        </span>
        {showCopy && isLongValue && (
          <button
            onClick={handleCopy}
            className="text-slate-500 hover:text-rose-300 transition-colors flex-shrink-0"
            title="Copy to clipboard"
          >
            {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
          </button>
        )}
      </div>
    </div>
  );
}