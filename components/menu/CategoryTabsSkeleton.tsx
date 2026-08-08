import { Skeleton } from '@/components/ui/Skeleton'

export function CategoryTabsSkeleton() {
  return (
    <div className="flex gap-2 mb-6">
      <Skeleton className="h-9 w-20 rounded-full" />
      <Skeleton className="h-9 w-24 rounded-full" />
      <Skeleton className="h-9 w-24 rounded-full" />
      <Skeleton className="h-9 w-24 rounded-full" />
    </div>
  )
}