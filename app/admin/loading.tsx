import { SkeletonGrid } from "@/components/ui/SkeletonGrid";
import { AdminProductCardSkeleton } from "@/components/admin/AdminProductCardSkeleton";

export default function Loading() {
  return (
    <div className="p-6 max-w-6xl mx-auto">
      <SkeletonGrid SkeletonComponent={AdminProductCardSkeleton} count={6} />
    </div>
  );
}
