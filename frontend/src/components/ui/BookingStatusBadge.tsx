import React from 'react';
import { CheckCircle, Clock, XCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

interface BookingStatusBadgeProps {
  status: 'PENDING' | 'CONFIRMED' | 'FAILED';
  className?: string;
}

export function BookingStatusBadge({ status, className }: BookingStatusBadgeProps) {
  const config = {
    PENDING: {
      icon: Clock,
      label: 'Pending',
      className: 'bg-yellow-500/20 text-yellow-500 border-yellow-500/30',
    },
    CONFIRMED: {
      icon: CheckCircle,
      label: 'Confirmed',
      className: 'bg-green-500/20 text-green-500 border-green-500/30',
    },
    FAILED: {
      icon: XCircle,
      label: 'Failed',
      className: 'bg-destructive/20 text-destructive border-destructive/30',
    },
  };

  const { icon: Icon, label, className: statusClassName } = config[status];

  return (
    <div className={cn(
      'inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-sm font-medium',
      statusClassName,
      className
    )}>
      <Icon className="w-4 h-4" />
      <span>{label}</span>
    </div>
  );
}

