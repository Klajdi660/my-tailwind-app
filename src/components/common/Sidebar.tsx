import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { navlinks } from '../../config/nav';
// import Link from 'next/link';
// import { useRouter } from 'next/navigation';
import Icon from './Icon';
// import { sun } from '@/public/assets';
import { logo } from '../../assets/img';
import user from "../../assets/img/user.svg";
import { Tooltip } from 'antd';

export default function Sidebar ()  {
  // const router = useRouter();
  const [activeLink, setActiveLink] = useState('dashboard');

  return (
    <div className='sm:flex hidden mr-10 relative '>
      <div className='flex justify-between items-center flex-col sticky top-5 h-[90vh]'>
        <Link to='/'>
          <Icon imgUrl={logo} styles="w-[52px] h-[52px] bg-[#2c2f32]"/>
        </Link>
        <div className='flex-1 flex flex-col justify-between items-center bg-[#1c1c24] rounded-[20px] w-[74px] py-4 mt-10'>
          <div className='flex flex-col justify-center items-center gap-10'>
            {navlinks.map((link) => (
              <Icon 
                key={link.name}
                {...link}
                isActive={activeLink}
                handleClick={() => {
                  if(!link.disabled) {
                    setActiveLink(link.name);
                    // router.push(link.link)
                  }
                }}
              />
            ))}
          </div>
          <Tooltip placement="right" title="Login" color="#2c2f32">
            <Link to='/'>
              <Icon 
                // imgUrl={navlinks[4].imgUrl} 
                imgUrl={user}
                // className={`${activeLink !== user ? 'grayscale' : null}`}
                styles="w-[52px] h-[52px] bg-[#2c2f32] rounded-[50%]"
              />
            </Link>
          </Tooltip>
        </div>
      </div>
    </div>
  );
};
