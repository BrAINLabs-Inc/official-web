import React from 'react';
import type { ApprovalStatus } from '../../types';

interface BadgeProps {
  status: ApprovalStatus;
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({ status, className = '' }) => {
  const styles: Record<ApprovalStatus, string> = {
    APPROVED: 'bg-black text-white border-black',
    PENDING_ADMIN: 'bg-zinc-100 text-black border-zinc-400',
    PENDING_RESEARCHER: 'bg-white text-black border-black border-dashed',
    DRAFT: 'bg-white text-zinc-500 border-zinc-200',
    REJECTED: 'bg-zinc-200 text-zinc-800 border-zinc-500 line-through',
  };

  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold border uppercase tracking-wider ${styles[status]} ${className}`}>
      {status.replace('_', ' ')}
    </span>
  );
};
