import React, {  FunctionComponent, useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useClickAway } from 'react-use';
import { navlinks } from '../data';
import { Icon } from '../components';
import { logo, avatar } from '../assets/img';
import { useAuth } from '../hooks';
// import ProfileDropdown from './Auth/ProfileDropDown';
import { Button, Dropdown, Tooltip/*, List, Avatar*/ } from 'antd';
import { TbGridDots } from "react-icons/tb";
import { ShowApp } from './ShowApp';

// const menu = (
//   <List
//     min-width="100%"
//     className="header-notifications-dropdown "
//     itemLayout="horizontal"
//     // dataSource={data}
//     renderItem={(item: any) => (
//       <List.Item>
//         <List.Item.Meta
//           avatar={<Avatar shape="square" src={item.avatar} />}
//           title={item.title}
//           description={item.description}
//         />
//       </List.Item>
//     )}
//   />
// );


export const Sidebar: FunctionComponent = () => {
  // const [activeLink, setActiveLink] = useState(navlinks[0].name);
  const [activeLink, setActiveLink] = useState("Dashboard");
  const [isButtonClicked, setIsButtonClicked] = useState(false); 
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const buttonRef = useRef<HTMLDivElement | null>(null);
  const iconsRef = useRef<HTMLDivElement | null>(null);

  // Use the useClickAway hook to handle clicks outside the button
  useClickAway(buttonRef, () => {
    setIsButtonClicked(false);
  });

  useClickAway(iconsRef, () => {
    setActiveLink("showApp")
  });

  return (
    <div className='sm:flex hidden mr-10 relative'>
      <div className='flex justify-between items-center flex-col sticky top-5 h-[90vh]'>
        <Link to='/'>
          <Icon imgUrl={logo} styles="w-[52px] h-[52px] bg-richblack-700"/>
        </Link>
        <div className='flex-1 flex flex-col justify-between items-center bg-[#1c1c24] rounded-2xl w-[74px] py-4 mt-10'>
          <div className='flex flex-col justify-center items-center gap-2' ref={iconsRef}>
            {navlinks.map((link) => (
              <Icon 
                key={link.name}
                {...link}
                isActive={activeLink}
                // styles="w-[50px] h-[50px] hover:bg-richblack-15"
                styles="w-[52px] h-[52px] hover:bg-richblack-700"
                handleClick={() => {
                  if(!link.disabled) {
                    setActiveLink(link.name);
                    navigate(link.link)
                  }
                }}
              />
            ))}
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
            <div className="app-btn pt-2" ref={buttonRef}>
              <Tooltip placement="right" title="Show Applications" color="#2C333F" trigger={["hover"]} arrow={false}>
                {/* <Tooltip 
                  placement="right" 
                  style={{width: 700, maxWidth: '500px !important'}}
                  color="#2C333F" 
                  trigger={["click"]} 
                  arrow={false} 
                  title={<ShowApp/>} 
                > */}
                  <Dropdown trigger={["click"]} overlay={<ShowApp/>} placement="bottomRight">
                    <Button
                      name='showApp'
                      className={`border border-transparent flex justify-center items-center ${isButtonClicked ? "bg-richblack-700" : "hover:bg-richblack-700"}`}
                      style={{ width: "52px", height: "52px" }}
                      icon={<TbGridDots color={isButtonClicked ? "#EB6536" : "#fff"} size={30}/>}
                      onClick={() => setIsButtonClicked(!isButtonClicked)}
                    />
                  </Dropdown>
                {/* </Tooltip> */}
              </Tooltip>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
