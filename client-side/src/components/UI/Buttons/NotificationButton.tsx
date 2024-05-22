import { FunctionComponent, useState } from "react";
import { Popover } from "antd";
import { Notification } from "../../Notification";
import { Icon } from "../Icon";
import { NotificationButtonProps } from "../../../types";

const notificationList = [
  {
    id: 1,
    content:
      "Mark Smith reacted to your recent added playlist - My first playlist",
    time: "1 minute ago",
  },
  {
    id: 2,
    content: "Sarah Johnson created a new playlist - Downtown Music",
    time: "1 day ago",
  },
  {
    id: 3,
    content: "Bob Manuel sent you a private message",
    time: "1 week ago",
  },
];

export const NotificationButton: FunctionComponent<
  NotificationButtonProps
> = () => {
  const [open, setOpen] = useState(false);

  // const hide = () => {
  //   setOpen(false);
  // };

  const handleOpenChange = (newOpen: boolean) => {
    setOpen(newOpen);
  };

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
          <div className="absolute flex items-center justify-center w-4 h-4 rounded-full top-2 right-2 bg-primary animate-bounce group-hover:bg-white">
            <span className="text-xs text-white group-hover:text-primary">
              {notificationList?.length}
            </span>
          </div>
          <div className="w-12 h-12 transition-colors duration-500 rounded flex_justify_center bg-primary-opacity group-hover:bg-primary">
            <Icon
              name="IoMdNotificationsOutline"
              className="group-hover:!text-white"
            />
          </div>
        </div>
      </Popover>
    </div>
  );
};
