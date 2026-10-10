import ProductCard from "@/components/ProductCard";
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
  const riserData = productData.filter(
    (eachData) => eachData.change.dir === "up",
  ).sort((a, b) => b.change.pct - a.change.pct);

  console.log(riserData);
  return (
    <div>
      <div className="container mx-auto">
        <h1 className="font-bold text-xl leading-7 flex gap-2 items-center pb-3"> 
            <span className="text-[#D03739]">▲</span>
            আজ দাম বেড়েছে
        </h1>
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {riserData.splice(0, 6).map((riserDataInfo) => {
            return <ProductCard key={riserDataInfo.id} riserDataInfo={riserDataInfo}/>
          })}
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
