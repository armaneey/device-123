import React from 'react';

interface InfoCardProps {
  title: string;
  icon?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}

export default function InfoCard({ title, icon, children, className = '' }: InfoCardProps) {
  return (
    <div className={`bg-[#16161D] rounded-xl border border-[#262630] overflow-hidden ${className}`}>
      <div className="px-5 py-4 border-b border-[#262630] flex items-center gap-3">
        {icon && <div className="text-rose-300">{icon}</div>}
        <h2 className="text-lg font-semibold text-slate-100">{title}</h2>
      </div>
      <div className="p-5">
        {children}
      </div>
    </div>
  );
}