import React from 'react';
import { search } from '../assets/img';
import ProfileDropdown from './Auth/ProfileDropDown';
import { useAuth } from '../hooks';

export const Navbar = () => {  
    const { isAuthenticated } = useAuth();

    return (
        <div className="flex md:flex-row flex-col-reverse justify-between mb-[35px] gap-6">
            <div className="lg:flex-1 flex flex-row max-w-[458px] py-2 pl-4 pr-2 h-[52px] bg-[#1c1c24] rounded-xl">
                <input 
                    type="text" 
                    placeholder="Search..." 
                    className="flex w-full font-epilogue font-normal text-[14px] placeholder:text-[#4b5264] text-white bg-transparent outline-none" 
                />
                <div className="search-icon w-[72px] h-full rounded-full bg-richblack-700 flex justify-center items-center cursor-pointer">
                    <img 
                        src={search} 
                        alt="search" 
                        className="w-[15px] h-[15px] object-contain" 
                    />
                </div>
            </div>
            <div className="sm:flex hidden flex-row justify-end gap-4">
                {isAuthenticated !== null && <ProfileDropdown/>}
                {/* <ProfileDropdown /> */}
            </div>

            {/* Small screen navigation */}    
        </div>
    );
};