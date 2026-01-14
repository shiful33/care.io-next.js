import Image from 'next/image';
import React from 'react';

const Banner = () => {
    return (
        <div className='lg:flex justify-between items-center bg-[#F1F1F1] p-20 rounded-lg shadow-lg space-y-6'>
            {/* Left Content */}
            <div className='flex-1 space-y-4'>
                <h2 className='text-2xl md:text-5xl font-bold text-primary custom-text-shadow leading-16'>Reliable Caregiving <span className='text-[#98CA43]'>Services You Can Trust</span></h2>
                <p className='custom-text-shadow text-[#006ba0]'>Whether it is nurturing a newborn, assisting an elderly parent, or caring for a sick family member, Care.IO is here to help. Our platform offers personalized and secure care solutions tailored to your specific needs. Experience a new standard of accessible and professional caregiving today.</p>
                <button className='px-10 py-3 border border-[#fff] hover:bg-[#98CA43] p-4 bg-green-300 text-white rounded-full font-bold cursor-pointer custom-text-shadow text-xl transition-all duration-300'>Learn More</button>
            </div>
            
            {/* Right Content */}
            <div className='flex-1 lg:ml-50'>
                <Image alt='hero-image' src={"/assets/hero.jpg"} width={500} height={400}></Image>
            </div>
        </div>
    );
};

export default Banner;