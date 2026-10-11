
function Skeleton({ className = "" }) {
  return (
    <div
      aria-hidden="true"
      className={`animate-pulse rounded-md bg-gray-200 ${className}`}
    />
  );
}

function ProductCardSkeleton() {
  return (
    <div className="rounded-xl border border-gray-200/80 bg-[#FAFCFA] p-3">
      {/* Product image and name */}
      <div className="mb-4 flex items-center gap-3">
        <Skeleton className="h-10 w-10 shrink-0 rounded-xl" />

        <div className="flex-1 space-y-2">
          <Skeleton className="h-4 w-28 max-w-full" />
          <Skeleton className="h-3 w-16" />
        </div>
      </div>

      {/* Price label */}
      <Skeleton className="mb-2 h-3 w-20" />

      {/* Price and percentage change */}
      <div className="flex items-center justify-between gap-3">
        <Skeleton className="h-5 w-20" />
        <Skeleton className="h-5 w-12 rounded-full" />
      </div>
    </div>
  );
}

function ProductSectionSkeleton({ count = 6, showSubtitle = false }) {
  return (
    <section className="space-y-4">
      {/* Section heading */}
      <div className="space-y-2">
        <Skeleton className="h-5 w-36" />

        {showSubtitle && <Skeleton className="h-3 w-48" />}
      </div>

      {/* Product grid */}
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: count }, (_, index) => (
          <ProductCardSkeleton key={index} />
        ))}
      </div>
    </section>
  );
}

export default function Loading() {
  return (
    <main className="min-h-screen bg-[#EFF5F0] px-4 py-5 sm:py-6">
      <div className="mx-auto max-w-5xl space-y-7 sm:space-y-9">
        {/* Hero banner skeleton */}
        <section className="flex min-h-[160px] items-center justify-between gap-5 overflow-hidden rounded-2xl border border-gray-200/80 bg-[#FAFCFA] px-5 py-6 sm:px-8 sm:py-7">
          <div className="flex-1 space-y-4">
            <Skeleton className="h-4 w-28 rounded-full" />
            <Skeleton className="h-7 w-full max-w-md sm:h-8" />
            <div className="space-y-2">
              <Skeleton className="h-3 w-full max-w-sm" />
              <Skeleton className="h-3 w-4/5 max-w-xs" />
            </div>
            <Skeleton className="h-9 w-24 rounded-lg bg-green-200" />
          </div>

          {/* Hero illustration placeholder */}
          <div className="relative hidden h-32 w-44 shrink-0 items-center justify-center sm:flex">
            <Skeleton className="absolute bottom-1 h-5 w-36 rounded-full" />

            <div className="relative flex h-24 w-32 items-end justify-center">
              <Skeleton className="absolute bottom-0 h-16 w-28 rounded-b-2xl rounded-t-lg bg-green-200" />

              <div className="absolute bottom-12 flex items-center gap-1">
                <Skeleton className="h-10 w-10 rounded-full bg-red-200" />
                <Skeleton className="h-12 w-12 rounded-full bg-green-200" />
                <Skeleton className="h-9 w-9 rounded-full bg-yellow-200" />
              </div>
            </div>
          </div>
        </section>

        {/* Products with rising prices */}
        <ProductSectionSkeleton count={6} />

        {/* Products with falling prices */}
        <ProductSectionSkeleton count={6} />

        {/* All products */}
        <ProductSectionSkeleton count={27} showSubtitle />
      </div>
    </main>
  );
}
