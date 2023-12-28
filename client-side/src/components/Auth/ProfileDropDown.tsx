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
      style={{ background: "transparent", color: "#fff"}}
    />
  );
};

const ProfileDropdown: FunctionComponent = () => {
  const { user } = useAuth();

  const getInitials = () => {
    const firstName = user?.extra?.firstName;
    const lastName = user?.extra?.lastName;

    const firstNameInitial = firstName?.charAt(0) || "";
    const lastNameInitial = lastName?.charAt(0) || "";
    return `https://place-hold.it/52x52/2c2f32/ffffff&text=${firstNameInitial}${lastNameInitial}&fontsize=25`;
  };


  if (!user) return null;

  return (        
    <Icon 
      imgUrl={user?.image ? user?.image : getInitials()} 
      styles="w-[52px] h-[52px] bg-[#2c2f32] rounded-[50%]"
      name={MenuContainer}
      type="click"
    />
  );
};

export default ProfileDropdown;
