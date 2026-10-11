import Image from 'next/image';
import React from 'react';

const Hero = () => {
    const date = new Date().toLocaleDateString("bn-BD",{
        dateStyle: "full"
    })
    return (
        <div className='pt-6 pb-10'>
            <div className='w-7xl mx-auto flex flex-col md:flex-row md:justify-between md:items-center rounded-[24px] bg-[#FBFCFA] px-4 py-5'>
                <div className='w-full md:w-[50%] flex flex-col items-center md:items-start'>
                    <p className='bg-[#E6F0E7] rounded-[14px] text-[#05893E] px-3 py-1 font-medium leading-5 text-sm inline'>{date}</p>
                    <h1 className='font-bold text-4xl leading-11 mt-2 text-center md:text-start'>আজকের বাজারের দাম এক নজরে</h1>
                    <p className='mt-5 pb-7 text-center md:text-start'>
                        চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দাম — বাজারভিত্তিক বিস্তারিত, গড়, সর্বনিম্ন-সর্বাধিক এবং দামের পরিবর্তন এক জায়গায়।
                    </p>
                    <button className='rounded-xl bg-[#05893E] py-2.5 px-5.5 text-sm font-semibold text-white cursor-pointer'>সব পণ্য দেখুন</button>
                </div>
                <div className='w-full md:w-[50%] flex justify-center md:justify-end'>
                    <Image src={"/heroImg.png"} width={315} height={263} alt='hero image'/>
                </div>
            </div>
        </div>
    );
};

export default Hero;