import { Popover } from "antd";
import { FC, useState } from "react";
import { Icon } from "../Icon";
import { Notification } from "../../Notification";
import { classNames } from "../../../utils";
import { notificationList } from "../../../data";

export const NotificationButton: FC = () => {
  const [open, setOpen] = useState(false);

  // const hide = () => {
  //   setOpen(false);
  // };

  const handleOpenChange = (newOpen: boolean) => {
    setOpen(newOpen);
  };
  console.log("open :>> ", open);
  return (
    <div className="flex items-center h-full cursor-pointer">
      <Popover
        trigger="click"
        arrow={false}
        content={Notification(notificationList)}
        open={open}
        onOpenChange={handleOpenChange}
        placement="topRight"
      >
        <div className="relative group">
          {/* <div className="absolute flex items-center justify-center w-4 h-4 rounded-full top-2 right-2 bg-primary animate-bounce group-hover:bg-white">
            <span className="text-xs text-white group-hover:text-primary">
              {notificationList?.length}
            </span>
          </div> */}
          <div
            className={classNames(
              "w-10 h-10 transition-colors duration-500 rounded-full flex_justify_center  group-hover:bg-primary-opacity",
              open && "bg-primary-opacity"
            )}
          >
            <Icon
              name="IoMdNotificationsOutline"
              className={classNames(
                open && "text-primary",
                "group-hover:text-primary"
              )}
            />
          </div>
        </div>
      </Popover>
    </div>
  );
};
