import { Popover } from "antd";
import { FC, useState } from "react";
import { userIcon } from "../../assets";
import { classNames } from "../../utils";
import { useAppSelector } from "../../store";
import { Image, ProfileDropdownMenu } from "../../components";

export const ProfileDropdown: FC = () => {
  const [open, setOpen] = useState<boolean>(false);

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
        content={<ProfileDropdownMenu hidden={hidden} />}
        open={open}
        onOpenChange={handleOpenChange}
        placement="topRight"
      >
        <button type="button">
          <Image
            imgUrl={avatar ? avatar : userIcon}
            styles={classNames(
              "w-10 h-10 p-[2px] rounded-full object-cover",
              open && "ring-2 ring-primary"
            )}
            name="user_img"
          />
        </button>
      </Popover>
    </div>
  );
};
