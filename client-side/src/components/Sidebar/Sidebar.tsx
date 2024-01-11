import { FunctionComponent, useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useClickAway } from "react-use";
import { useAuth } from "../../hooks";
import { Button, Tooltip } from "antd";
import { Icon } from "../UI/Icon";
import { logo, avatar } from "../../assets/img";
import { TbGridDots } from "react-icons/tb";
import { sidebarLinks } from "../../data";
import SideMenuList from "./SideMenuList";

export const Sidebar: FunctionComponent = () => {
  const [activeLink, setActiveLink] = useState(sidebarLinks[0].name);
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

  const handleLinkClick = (link: any) => {
    if (!isAuthenticated && link.name !== 'Home') {
      // toast.info(`Please login to access ${link.name} page`);
      toast.info(
        <span>
          Please login to access <span className="text-orange-10">{link.name}</span> page
        </span>
      );      
      return;
    }

    setActiveLink(link.name);
    navigate(link.link);
  };

  return (
    <div className={`sidebarWrapper md:translate-x-0 -translate-x-full md:z-0 z-50`}>
      <div className="md:w-[80px] h-full flex-col flex flex-shrink-0 items-center justify-center overflow-hidden py-4">
        <Link to="/">
          <Icon 
            imgUrl={logo} 
            styles="w-[52px] h-[52px] bg-richblack-700"
          />
        </Link>
        <SideMenuList
          sidebarLinks={sidebarLinks}
          activeLink={activeLink}
          handleLinkClick={handleLinkClick}
          iconRef={iconsRef}
        />
        <div className={`${isAuthenticated ? "pt-2 border-t border-richblack-700" : null }`}>
          {!isAuthenticated ? ( 
            <Link to='/login'>
              <Icon 
                imgUrl={avatar}
                styles="w-[52px] h-[52px] bg-richblack-700 rounded-xl"
                name='Login'
              />
            </Link>
          ) : (
            <Tooltip placement="right" title="Show Applications" color="#2C333F" trigger={["hover"]} arrow={false}>
              <Button
                ref={buttonRef}
                name='showApp'
                className={`border border-transparent flex justify-center items-center rounded-xl ${isButtonClicked ? "bg-richblack-700" : "hover:bg-richblack-700"}`}
                style={{ width: "52px", height: "52px" }}
                icon={<TbGridDots color={isButtonClicked ? "#EB6536" : "#fff"} size={30}/>}
                onClick={() => setIsButtonClicked(!isButtonClicked)}
              />
            </Tooltip>
          )} 
        </div>
      </div>
    </div>
  );
};
