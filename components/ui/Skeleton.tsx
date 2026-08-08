interface SkeletonProps {
  className?: string;
}

export function Skeleton({ className = "" }: SkeletonProps) {
  return <div className={`bg-slate-200 rounded animate-pulse ${className}`} />;
}
