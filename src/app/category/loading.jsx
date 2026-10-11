
export default function Loading() {
  return (
    <div className="min-h-screen animate-puls px-4 py-6">
      <div className="mx-auto max-w-7xl space-y-6">
        {/* Category Header Skeleton */}
        <div className="flex items-center gap-4 rounded-2xl border border-gray-200 bg-[#F8FBF8] p-5 sm:p-6">
          <div className="h-12 w-12 shrink-0 rounded-xl bg-gray-200" />

          <div className="flex-1 space-y-2">
            <div className="h-6 w-24 rounded-md bg-gray-300" />
            <div className="h-4 w-48 max-w-full rounded-md bg-gray-200" />
          </div>
        </div>

        {/* Sorting Skeleton */}
        <div className="flex items-center justify-end gap-3 rounded-2xl border border-gray-200 bg-[#F8FBF8] p-4">
          <div className="h-4 w-12 rounded bg-gray-200" />
          <div className="h-9 w-20 rounded-lg border border-gray-200 bg-gray-100" />
        </div>

        {/* Product Count Skeleton */}
        <div className="h-4 w-40 rounded " />

        {/* Product Cards Skeleton */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3, 4].map((item) => (
            <div
              key={item}
              className="rounded-2xl border border-gray-200 bg-[#F8FBF8] p-4"
            >
              {/* Product Name */}
              <div className="mb-5 flex items-center gap-3">
                <div className="h-12 w-12 shrink-0 rounded-xl bg-gray-200" />

                <div className="flex-1 space-y-2">
                  <div className="h-5 w-32 max-w-full rounded bg-gray-300" />
                  <div className="h-3 w-20 rounded bg-gray-200" />
                </div>
              </div>

              {/* Price Label */}
              <div className="mb-2 h-3 w-20 rounded bg-gray-200" />

              {/* Price and Change */}
              <div className="flex items-center justify-between gap-3">
                <div className="h-6 w-24 rounded bg-gray-300" />
                <div className="h-6 w-14 rounded-full bg-gray-200" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
