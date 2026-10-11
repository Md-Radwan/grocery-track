"use client";

import { useMemo, useState } from "react";
import AllProductCard from "@/components/AllProductCard";
import EmptyProductsPage from "./EmptyProductsPage";

const CategoryProductSort = ({ products }) => {
  const [sortOrder, setSortOrder] = useState("default");

  const sortedProducts = useMemo(() => {
    const sorted = [...products];

    if (sortOrder === "asc") {
      return sorted.sort((a, b) => a.today - b.today);
    }

    if (sortOrder === "desc") {
      return sorted.sort((a, b) => b.today - a.today);
    }

    return sorted;
  }, [products, sortOrder]);

  return (
    <section>
      {/* Sorting control */}
      <div className="flex justify-between items-center">
        <h2>মোট {products.length.toLocaleString("bn-BD")}টি পণ্য দেখানো হচ্ছে</h2>
        <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-end">
          <label
            htmlFor="categoryProductSort"
            className="text-sm font-medium text-gray-700"
          >
            সাজান:
          </label>

          <select
            id="categoryProductSort"
            value={sortOrder}
            onChange={(event) => setSortOrder(event.target.value)}
            className="rounded-lg border border-gray-300 bg-[#FAFCFA] px-3 py-2 text-sm outline-none transition focus:border-green-600 focus:ring-2 focus:ring-green-100"
          >
            <option value="default">ডিফল্ট</option>
            <option value="asc">দাম: কম থেকে বেশি</option>
            <option value="desc">দাম: বেশি থেকে কম</option>
          </select>
        </div>
      </div>

      {/* Product cards */}
      {sortedProducts.length > 0 ? (
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {sortedProducts.map((allProductData) => (
            <AllProductCard
              key={allProductData.id}
              allProductData={allProductData}
            />
          ))}
        </div>
      ) : (
        <EmptyProductsPage />
      )}
    </section>
  );
};

export default CategoryProductSort;
