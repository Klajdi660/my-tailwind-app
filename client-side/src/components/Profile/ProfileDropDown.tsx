import { FC, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Popover } from "antd";
import { Image, Icon, Button } from "../UI";
import { userIcon } from "../../assets";
import { profileMenuItems } from "../../data";
import { useAuthService } from "../../services";
import { UserMenuProps } from "../../types";
import { classNames, useAppModal } from "../../utils";
import { useAppSelector } from "../../store";

const UserMenu: FC<UserMenuProps> = (props) => {
  const { user, hidden } = props;

  const { setModalOpen } = useAppModal();
  const { logout } = useAuthService();

  const navigate = useNavigate();

  const { email, username, extra } = user;

  const menuItems = profileMenuItems({
    navigate,
    hidden,
    logout,
    setModalOpen,
  });

  return (
    <div className="p-2 space-y-2 min-w-[300px]">
      {email && (
        <div
          className="gap-2 p-3 rounded flex_justify_between hover:bg-primary-opacity cursor-pointer"
          onClick={menuItems[0].onClick}
        >
          {extra?.avatar ? (
            <Image
              imgUrl={extra.avatar || userIcon}
              styles="w-12 h-12 p-1 rounded-full object-cover"
              name="sidebar user"
              effect="blur"
            />
          ) : (
            <Image
              imgUrl={userIcon}
              styles="w-11 h-11 p-1 rounded-full bg-sidebar"
              name="sidebar user"
              effect="blur"
            />
          )}
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
            className="rounded cursor-pointer text-onNeutralBg hover:text-primary group hover:bg-primary-opacity"
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

export const ProfileDropdown: FC = () => {
  const [open, setOpen] = useState(false);

  const { user } = useAppSelector((state) => state.user);

  const hidden = () => {
    setOpen(false);
  };

  const handleOpenChange = (newOpen: boolean) => {
    setOpen(newOpen);
  };

  return (
    <div className="flex items-center h-full profile cursor-pointer">
      <Popover
        trigger="click"
        arrow={false}
        content={<UserMenu user={user} hidden={hidden} />}
        open={open}
        onOpenChange={handleOpenChange}
        placement="topRight"
      >
        <button type="button">
          <Image
            imgUrl={user.extra.avatar ? user.extra.avatar : userIcon}
            styles={classNames(
              "w-10 h-10 rounded-full p-0.5 ring-2 object-cover",
              open ? "ring-primary" : "ring-gray-300"
            )}
            name="user_img"
          />
        </button>
      </Popover>
    </div>
  );
};
