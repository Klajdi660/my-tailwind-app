import { Popover } from "antd";
import { FC, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useStore } from "../../hooks";
import { userIcon } from "../../assets";
import { classNames } from "../../utils";
import { UserMenuProps } from "../../types";
import { useAppSelector } from "../../store";
import { Image, Icon } from "../../components";
import { useAuthService } from "../../services";
import { profileMenuItems, paths } from "../../data";

const UserMenu: FC<UserMenuProps> = (props) => {
  const { hidden } = props;

  const { PROFILE } = paths;

  const { setModalOpen } = useStore();
  const { logout } = useAuthService();

  const navigate = useNavigate();

  const { user } = useAppSelector((state) => state.user);

  const { username, extra } = user;
  const { firstName, lastName, avatar } = extra;

  const menuItems = profileMenuItems({
    navigate,
    hidden,
    logout,
    setModalOpen,
  });

  const navigateToProfile = () => {
    hidden();
    navigate(`${PROFILE}/account`);
  };

  return (
    //    <div className="p-2 space-y-2 min-w-[300px]">
    //   <div
    //     className="flex_justify_center flex-col gap-2 p-3 bg-main rounded hover:bg-primary-opacity cursor-pointer group"
    //     onClick={navigateToProfile}
    //   >
    //     <Image
    //       imgUrl={avatar || userIcon}
    //       styles="w-12 h-12 rounded-full object-cover"
    //       name="sidebar user"
    //       effect="blur"
    //     />
    //     <div className="flex text-sm text-secondary">
    //       <span className="break-all text-onNeutralBg group-hover:text-primary">
    //         {firstName}
    //       </span>
    //       <span className="text-secondary group-hover:text-primary">
    //         @{username}
    //       </span>
    //     </div>
    //   </div>
    //   <hr className="w-full border-t border-divider" />
    //   <ul className="list-none divide divide-divider">
    //     {menuItems.map((item) => (
    //       <li
    //         className="rounded cursor-pointer text-onNeutralBg hover:text-primary group hover:bg-primary-opacity"
    //         key={item.id}
    //       >
    //         <button className="w-full p-4 text-left" onClick={item.onClick}>
    //           <div className="flex gap-3">
    //             <Icon name={item.icon} className="group-hover:text-primary" />
    //             <p className="text-sm whitespace-nowrap">{item.name}</p>
    //           </div>
    //         </button>
    //       </li>
    //     ))}
    //   </ul>
    // </div>
    <div className="p-2 space-y-2 min-w-[300px]">
      <div
        className="gap-2 p-3 rounded flex_justify_between hover:bg-primary-opacity cursor-pointer group"
        onClick={navigateToProfile}
      >
        <Image
          imgUrl={avatar || userIcon}
          styles="w-12 h-12 p-1 rounded-full object-cover"
          name="sidebar user"
          effect="blur"
        />
        <div className="flex flex-col flex-1 text-sm text-secondary">
          <span className="break-all text-onNeutralBg group-hover:text-primary">
            {firstName} {lastName}
          </span>
          <span className="text-secondary group-hover:text-primary">
            @{username}
          </span>
        </div>
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
