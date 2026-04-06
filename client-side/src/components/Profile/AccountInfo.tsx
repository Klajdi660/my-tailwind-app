import { FC } from "react";
import { Link } from "react-router-dom";
import { Button, Typography } from "antd";
import { userIcon } from "../../assets";
import { useAppSelector } from "../../store";
import { Icon, Image } from "../../components";
import { classNames } from "../../utils";

export const AccountInfo: FC = () => {
  const { user } = useAppSelector((state) => state.user);

  const { username, email, verified } = user;
  const { avatar, firstName, lastName, phoneNr, address } = user.extra;

  return (
    <div className="w-full h-full flex flex-col gap-4 p-6 bg-card rounded">
      <div className="flex">
        <div className="w-1/5">
          <Image
            imgUrl={avatar ?? userIcon}
            name="Profile Img"
            styles="w-24 h-24 rounded-full object-cover"
            effect="blur"
          />
        </div>
        <div className="w-4/5 flex flex-col gap-2">
          <div className="w-full flex_justify_between">
            <Typography.Title
              level={4}
              className="text-onNeutralBg"
              style={{ margin: 0 }}
            >
              {firstName || lastName ? `${firstName} ${lastName}` : username}
            </Typography.Title>
            <Button
              color="default"
              variant="link"
              icon={<Icon name="CiEdit" size={24} />}
            />
          </div>
          <div className="flex flex-col">
            <Link to="#">
              <p
                className={classNames(
                  verified ? "text-primary" : "text-red-500",
                  "hover:underline underline-offset-2 cursor-pointer",
                )}
              >
                {verified ? "Verified" : "Not Verified"}
              </p>
            </Link>
            <p>@{username}</p>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-4">
        <div className="flex_justify_between">
          <p className="text-gray-400">Address</p>
          <p>{address ?? "---"}</p>
        </div>
        <div className="flex_justify_between">
          <p className="text-gray-400">Email</p>
          <p>{email ?? "---"}</p>
        </div>
        <div className="flex_justify_between">
          <p className="text-gray-400">Phone Number</p>
          <p>{phoneNr ?? "---"}</p>
        </div>
      </div>
    </div>
  );
};
