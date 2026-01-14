import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const Logo = () => {
    return (
        <Link href={"/"}>
           <div className='flex items-center'>
            <Image alt='logo' src={"/assets/logo.png"} width={100} height={100} />
           <h2 className='text-3xl font-bold text-[#98CA43] custom-text-shadow'>CARE<span className='text-primary'>.IO</span></h2>
           </div>
        </Link>
    );
};

export default Logo;