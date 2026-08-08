import { Skeleton } from '@/components/ui/Skeleton'

export function AdminProductCardSkeleton() {
  return (
    <div className="w-full bg-card-bg rounded-card overflow-hidden shadow-sm flex flex-col">
      <Skeleton className="w-full h-48 rounded-none" />
      <div className="p-5 flex flex-col gap-2">
        <Skeleton className="h-4 w-3/4" />
        <Skeleton className="h-3 w-full" />
        <div className="flex justify-between items-center pt-3 mt-2 border-t border-slate-50">
          <Skeleton className="h-5 w-16" />
          <div className="flex gap-2">
            <Skeleton className="w-9 h-9 rounded-full" />
            <Skeleton className="w-9 h-9 rounded-full" />
            <Skeleton className="w-9 h-9 rounded-full" />
          </div>
        </div>
      </div>
    </div>
  )
}