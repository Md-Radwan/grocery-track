import Link from "next/link";

export default function EmptyProductsPage() {
  return (
    <main className="min-h-screen border-t border-[#dce5dc] bg-[#f0f5f0] px-4 pt-24 sm:pt-24">
      <section className="mx-auto flex max-w-3xl flex-col items-center text-center">
        {/* Shopping basket icon */}
        <div
          className="mb-5 text-7xl leading-none"
          aria-hidden="true"
        >
          🧺
        </div>

        {/* Heading */}
        <h1 className="mb-5 text-2xl font-extrabold tracking-tight text-[#202b23] sm:text-3xl">
          পাতাটি খুঁজে পাওয়া যায়নি
        </h1>

        {/* Description */}
        <p className="mb-6 max-w-2xl text-base leading-8 text-[#69736b] sm:text-xl">
          আপনি যে পণ্য বা পাতাটি খুঁজছেন সেটি সরানো হয়েছে বা কখনও ছিল না।
        </p>

        {/* Action buttons */}
        <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link
            href="/"
            className="inline-flex min-h-14 items-center justify-center rounded-xl border border-[#07883e] bg-[#07883e] px-6 py-3 text-lg font-bold text-white shadow-md transition-colors duration-200 hover:bg-[#067333] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#07883e] focus-visible:ring-offset-2"
          >
            হোম পেজে যান
          </Link>
        </div>
      </section>
    </main>
  );
}
