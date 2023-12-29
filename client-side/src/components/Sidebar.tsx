import React, { useState, FunctionComponent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { navlinks } from '../data';
import { Icon } from '../components';
import { logo, avatar, plus } from '../assets/img';
import { useAuth } from '../hooks';
// import ProfileDropdown from './Auth/ProfileDropDown';
import { FloatButton } from 'antd';
import { PlusOutlined, CommentOutlined } from '@ant-design/icons';

export const Sidebar: FunctionComponent = () => {
  const [activeLink, setActiveLink] = useState(navlinks[0].name);
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  return (
    <div className='sm:flex hidden mr-10 relative'>
      <div className='flex justify-between items-center flex-col sticky top-5 h-[90vh]'>
        <Link to='/'>
          <Icon imgUrl={logo} styles="w-[52px] h-[52px] bg-richblack-700"/>
        </Link>
        <div className='flex-1 flex flex-col justify-between items-center bg-[#1c1c24] rounded-2xl w-[74px] py-4 mt-10'>
          <div className='flex flex-col justify-center items-center gap-2'>
            {navlinks.map((link) => {
              return (
              <Icon 
                key={link.name}
                {...link}
                isActive={activeLink}
                // styles="w-[50px] h-[50px] hover:bg-richblack-15"
                styles="w-[50px] h-[50px] hover:bg-richblack-700"
                handleClick={() => {
                  if(!link.disabled) {
                    setActiveLink(link.name);
                    navigate(link.link)
                  }
                }}
              />
            )})}
          </div>
          {!isAuthenticated && 
            <Link to='/login'>
              <Icon 
                imgUrl={avatar}
                styles="w-[52px] h-[52px] bg-richblack-700 rounded-full"
                name='Login'
              />
            </Link>
          }
          {/* {isAuthenticated !== null && <ProfileDropdown/>} */}
          {isAuthenticated && (
            // <Icon
            //   imgUrl={plus}
            //   styles="w-[50px] h-[50px] bg-richblack-700 rounded-full"
            //   name='Enable/Disable'
            //   className='enable'
            //   handleClick={() => {}}
            // />
            <FloatButton.Group
              trigger="click"
              type="primary"
              style={{
                right: 24,
              }}
             icon={<PlusOutlined />}
          >
            <FloatButton />
            <FloatButton icon={<CommentOutlined />} />
          </FloatButton.Group>
          )}
        </div>
      </div>
    </div>
  );
};
