import { FunctionComponent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Image, Icon, Button } from "../UI";
import { useAuth } from "../../hooks";
import useAuthService from "../../services/AuthService";
import { classNames } from "../../lib";
import { Popover } from "antd";

const UserMenu = (user: any, hidden: () => void) => {
  const { logout } = useAuthService();
  const navigate = useNavigate();
  const { email, username, avatar, extra } = user;

  const menuItems = [
    {
      id: "profile",
      name: "Profile",
      icon: "BiUser",
      onClick: () => {
        navigate("profile");
        hidden();
      },
    },
    {
      id: "settings",
      name: "Settings",
      icon: "AiOutlineSetting",
      onClick: () => {
        navigate("settings");
        hidden();
      },
    },
    {
      id: "logout",
      name: "Sign out",
      icon: "LiaSignOutAltSolid",
      onClick: () => {
        logout();
        hidden();
      },
    },
  ];

  return (
    <div className="p-2 space-y-3 min-w-[300px]">
      {email && (
        <div
          className="gap-2 p-3 rounded flex_justify_between bg-main hover:bg-primary-opacity cursor-pointer"
          onClick={menuItems[0].onClick}
        >
          <div className="w-10 h-10 rounded-full flex_justify_center bg-sidebar">
            {avatar ? (
              <Image
                imgUrl={avatar}
                styles="w-full h-full rounded-full"
                name="sidebar user"
              />
            ) : (
              <Icon name="FaRegUser" size={16} />
            )}
          </div>

          <div className="flex flex-col flex-1 text-sm text-secondary hover:text-primary">
            <span className="break-all text-onNeutralBg">
              {extra?.firstName} {extra?.lastName}
            </span>
            <span className="text-secondary">@{username}</span>
          </div>
        </div>
      )}

      <hr className="w-full border-t border-divider" />

      <div className="text-onNeutralBg relative flex flex-col gap-3 p-4 overflow-hidden rounded bg-main">
        <h5 className="text-lg font-semibold">Upgrade your plan</h5>
        <p>70% discount for 1 years subscriptions.</p>
        <Button label="Go Premium" variant="contained" className="w-fit" />
        <div className="absolute w-[200px] h-[200px] border-[19px] rounded-full border-primary top-[65px] right-[-150px]" />
        <div className="absolute w-[200px] h-[200px] border-[3px] rounded-full border-primary top-[135px] right-[-70px]" />
      </div>

      <hr className="w-full border-t border-divider" />

      <ul className="list-none divide divide-divider">
        {menuItems.map((item) => (
          <li
            className="rounded cursor-pointer text-onNeutralBg hover:text-primary hover:font-semibold group hover:bg-primary-opacity"
            key={item.id}
          >
            <button className="w-full p-4 text-left" onClick={item.onClick}>
              <div className="flex gap-3">
                <Icon name={item.icon} className="group-hover:text-primary" />
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
    <div className="flex items-center h-full profile">
      <Popover
        trigger="click"
        arrow={false}
        content={UserMenu(user, hide)}
        open={open}
        onOpenChange={handleOpenChange}
        placement="topRight"
      >
        <div
          className={classNames(
            "rounded-full right-0 flex_justify_center transition-colors duration-500 gap-2 cursor-pointer p-1 h-full group"
          )}
        >
          {user.avatar ? (
            <Image
              imgUrl={user.avatar}
              styles={`w-10 h-10 rounded-full p-1 ring-2 ${open ? "ring-primary" : "ring-gray-300"}`}
              name="User Img"
            />
          ) : (
            <div
              className={`inline-flex items-center justify-center w-12 h-12 bg-primary-opacity rounded-full ${open ? "border border-1 border-primary" : ""}`}
            >
              {/* <span className="font-medium text-onNeutralBg">{user.name}</span> */}
              <Icon name="FaRegUser" size={16} />
            </div>
            // <Icon name="FaRegUser" size={16} />
          )}
        </div>
      </Popover>
    </div>
  );
};

export default ProfileDropdown;
