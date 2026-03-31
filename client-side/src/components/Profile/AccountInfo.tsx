import { FC } from "react";
import { Button, Typography } from "antd";
import { userIcon } from "../../assets";
import { useAppSelector } from "../../store";
import { Icon, Image } from "../../components";

export const AccountInfo: FC = () => {
  const { user } = useAppSelector((state) => state.user);

  const { username, email, verified } = user;
  const { avatar, firstName, lastName, phoneNr, address, balance } = user.extra;

  return (
    <div className="w-full md:w-1/2 h-full flex flex-col gap-4 p-6 bg-card rounded">
      <div className="flex flex-col gap-4">
        <Image
          imgUrl={avatar ?? userIcon}
          name="Profile Img"
          styles="w-full h-48 rounded-[30px] object-cover"
          effect="blur"
        />
      </div>
      <div className="flex flex-col gap-4">
        <div className="flex_justify_between">
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
            style={{ justifyContent: "flex-end" }}
            icon={<Icon name="CiEdit" size={24} />}
          />
        </div>
        <div className="flex_justify_between">
          <p className="text-gray-400">Account Status</p>
          <p>{verified ? "Verified" : "Not Verified"}</p>
        </div>
        <div className="flex_justify_between">
          <p className="text-gray-400">Balance</p>
          <p>{balance ?? "$0.00"}</p>
        </div>
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
