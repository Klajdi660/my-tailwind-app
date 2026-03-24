import { FC } from "react";
import { Button, Typography } from "antd";
import { Icon } from "../UI/Icon";
import { useAppSelector } from "../../store";

export const AccountShippingAddress: FC = () => {
  const { user } = useAppSelector((state) => state.user);

  const { address, city, country, state, zipCode } = user.extra;

  return (
    <div className="flex justify-between flex-col gap-4 p-6 bg-card rounded">
      <div className="flex_justify_between">
        <Typography.Title
          level={4}
          className="text-onNeutralBg"
          style={{ margin: 0 }}
        >
          Shipping Address
        </Typography.Title>
        <Button
          color="default"
          variant="link"
          style={{ justifyContent: "flex-end" }}
          icon={<Icon name="CiEdit" size={24} />}
        />
      </div>
      <div className="flex_justify_between">
        <span className="text-gray-400">Address</span>
        <span>{address ?? "---"}</span>
      </div>
      <div className="flex_justify_between">
        <span className="text-gray-400">City</span>
        <span>{city ?? "---"}</span>
      </div>
      <div className="flex_justify_between">
        <span className="text-gray-400">State</span>
        <span>{state ?? "---"}</span>
      </div>
      <div className="flex_justify_between">
        <span className="text-gray-400">Country</span>
        <span>{country ?? "---"}</span>
      </div>
      <div className="flex_justify_between">
        <span className="text-gray-400">Zip Code</span>
        <span>{zipCode ?? "---"}</span>
      </div>
    </div>
  );
};
