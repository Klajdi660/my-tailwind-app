import { FC } from "react";
import { Button, Typography } from "antd";
import { Icon } from "..";
import { useAppSelector } from "../../store";

export const AccountDetails: FC = () => {
  const { user } = useAppSelector((state) => state.user);

  const { firstName, lastName, dateOfBirth, gender } = user.extra;

  return (
    <div className="w-full h-full flex flex-col gap-4 p-6 bg-card rounded">
      <div className="flex_justify_between">
        <Typography.Title
          level={4}
          className="text-onNeutralBg"
          style={{ margin: 0 }}
        >
          Account Details
        </Typography.Title>
        <Button
          color="default"
          variant="link"
          style={{ justifyContent: "flex-end" }}
          icon={<Icon name="CiEdit" size={24} />}
        />
      </div>
      <div className="flex flex-col gap-4">
        <div className="flex_justify_between">
          <span className="text-gray-400">First Name</span>
          <span>{firstName ?? "---"}</span>
        </div>
        <div className="flex_justify_between">
          <span className="text-gray-400">Last Name</span>
          <span>{lastName ?? "---"}</span>
        </div>
        <div className="flex_justify_between">
          <span className="text-gray-400">Date of Birth</span>
          <span>{dateOfBirth ?? "---"}</span>
        </div>
        <div className="flex_justify_between">
          <span className="text-gray-400">Gender</span>
          <span>{gender ?? "---"}</span>
        </div>
      </div>
    </div>
  );
};
