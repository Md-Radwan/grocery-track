
const getProducts = async () => {
  const res = await fetch(
    "https://openapi.programming-hero.com/api/bazardor/products",
    {
      next: { revalidate: 60 },
    }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch products");
  }

  return res.json();
};

// Convert English numbers to Bengali numbers
const bnNumber = (number) =>
  new Intl.NumberFormat("bn-BD", {
    maximumFractionDigits: 2,
  }).format(number);

// Format product prices
const formatPrice = (number) => `${bnNumber(number)} টাকা`;

// Convert API units into Bengali
const getUnitLabel = (unit) => {
  const units = {
    kg: "কেজি",
    litre: "লিটার",
  };

  return units[unit] || unit;
};

const ProductDetailsPage = async ({ params }) => {
  const { id } = await params;

  const productData = await getProducts();

  const product = productData.find(
    (eachProduct) => String(eachProduct.id) === String(id)
  );

  // Handle missing products
  if (!product) {
    return (
      <main className="min-h-screen bg-[#F0F5F0] p-6 text-white">
        <div className="mx-auto max-w-7xl rounded-2xl bg-[#f8fbf8] p-8 text-center text-gray-800">
          <h1 className="text-2xl font-bold">
            পণ্য খুঁজে পাওয়া যায়নি!
          </h1>
          <p className="mt-2 text-gray-500">
            অনুগ্রহ করে অন্য একটি পণ্য নির্বাচন করুন।
          </p>
        </div>
      </main>
    );
  }

  // Calculate each market's average price
  const markets = (product.markets || [])
    .map((market) => ({
      ...market,
      average: (market.min + market.max) / 2,
    }))
    .sort((a, b) => a.average - b.average);

  const allPrices = markets.flatMap((market) => [
    market.min,
    market.max,
  ]);

  const lowestPrice = allPrices.length
    ? Math.min(...allPrices)
    : product.today;

  const highestPrice = allPrices.length
    ? Math.max(...allPrices)
    : product.today;

  const priceDifference = product.today - product.yesterday;

  // Price trend and percentage
  const isUp = product.change?.dir === "up";
  const isDown = product.change?.dir === "down";
  const isFlat = product.change?.dir === "flat";

  const trendColor = isUp
    ? "text-red-600"
    : isDown
      ? "text-green-600"
      : "text-gray-500";

  const trendIcon = isUp ? "▲" : isDown ? "▼" : "—";

  const categoryNames = {
    chal: "চালের",
    dal: "ডালের",
    tel: "তেলের",
    sobji: "সবজির",
    mach: "মাছের",
  };

  const categoryTitle =
    categoryNames[product.category] ||
    product.categoryNameBn;

  return (
    <main className="min-h-screen bg-[#F0F5F0] px-4 py-8 text-[#202a22] sm:px-6">
      <div className="mx-auto max-w-7xl">
        {/* Breadcrumb */}
        <nav className="mb-8 flex flex-wrap items-center gap-2 text-sm text-[#69766b]">
          <span>হোম</span>
          <span>›</span>
          <span>{product.categoryNameBn}</span>
          <span>›</span>
          <span className="font-medium text-[#95a196]">
            {product.nameBn}
          </span>
        </nav>

        {/* Product Header */}
        <section className="mb-6 flex flex-col gap-5 rounded-2xl border border-[#e0e8e0] bg-[#f8fbf8] p-5 sm:flex-row sm:items-center sm:p-6">
          <div className="flex min-w-0 flex-1 items-center gap-4">
            {/* Product Icon */}
            <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl bg-[#eef3ee] text-4xl">
              {product.image || product.categoryIcon}
            </div>

            {/* Product Information */}
            <div className="min-w-0">
              <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
                {product.nameBn}
              </h1>

              <p className="mt-1 text-sm text-gray-500">
                প্রতি {getUnitLabel(product.unit)} ·{" "}
                {product.categoryNameBn}
              </p>

              <p className="mt-2 text-sm text-[#354137]">
                {priceDifference > 0 ? (
                  <>
                    গতকালের তুলনায় আজ দাম{" "}
                    <span className="font-semibold">বেড়েছে</span>
                    {" · "}
                    {formatPrice(priceDifference)}
                  </>
                ) : priceDifference < 0 ? (
                  <>
                    গতকালের তুলনায় আজ দাম{" "}
                    <span className="font-semibold">কমেছে</span>
                    {" · "}
                    {formatPrice(Math.abs(priceDifference))}
                  </>
                ) : (
                  "গতকালের তুলনায় আজ দাম অপরিবর্তিত"
                )}
              </p>
            </div>
          </div>

          {/* Current Price */}
          <div className="flex shrink-0 flex-col items-center justify-center rounded-2xl bg-[#eef3ee] px-6 py-4 sm:min-w-[118px]">
            <p className="text-sm text-gray-500">আজকের দাম</p>

            <p className="text-3xl font-bold">
              {bnNumber(product.today)}
            </p>

            <p className="text-sm text-gray-500">
              টাকা / {getUnitLabel(product.unit)}
            </p>

            <p className={`mt-1 text-sm font-bold ${trendColor}`}>
              {trendIcon}{" "}
              {bnNumber(Math.abs(product.change?.pct ?? 0))}%
            </p>
          </div>
        </section>

        {/* Price Summary and Markets */}
        <section className="rounded-2xl border border-[#e0e8e0] bg-[#f8fbf8] p-5 sm:p-6">
          <h2 className="mb-4 text-lg font-bold">
            {categoryTitle} সারসংক্ষেপ
          </h2>

          {/* Summary Cards */}
          <div className="mb-7 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {/* Lowest Price */}
            <div className="rounded-2xl border border-[#dce5dc] p-5">
              <p className="text-sm text-gray-600">
                সর্বনিম্ন দাম
              </p>

              <p className="mt-1 text-2xl font-bold text-green-600">
                {bnNumber(lowestPrice)}{" "}
                <span className="text-sm font-normal">টাকা</span>
              </p>

              <p className="mt-1 text-xs text-gray-500">
                সবচেয়ে কম দামের বাজার
              </p>
            </div>

            {/* Highest Price */}
            <div className="rounded-2xl border border-[#dce5dc] p-5">
              <p className="text-sm text-gray-600">
                সর্বাধিক দাম
              </p>

              <p className="mt-1 text-2xl font-bold text-red-600">
                {bnNumber(highestPrice)}{" "}
                <span className="text-sm font-normal">টাকা</span>
              </p>

              <p className="mt-1 text-xs text-gray-500">
                সবচেয়ে বেশি দামের বাজার
              </p>
            </div>

            {/* Average / Current Price */}
            <div className="rounded-2xl border border-[#dce5dc] p-5 sm:col-span-2 lg:col-span-1">
              <p className="text-sm text-gray-600">গড় দাম</p>

              <p className="mt-1 text-2xl font-bold text-green-600">
                {bnNumber(product.today)}{" "}
                <span className="text-sm font-normal">টাকা</span>
              </p>

              <p className="mt-1 text-xs text-gray-500">
                প্রতি {getUnitLabel(product.unit)}-এর হিসাবে
              </p>
            </div>
          </div>

          {/* Market Price Table */}
          <h2 className="mb-4 text-lg font-bold">
            বাজারভিত্তিক আজকের দাম
          </h2>

          <div className="overflow-x-auto rounded-2xl border border-[#dce5dc]">
            <table className="w-full min-w-[680px] border-collapse text-sm">
              <thead>
                <tr className="bg-[#f8fbf8] text-left text-gray-500">
                  <th className="px-4 py-4 font-semibold">
                    বাজার
                  </th>
                  <th className="px-4 py-4 font-semibold">
                    বিভাগ
                  </th>
                  <th className="px-4 py-4 text-right font-semibold">
                    সর্বনিম্ন
                  </th>
                  <th className="px-4 py-4 text-right font-semibold">
                    সর্বাধিক
                  </th>
                  <th className="px-4 py-4 text-right font-semibold">
                    গড়
                  </th>
                </tr>
              </thead>

              <tbody>
                {markets.map((market, index) => (
                  <tr
                    key={`${market.market}-${market.division}`}
                    className={`border-t border-[#dce5dc] ${
                      index % 2 === 1
                        ? "bg-[#f0f4f0]"
                        : "bg-[#f8fbf8]"
                    }`}
                  >
                    <td className="whitespace-nowrap px-4 py-3.5 font-medium">
                      {market.market}
                    </td>

                    <td className="whitespace-nowrap px-4 py-3.5">
                      {market.division}
                    </td>

                    <td className="whitespace-nowrap px-4 py-3.5 text-right">
                      {formatPrice(market.min)}
                    </td>

                    <td className="whitespace-nowrap px-4 py-3.5 text-right">
                      {formatPrice(market.max)}
                    </td>

                    <td className="whitespace-nowrap px-4 py-3.5 text-right font-bold">
                      {formatPrice(market.average)}
                    </td>
                  </tr>
                ))}

                {markets.length === 0 && (
                  <tr>
                    <td
                      colSpan={5}
                      className="px-4 py-8 text-center text-gray-500"
                    >
                      এই পণ্যের কোনো বাজারের তথ্য পাওয়া যায়নি।
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </main>
  );
};

export default ProductDetailsPage;






// import React from 'react';


// const getProduct = async() => {
//     const res = await fetch("https://openapi.programming-hero.com/api/bazardor/products");
//     const data = await res.json();
//     return data;
// }

// const ProductDetailsPage = async({params}) => {
//     const {id} = await params;
//     const productData = await getProduct();
//     const product = productData.find((eachProduct) => String(eachProduct.id) === String(id))
//     return (
//         <div>
//             <h1>{product.id}</h1>
//         </div>
//     );
// };

// export default ProductDetailsPage;