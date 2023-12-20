import React, { useState, FunctionComponent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Tooltip } from 'antd';
import { navlinks } from '../data';
import { Icon } from '../components';
import { logo, avatar } from '../assets/img';
import { useAuth } from '../hooks';

export const Sidebar: FunctionComponent = () => {
  const [activeLink, setActiveLink] = useState('dashboard');
  const navigate = useNavigate();
  const { user } = useAuth();

  return (
    <div className='sm:flex hidden mr-10 relative'>
      <div className='flex justify-between items-center flex-col sticky top-5 h-[90vh]'>
        <Link to='/'>
          <Icon imgUrl={logo} styles="w-[52px] h-[52px] bg-[#2c2f32]"/>
        </Link>
        <div className='flex-1 flex flex-col justify-between items-center bg-[#1c1c24] rounded-[20px] w-[74px] py-4 mt-10'>
          <div className='flex flex-col justify-center items-center gap-2'>
            {navlinks.map((link) => (
              <Icon 
                key={link.name}
                {...link}
                isActive={activeLink}
                styles="hover:bg-[#2c2f32] w-[52px] h-[52px]"
                handleClick={() => {
                  if(!link.disabled) {
                    setActiveLink(link.name);
                    navigate(link.link)
                  }
                }}
              />
            ))}
          </div>
          {!user && <Tooltip placement="right" title="Login" color="#2c2f32">
            <Link to='/login'>
              <Icon 
                imgUrl={avatar}
                styles="w-[52px] h-[52px] bg-[#2c2f32] rounded-[50%]"
              />
            </Link>
          </Tooltip>}
          {user && <Icon imgUrl={user?.id} styles="w-[52px] h-[52px] bg-[#2c2f32] rounded-[50%]" />}
        </div>
      </div>
    </div>
  );
};
