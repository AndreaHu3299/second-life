export default function LoadingSpinner({ size = 'md', fullScreen = false }: { size?: 'sm' | 'md' | 'lg'; fullScreen?: boolean }) {
  const sizes = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-8 h-8',
  };

  if (fullScreen) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className={`${sizes[size]} border-[2px] border-border border-t-primary rounded-full animate-spin`} />
      </div>
    );
  }

  return <div className={`${sizes[size]} border-[2px] border-border border-t-primary rounded-full animate-spin`} />;
}
