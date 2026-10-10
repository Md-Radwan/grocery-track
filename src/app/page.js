import Hero from "@/components/Hero";
import Image from "next/image";
import ProductPage from "./product/page";

export default function Home() {
  return (
    <div className='bg-[#F0F5F0]'>
      <Hero/>
      <ProductPage/>
    </div>
  );
}
