import { FunctionComponent } from "react";
import { Menu } from "antd";
import { Icon } from "../UI/Icon";
import { useAuth } from "../../hooks";
import { FaUser, FaCog, FaSignOutAlt } from "react-icons/fa";
import useAuthService from "../../services/AuthService";

const MenuContainer = () => {
  const { logout } = useAuthService();

  const menuItems = [
    {
      label: "Profile",
      key: "1",
      icon: <FaUser/>
    },
    {
      label: "Settings",
      key: "2",
      icon: <FaCog/>
    },
    {
      label: "Logout",
      key: "log_out",
      icon: <FaSignOutAlt/>
    },
  ];
  
  const handleLogOut = async () => {
    logout();
  };

  const onClick = ({ key }: any) => {
    key === "log_out" && handleLogOut();
  };

  return (
    <Menu 
      items={menuItems} 
      mode="inline" 
      onClick={onClick} 
      style={{ background: "transparent", color: "#fff" }}
    />
  );
};

const ProfileDropdown: FunctionComponent = () => {
  const { user } = useAuth();

  if (!user) return null;

  return (  
    <Icon 
      imgUrl={user.avatar}
      styles="w-[52px] h-[52px] bg-richblack-700 rounded-full"
      name={MenuContainer}
      isActive="Login"
      type="click"
      // className="border-2 border-white mt-6"
    />
  );
};

export default ProfileDropdown;
