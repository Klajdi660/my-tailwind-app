import { FC } from "react";
import { Link } from "react-router-dom";
import { NotificationProps } from "../types";
import { Divider, Icon } from "../components";

export const Notification: FC<NotificationProps[]> = (notificationList) => {
  return (
    <div className="p-2 space-y-2 w-[300px] notify">
      <div className="flex items-center gap-3 p-3 rounded bg-main">
        <p className="text-base text-onNeutralBg">All notifications</p>
        <div className="flex items-center justify-center w-4 h-4 rounded-full bg-primary group-hover:bg-white">
          <span className="text-xs text-white group-hover:text-primary">
            {3}
          </span>
        </div>
      </div>
      <ul className="list-none divide-y divide-divider">
        {notificationList.map((item) => (
          <li
            className="p-3 rounded cursor-pointer hover:bg-main"
            key={item.id}
          >
            <Link className="flex gap-3" to="/notifications">
              <Icon name="IoMdNotificationsOutline" />
              <div className="flex flex-col flex-1 gap-1">
                <p className="text-sm text-onNeutralBg">{item.content}</p>
                <span className="text-xs text-secondary">{item.time}</span>
              </div>
            </Link>
          </li>
        ))}
      </ul>
      <Divider />
      <Link
        className="inline-block w-full p-3 text-sm text-center text-onNeutralBg hover:text-primary hover:bg-primary-opacity"
        to={"/notifications"}
      >
        See all notifications
      </Link>
    </div>
  );
};
