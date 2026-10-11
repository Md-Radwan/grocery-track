
"use client";

import { useMemo, useState } from "react";
import AllProductCard from "@/components/AllProductCard";

const AllProductsSection = ({ productData }) => {
  const [sortOrder, setSortOrder] = useState("default");

  const sortedProducts = useMemo(() => {
    // Copy the original array so we don't mutate API data
    const products = [...productData];

    if (sortOrder === "asc") {
      return products.sort((a, b) => a.today - b.today);
    }

    if (sortOrder === "desc") {
      return products.sort((a, b) => b.today - a.today);
    }

    // Default: preserve the original API order
    return products;
  }, [productData, sortOrder]);

  return (
    <section id="allProduct" className="mt-10">
      {/* Heading and sorting control */}
      <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-xl leading-7 font-bold">
            সব পণ্য
          </h2>

          <p className="pt-1 text-sm leading-5 text-gray-500">
            মোট {productData.length.toLocaleString("bn-BD")}টি পণ্য দেখানো হচ্ছে
          </p>
        </div>

        <div className="flex items-center gap-2">
          <label
            htmlFor="productSort"
            className="shrink-0 text-sm font-medium text-gray-700"
          >
            সাজান:
          </label>

          <select
            id="productSort"
            value={sortOrder}
            onChange={(event) => setSortOrder(event.target.value)}
            className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm outline-none transition focus:border-green-600 focus:ring-2 focus:ring-green-100 sm:w-auto"
          >
            <option value="default">ডিফল্ট</option>
            <option value="asc">দাম: কম থেকে বেশি</option>
            <option value="desc">দাম: বেশি থেকে কম</option>
          </select>
        </div>
      </div>

      {/* Sorted product cards */}
      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {sortedProducts.map((allProductData) => (
          <AllProductCard
            key={allProductData.id}
            allProductData={allProductData}
          />
        ))}
      </div>
    </section>
  );
};

export default AllProductsSection;
