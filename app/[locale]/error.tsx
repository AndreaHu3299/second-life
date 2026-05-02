'use client';

import { useEffect } from 'react';
import ErrorState from '@/components/ErrorState';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Page error:', error);
  }, [error]);

  return (
    <div className="py-10">
      <ErrorState
        title="出错了 / Something went wrong"
        message="页面加载遇到了问题，请重试。"
        onRetry={reset}
      />
    </div>
  );
}
