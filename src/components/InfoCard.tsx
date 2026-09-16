import React from 'react';

interface InfoCardProps {
  title: string;
  icon?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}

export default function InfoCard({
  title,
  icon,
  children,
  className = '',
}: InfoCardProps) {
  return (
    <div
      className={`bg-[var(--bg-card)] rounded-xl border border-[var(--border-color)] overflow-hidden ${className}`}
    >
      <div className="px-5 py-4 border-b border-[var(--border-color)] flex items-center gap-3">
        {icon && (
          <div className="text-[var(--accent-color)]">
            {icon}
          </div>
        )}

        <h2 className="text-lg font-semibold text-[var(--text-main)]">
          {title}
        </h2>
      </div>

      <div className="p-5">
        {children}
      </div>
    </div>
  );
}