import React from 'react';
import type { LucideIcon } from 'lucide-react';

interface StatCardProps {
  label: string;
  value: string | number;
  icon: LucideIcon;
  trend?: { value: string; label: string; type?: 'up' | 'down' };
  className?: string;
}

export const StatCard: React.FC<StatCardProps> = ({ 
  label, 
  value, 
  icon: Icon, 
  trend,
  className = '' 
}) => {
  return (
    <div className={`p-6 bg-white border border-zinc-200 rounded-sm hover:border-black transition-all ${className}`}>
      <div className="flex items-center justify-between mb-4">
        <div className="p-2 bg-black text-white rounded-sm">
          <Icon size={16} />
        </div>
        {trend && (
          <div className="flex items-center gap-1.5 px-2 py-0.5 bg-zinc-100 border border-zinc-200 rounded-sm">
            <span className="text-[10px] font-bold text-black">
              {trend.type === 'up' ? '↑' : '↓'} {trend.value}
            </span>
            <span className="text-[10px] font-medium text-zinc-500 uppercase tracking-tight">
              {trend.label}
            </span>
          </div>
        )}
      </div>
      <div>
        <p className="text-4xl font-bold tracking-tighter text-black uppercase mb-1">{value}</p>
        <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-[0.2em]">{label}</p>
      </div>
    </div>
  );
};
