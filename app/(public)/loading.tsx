import { SkeletonGrid } from '@/components/ui/SkeletonGrid'
import { ProductCardSkeleton } from '@/components/ui/ProductCardSkeleton'
import { CategoryTabsSkeleton } from '@/components/menu/CategoryTabsSkeleton'

export default function Loading() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-6">
      <div className="h-12 bg-slate-200 rounded-btn animate-pulse mb-5" />
      <CategoryTabsSkeleton />
      <SkeletonGrid SkeletonComponent={ProductCardSkeleton} count={6} />
    </div>
  )
}