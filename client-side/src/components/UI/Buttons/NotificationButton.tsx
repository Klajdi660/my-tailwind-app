import { Popover } from "antd";
import { FC, useState } from "react";
import { Icon } from "../Icon";
import { classNames } from "../../../utils";
import { notificationList } from "../../../data";
import { Notification } from "../../Notification";

export const NotificationButton: FC = () => {
  const [openNotifyPopover, setOpenNotifyPopover] = useState<boolean>(false);

  // const notifyPopoverHideHandler = () => {
  //   setOpenNotifyPopover(false);
  // };

  const notifyPopoverChangeHandler = (newOpen: boolean) => {
    setOpenNotifyPopover(newOpen);
  };

  return (
    <div className="flex items-center h-full cursor-pointer">
      <Popover
        trigger="click"
        arrow={false}
        content={Notification(notificationList)}
        open={openNotifyPopover}
        onOpenChange={notifyPopoverChangeHandler}
        placement="topRight"
      >
        <div className="relative group">
          <div
            className="absolute flex_justify_center w-4 h-4 rounded-full top-1 right-1 bg-primary" // animate-bounce
          >
            <span className="text-xs text-white">
              {notificationList?.length}
            </span>
          </div>
          <div
            className={classNames(
              "w-10 h-10 transition-colors duration-500 rounded-full flex_justify_center  group-hover:bg-primary-opacity",
              openNotifyPopover && "bg-primary-opacity"
            )}
          >
            <Icon
              name="IoMdNotificationsOutline"
              className={classNames(
                openNotifyPopover && "text-primary",
                "group-hover:text-primary"
              )}
            />
          </div>
        </div>
      </Popover>
    </div>
  );
};
