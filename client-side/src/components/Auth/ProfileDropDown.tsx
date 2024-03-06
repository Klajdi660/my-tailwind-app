import { FunctionComponent, useState } from "react";
import { Popover } from "antd";
import { Icons, Button } from "../UI";
import { useAuth } from "../../hooks";
import { FaUser, FaCog, FaSignOutAlt } from "react-icons/fa";
import useAuthService from "../../services/AuthService";
import { classNames, getTimeOfDay } from "../../utils";

const MenuContainer = (user: any) => {
  const { logout } = useAuthService();
  const { email, username, extra } = user;
  const { firstName, lastName } = extra;

  const menuItems = [
    {
      id: "profile",
      name: "Profile",
      icon: "BiUser",
      // onClick: () => navigate("profile"),
    },
    {
      id: "notifications",
      name: "Notifications",
      icon: "IoMdNotificationsOutline",
      // onClick: () => navigate("notifications"),
    },
    {
      id: "logout",
      name: "Logout",
      icon: "MdLogout",
      // onClick: signOut,
    }
  ];
  
  const handleLogOut = async () => {
    logout();
  };

  // const onClick = ({ key }: any) => {
  //   key === "log_out" && handleLogOut();
  // };

  return (
    <div className="p-2 space-y-3 min-w-[300px]">
      {email && (
        <div className="p-3 text-sm rounded bg-main">
          <h5 className="text-lg font-semibold">
            {getTimeOfDay()},{" "}
            <span className="font-normal capitalize">{firstName} {lastName}</span>
          </h5>
          <p className="text-base">@{username}</p>
        </div>
      )}

      <hr className="w-full border-t border-divider" />
      
      <div className="relative flex flex-col gap-3 p-4 overflow-hidden rounded bg-main">
        <h5 className="text-lg font-semibold">Upgrade your plan</h5>
        <p>70% discount for 1 years subscriptions.</p>
        <Button
          label="Go Premium"
          variant="contained"
          className="w-fit"
        />
        <div className="absolute w-[200px] h-[200px] border-[19px] rounded-full border-primary top-[65px] right-[-150px]" />
        <div className="absolute w-[200px] h-[200px] border-[3px] rounded-full border-primary top-[135px] right-[-70px]" />
      </div>
           
      <hr className="w-full border-t border-divider" />

      <ul className="list-none divide divide-divider">
        {menuItems.map((item) => (
          <li
            className="rounded cursor-pointer hover:text-primary hover:font-semibold group hover:bg-primary-opacity"
            key={item.id}
          >
            <button
              className="w-full p-4 text-left"
              // onClick={item.onClick}
            >
              <div className="flex gap-3">
                <Icons
                  name={item.icon}
                  className="group-hover:text-primary"
                />
                <p className="text-sm whitespace-nowrap">{item.name}</p>
              </div>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

const ProfileDropdown: FunctionComponent = () => {
  const { user } = useAuth();
  const [open, setOpen] = useState(false);

  const hide = () => {
    setOpen(false);
  };

  const handleOpenChange = (newOpen: boolean) => {
    setOpen(newOpen);
  };

  if (!user) return null;  

  return (  
    <div className="flex items-center h-full">
      <Popover 
        trigger="click" 
        arrow={false}
        content={MenuContainer(user)} 
        open={open} 
        onOpenChange={handleOpenChange} 
        placement="topRight" 
      >
        <div className={classNames("rounded-full right-0 flex_justify_center transition-colors duration-500 gap-2 cursor-pointer bg-primary p-1 h-full group")}>
          <div className="rounded-full w-9 h-9 flex_justify_center">
            {user.avatar ? (
              <img src={user.avatar} className="w-full h-full rounded-full" alt="Profile img" />
            ) : (
              <Icons name="FaRegUser" size={16} />
            )}
          </div>
        </div>
      </Popover>  
    </div>
  );
};

export default ProfileDropdown;
