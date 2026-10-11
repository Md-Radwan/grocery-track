import AllProductCard from "@/components/AllProductCard";
import React from "react";

const page = async ({ params }) => {
  const { categoryId } = await params;
  const res = await fetch(
    `https://openapi.programming-hero.com/api/bazardor/products?category=${categoryId}`,
  );
  const data = await res.json();
  console.log(categoryId.nameBn);
  return (
    <div className="bg-[#F0F5F0]">
      <div className="w-full lg:w-7xl mx-auto pb-10">
        <div className="py-6">
            {data.slice(0, 1).map(dataInfo => <div className="flex gap-3 items-center rounded-[16px] bg-[#FAFCFA] p-[21px]" key={dataInfo.id}>
                <span className="text-4xl">{dataInfo.categoryIcon}</span>
                <span className="flex flex-col">
                    <h3 className="font-bold text-2xl leading-8">{dataInfo.categoryNameBn}</h3>
                    <span>পণ্যের আজকের দাম ও পরিবর্তন</span>
                </span>
                </div>)}
        </div>
        {/* <h1>{categoryId.nameBn}</h1> */}
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {data.map((allProductData) => (
            <AllProductCard
              key={allProductData.id}
              allProductData={allProductData}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default page;
