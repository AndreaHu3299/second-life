'use client';

import { Package, Inbox, Clock, Sparkles } from 'lucide-react';

interface EmptyStateProps {
  icon?: 'package' | 'inbox' | 'clock' | 'sparkles';
  title: string;
  description: string;
  actionLabel?: string;
  onAction?: () => void;
}

const iconMap = {
  package: Package,
  inbox: Inbox,
  clock: Clock,
  sparkles: Sparkles,
};

export default function EmptyState({
  icon = 'package',
  title,
  description,
  actionLabel,
  onAction,
}: EmptyStateProps) {
  const Icon = iconMap[icon];

  return (
    <div className="text-center py-16 px-6">
      <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-bg-warm mb-4">
        <Icon className="w-5 h-5 text-muted" strokeWidth={1.5} />
      </div>
      <h3 className="heading-sm mb-1.5">{title}</h3>
      <p className="body-muted font-normal max-w-xs mx-auto mb-6">
        {description}
      </p>
      {actionLabel && onAction && (
        <button
          onClick={onAction}
          className="px-5 py-2.5 rounded-lg bg-primary text-white text-sm font-medium transition-colors hover:bg-primary-dark"
        >
          {actionLabel}
        </button>
      )}
    </div>
  );
}
