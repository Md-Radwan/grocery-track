
import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-screen items-center justify-center px-4 py-10">
      <div className="w-full max-w-lg rounded-3xl border border-gray-200 bg-[#F8FBF8] px-6 py-12 text-center shadow-xl sm:px-10">
        {/* 404 Illustration */}
        <div className="mx-auto mb-6 flex h-28 w-28 items-center justify-center rounded-full bg-[#EAF3EA] text-6xl">
          🛒
        </div>

        {/* Error Code */}
        <p className="mb-3 text-6xl font-extrabold tracking-tight text-green-700 sm:text-7xl">
          404
        </p>

        {/* Heading */}
        <h1 className="mb-3 text-2xl font-bold text-gray-900 sm:text-3xl">
          পেজটি খুঁজে পাওয়া যায়নি!
        </h1>

        {/* Description */}
        <p className="mx-auto mb-8 max-w-sm text-sm leading-7 text-gray-500 sm:text-base">
          দুঃখিত! আপনি যে পেজটি খুঁজছেন সেটি খুঁজে পাওয়া যায়নি।
          পেজটি সরানো হয়েছে অথবা ঠিকানাটি ভুল হতে পারে।
        </p>

        {/* Back to Home */}
        <Link
          href="/"
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-green-700 px-6 py-3 font-semibold text-white transition hover:bg-green-800 focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-offset-2"
        >
          <span aria-hidden="true">←</span>
          হোম পেজে ফিরে যান
        </Link>

        <p className="mt-8 text-xs text-gray-400">
          GroceryTrack · আপনার বাজারের সঠিক হিসাব
        </p>
      </div>
    </main>
  );
}
