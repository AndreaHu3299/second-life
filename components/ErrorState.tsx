'use client';

import { AlertTriangle } from 'lucide-react';

interface ErrorStateProps {
  title?: string;
  message: string;
  onRetry?: () => void;
}

export default function ErrorState({ title, message, onRetry }: ErrorStateProps) {
  return (
    <div className="text-center py-16 px-6">
      <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-bg-warm mb-4">
        <AlertTriangle className="w-5 h-5 text-muted" strokeWidth={1.5} />
      </div>
      {title && <h3 className="heading-sm mb-1.5">{title}</h3>}
      <p className="body-muted font-normal max-w-xs mx-auto mb-6">
        {message}
      </p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="px-5 py-2.5 rounded-lg border border-border bg-surface text-sm font-medium text-foreground transition-colors hover:bg-bg-warm"
        >
          再试一次 / Try again
        </button>
      )}
    </div>
  );
}
