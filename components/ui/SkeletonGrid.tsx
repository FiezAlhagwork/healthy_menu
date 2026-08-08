interface SkeletonGridProps {
  count?: number;
  SkeletonComponent: React.ComponentType;
  className?: string;
}

export function SkeletonGrid({
  count = 6,
  SkeletonComponent,
  className = "grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-6",
}: SkeletonGridProps) {
  return (
    <div className={className}>
      {Array.from({ length: count }).map((_, i) => (
        <SkeletonComponent key={i} />
      ))}
    </div>
  );
}
