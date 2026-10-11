import AllProductCard from "@/components/AllProductCard";
import FallersCard from "@/components/FallersCard";
import RisersCard from "@/components/RisersCard";
import AllProductsSection from "@/components/AllProductsSection";


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

    console.log("All product", productData)
  
    // console.log("faller data", fallerData);

  // console.log("riser data", riserData);
  return (
    <div className="w-full lg:w-6xl mx-auto pb-20 px-3 lg:px-0">
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

      <AllProductsSection productData={productData} />
      {/* <h2 id="allProduct" className="font-bold text-xl leading-7 mt-10 pb-3">সব পণ্য</h2>
      <p className="text-sm leading-5 pb-4">মোট ৩৩টি পণ্য দেখানো হচ্ছে</p>
      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {productData.map((allProductData) => {
          return <AllProductCard key={allProductData.id} allProductData={allProductData}/>
        })}
      </div> */}
    </div>
  );
};

export default ProductPage;
