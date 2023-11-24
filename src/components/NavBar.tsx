import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
// import CustomButton  from './Button';
// import { logo, menu, search, thirdweb } from '@/public/assets';
import { thirdweb, search } from '../assets/img';

// rounded-[100px]
export const Navbar = () => {  
  return (
    <div className="flex md:flex-row flex-col-reverse justify-between mb-[35px] gap-6">
        <div className="lg:flex-1 flex flex-row max-w-[458px] py-2 pl-4 pr-2 h-[52px] bg-[#1c1c24] rounded-lg">
            <input 
                type="text" 
                placeholder="Search..." 
                className="flex w-full font-epilogue font-normal text-[14px] placeholder:text-[#4b5264] text-white bg-transparent outline-none" 
            />
            <div className="w-[72px] h-full rounded-[20px] bg-[#4f46e5] flex justify-center items-center cursor-pointer">
                <img 
                    src={search} 
                    alt="search" 
                    className="w-[15px] h-[15px] object-contain" 
                />
            </div>
        </div>
        <div className="sm:flex hidden flex-row justify-end gap-4">
            {/* <CustomButton
                btnType="button"
                // title={address ? 'Create a campaign' : 'Connect'}
                title=""
                styles={ 'bg-blue-600'}
                handleClick={() => {}}
            /> */}
            <Link to="/profile">
                <div className="w-[52px] h-[52px] rounded-full bg-[#2c2f32] flex justify-center items-center cursor-pointer">
                    <img 
                        src={thirdweb} alt="user" 
                        className="w-[60%] h-[60%] object-contain"
                    />
                </div>
            </Link>
        </div>

        {/* Small screen navigation */}    
    </div>
  );
};