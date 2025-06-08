export default function RestaurantSkeleton() {
  return (
    <div className="bg-card-background rounded-lg overflow-hidden border border-gray-800 animate-pulse">
      {/* Image Skeleton */}
      <div className="relative h-48 bg-gray-800" />

      {/* Content Skeleton */}
      <div className="p-4">
        <div className="flex items-center justify-between mb-2">
          <div className="h-4 w-20 bg-gray-800 rounded" />
          <div className="h-4 w-12 bg-gray-800 rounded" />
        </div>

        <div className="h-6 w-3/4 bg-gray-800 rounded mb-2" />
        
        <div className="flex items-center gap-4 mb-3">
          <div className="h-4 w-16 bg-gray-800 rounded" />
          <div className="h-4 w-24 bg-gray-800 rounded" />
        </div>

        <div className="flex items-center justify-between">
          <div className="h-4 w-20 bg-gray-800 rounded" />
          <div className="h-4 w-16 bg-gray-800 rounded" />
        </div>
      </div>
    </div>
  )
} 