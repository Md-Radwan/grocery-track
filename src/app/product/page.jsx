import FallersCard from "@/components/FallersCard";
import RisersCard from "@/components/RisersCard";
import React from "react";

const getProduct = async () => {
  const res = await fetch(
    "https://openapi.programming-hero.com/api/bazardor/products",
  );
  const data = await res.json();
  return data;
};

const ProductPage = async () => {
  const productData = await getProduct();
  const riserData = productData
    .filter((eachData) => eachData.change.dir === "up")
    .sort((a, b) => b.change.pct - a.change.pct);

  const fallerData = productData
    .filter((eachData) => eachData.change.dir === "down")
    .sort((a, b) => a.change.pct - b.change.pct);

  console.log("faller data", fallerData);

  console.log("riser data", riserData);
  return (
    <div className="container mx-auto">
      <h2 className="font-bold text-xl leading-7 flex gap-2 items-center pb-3">
        <span className="text-[#D03739]">▲</span>
        আজ দাম বেড়েছে
      </h2>
      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {riserData.splice(0, 6).map((riserDataInfo) => {
          return (
            <RisersCard key={riserDataInfo.id} riserDataInfo={riserDataInfo} />
          );
        })}
      </div>
      <h2 className="font-bold text-xl leading-7 flex gap-2 items-center mt-10 pb-3">
        <span className="text-[#1A9951]">▼</span>
        আজ দাম কমেছে
      </h2>
      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {fallerData.splice(0, 6).map((fallerDataInfo) => {
          return (
            <FallersCard
              key={fallerDataInfo.id}
              fallerDataInfo={fallerDataInfo}
            />
          );
        })}
      </div>
    </div>
  );
};

export default ProductPage;
