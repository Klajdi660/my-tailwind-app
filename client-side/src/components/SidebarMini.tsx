import { FunctionComponent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from "../hooks";
import { Button, Tooltip } from "antd";
import { Icon } from "./UI/Icon";
import { logo, avatar } from "../assets/img";
import { TbGridDots } from "react-icons/tb";
import { sidebarLinks } from "../data";

const SidebarMini: FunctionComponent = () => {
  const [activeLink, setActiveLink] = useState(sidebarLinks[0].name);
  const [isButtonClicked, setIsButtonClicked] = useState(false); 

  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

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
    <div className="shrink-0 max-w-[80px] w-full py-8 flex flex-col items-center justify-between h-screen sticky top-0 bg-richblack-10 overflow-auto">
      <Link to="/">
        <Icon 
          imgUrl={logo} 
          styles="w-[52px] h-[52px] bg-richblack-700"
        />
      </Link>
      <div className="flex flex-col items-center gap-1">
        {/* <div style={{ maxHeight: "calc(100vh - 200px)", overflowY: "auto" }}> */}
          {sidebarLinks.map((sidelink) => (
            <Tooltip key={sidelink.id} placement="right" title={sidelink.name} color="#2C333F" trigger={["hover"]} arrow={false}>
              <Button
                key={sidelink.id}
                className={`border border-transparent rounded-xl flex justify-center items-center ${activeLink && activeLink === sidelink.name ? 'bg-richblack-700' : null} hover:bg-richblack-700`}
                style={{ width: "52px", height: "52px" }}
                onClick={() => handleLinkClick(sidelink)}
                icon={
                  <div className={`text-2xl ${activeLink && activeLink === sidelink.name ? "text-orange-10" : "text-richblack-30" }`}>
                    {sidelink.icon}
                  </div>
                }
              />
            </Tooltip>
          ))}
        {/* </div> */}
      </div>
      {!isAuthenticated && 
        <Link to='/login'>
          <Icon 
            imgUrl={avatar}
            styles="w-[52px] h-[52px] bg-richblack-700 rounded-xl"
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
  );
};

export default SidebarMini;
