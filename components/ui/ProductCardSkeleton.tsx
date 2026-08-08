import { Skeleton } from './Skeleton'

export function ProductCardSkeleton() {
  return (
    <div className="w-full bg-card-bg rounded-card overflow-hidden shadow-sm flex flex-col">
      <Skeleton className="w-full h-32 md:h-48 rounded-none" />
      <div className="p-3 md:p-5 flex flex-col gap-2">
        <Skeleton className="h-4 w-3/4" />
        <Skeleton className="h-3 w-full" />
        <Skeleton className="h-3 w-1/2" />
        <Skeleton className="h-5 w-1/3 mt-2" />
      </div>
    </div>
  )
}