import { Popover } from "antd";
import { FC, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useStore } from "../../hooks";
import { userIcon } from "../../assets";
import { classNames } from "../../utils";
import { UserMenuProps } from "../../types";
import { useAppSelector } from "../../store";
import { profileMenuItems } from "../../data";
import { Image, Icon } from "../../components";
import { useAuthService } from "../../services";

const UserMenu: FC<UserMenuProps> = (props) => {
  const { hidden } = props;

  const { setModalOpen } = useStore();
  const { logout } = useAuthService();

  const navigate = useNavigate();

  const { user } = useAppSelector((state) => state.user);

  const { email, username, extra } = user;
  const { firstName, avatar } = extra;

  const menuItems = profileMenuItems({
    navigate,
    hidden,
    logout,
    setModalOpen,
  });

  return (
    <div className="space-y-2 min-w-[300px]">
      <div className="flex_justify_center flex-col gap-2 p-3 bg-primary-opacity rounded">
        <Image
          imgUrl={avatar || userIcon}
          styles="w-12 h-12 rounded-full object-cover"
          name="sidebar user"
          effect="blur"
        />
        <div className="flex_justify_center flex-col">
          <span className="text-onNeutralBg">
            {firstName} &middot; {email || username}
          </span>
          <span className="text-secondary">{email || username}</span>
        </div>
      </div>
      <div>
        {menuItems.map((item) => (
          <div
            key={item.id}
            className="flex_justify_start gap-2 py-2 px-4 text-onNeutralBg rounded cursor-pointer hover:bg-primary-opacity"
          >
            <Icon
              name={item.icon}
              className="group-hover:text-primary"
              size={18}
            />
            <p className="text-sm whitespace-nowrap">{item.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export const ProfileDropdown: FC = () => {
  const [open, setOpen] = useState(false);

  const { user } = useAppSelector((state) => state.user);
  const { avatar } = user.extra;

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
        content={<UserMenu hidden={hidden} />}
        open={open}
        onOpenChange={handleOpenChange}
        placement="topRight"
      >
        <button type="button">
          <Image
            imgUrl={avatar ? avatar : userIcon}
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
