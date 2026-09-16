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

export default function InfoRow({
  label,
  value,
  icon,
  className = '',
  showCopy = false,
}: InfoRowProps) {
  const [copied, setCopied] = useState(false);

  const displayValue =
    typeof value === 'boolean' ? (value ? 'Yes' : 'No') : String(value);

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
    <div
      className={`flex items-start justify-between py-3 border-b border-[var(--border-color)] last:border-0 hover:bg-[var(--bg-button-hover)] transition-colors rounded-lg px-2 -mx-2 ${className}`}
    >
      <div className="flex items-center gap-2 min-w-0 flex-1">
        {icon && (
          <div className="text-[var(--text-muted)] flex-shrink-0">
            {icon}
          </div>
        )}

        <span className="text-sm font-medium text-[var(--text-muted)]">
          {label}
        </span>
      </div>

      <div className="flex items-center gap-2">
        <span
          className={`text-sm font-mono text-right truncate max-w-[200px] sm:max-w-xs ${
            isLongValue
              ? 'bg-[var(--bg-input)] text-[var(--text-main)] px-2.5 py-1 text-xs rounded-md border border-[var(--border-color)]'
              : 'text-[var(--text-main)]'
          }`}
        >
          {displayValue}
        </span>

        {showCopy && isLongValue && (
          <button
            onClick={handleCopy}
            className="text-[var(--text-muted)] hover:text-[var(--accent-color)] transition-colors flex-shrink-0"
            title="Copy to clipboard"
          >
            {copied ? (
              <Check className="w-4 h-4 text-emerald-400" />
            ) : (
              <Copy className="w-4 h-4" />
            )}
          </button>
        )}
      </div>
    </div>
  );
}