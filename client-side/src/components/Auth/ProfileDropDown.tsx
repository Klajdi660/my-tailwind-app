import { FunctionComponent } from "react";
import { Menu, Dropdown } from "antd";
import { Icons } from "../UI/Icon";
import { useAuth } from "../../hooks";
import { FaUser, FaCog, FaSignOutAlt } from "react-icons/fa";
import useAuthService from "../../services/AuthService";
import { classNames } from "../../utils";

const MenuContainer = (user: any) => {
  const { logout } = useAuthService();
  const { email, username } = user;

  const menuItems = [
    {
      label: "Profile",
      key: "1",
      icon: <FaUser/>
    },
    // {
    //   label: "Settings",
    //   key: "2",
    //   icon: <FaCog/>
    // },
    // {
    //   label: "Logout",
    //   key: "log_out",
    //   icon: <FaSignOutAlt/>
    // },
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
    // <Dropdown menu={MenuContainer(user) as any}>
      <div className={classNames("rounded-full flex_justify_center transition-colors duration-500 gap-2 cursor-pointer bg-primary p-1 h-full group")}>
        <div className="rounded-full w-9 h-9 flex_justify_center">
          {user.avatar ? (
            <img src={user.avatar} className="w-full h-full rounded-full" alt="Profile img" />
          ) : (
            <Icons name="FaRegUser" size={16} />
          )}
        </div>
      </div>
  );
};

export default ProfileDropdown;
