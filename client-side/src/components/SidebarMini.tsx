import { FunctionComponent, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from "../hooks";
import { navlinks } from "../data";
import { Button, Tooltip } from "antd";
import { Icon } from "./UI/Icon";
import { logo, avatar } from "../assets/img";
import { TbGridDots } from "react-icons/tb";

const SidebarMini: FunctionComponent = () => {
  const [activeLink, setActiveLink] = useState(navlinks[0].name);
  const [isButtonClicked, setIsButtonClicked] = useState(false); 

  const location = useLocation();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  const handleLinkClick = (link: any) => {
    if (!isAuthenticated && link.name !== 'Dashboard') {
      toast.info(`Please login to access ${link.name} page`);
      return;
    }

    setActiveLink(link.name);
    navigate(link.link);
  };

  return (
    <>
      <div className="shrink-0 max-w-[80px] w-full py-8 flex flex-col items-center justify-between h-screen sticky top-0 bg-richblack-10">
        <Link to="/">
          <Icon 
            imgUrl={logo} 
            styles="w-[52px] h-[52px] bg-richblack-700"
          />
        </Link>
        <div className="flex flex-col gap-1">
          {navlinks.map((navlink) => (
            <Icon
              key={navlink.id}
              {...navlink}
              handleClick={() => handleLinkClick(navlink)}
              className={`rounded-xl hover:text-primary transition duration-300 hover:bg-[#2C333F] ${
                location.pathname === navlink.link && "text-[#EB6536] bg-[#2C333F]"
              }`}
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
        {isAuthenticated && (
          <div className="app-btn pt-2">
            <Tooltip placement="right" title="Show Applications" color="#2C333F" trigger={["hover"]} arrow={false}>
              <Button
                name='showApp'
                className={`border border-transparent flex justify-center items-center ${isButtonClicked ? "bg-richblack-700" : "hover:bg-richblack-700"}`}
                style={{ width: "52px", height: "52px" }}
                icon={<TbGridDots color={isButtonClicked ? "#EB6536" : "#fff"} size={30}/>}
                onClick={() => setIsButtonClicked(!isButtonClicked)}
              />
            </Tooltip>
          </div>
        )}
      </div>
    </>
  );
};

export default SidebarMini;
