import { FC } from "react";
import { Button, Typography } from "antd";
import { useAppSelector } from "../../store";
import { Icon } from "../UI/Icon";
import { PaymentSettings } from "./PaymentSettings";

export const AccountPaymentMethods: FC = () => {
  const { user } = useAppSelector((state) => state.user);

  console.log("user.extra :>> ", user.extra);

  return (
    <div className="w-full h-full flex flex-col gap-4 p-6 bg-card rounded">
      <div className="flex_justify_between">
        <Typography.Title
          level={4}
          className="text-onNeutralBg"
          style={{ margin: 0 }}
        >
          Payment Methods
        </Typography.Title>
        <Button
          color="default"
          variant="link"
          style={{ justifyContent: "flex-end" }}
          icon={<Icon name="CiEdit" size={24} />}
        />
      </div>
      <div className="flex flex-col gap-8">
        <PaymentSettings />
        <div className="flex flex-col gap-4">
          <div className="flex_justify_between">
            <span className="text-gray-400">Card Type</span>
            <span>---</span>
          </div>
          <div className="flex_justify_between">
            <span className="text-gray-400">Card Holder</span>
            <span>---</span>
          </div>
          <div className="flex_justify_between">
            <span className="text-gray-400">Expire</span>
            <span>---</span>
          </div>
          <div className="flex_justify_between">
            <span className="text-gray-400">Card Number</span>
            <span>---</span>
          </div>
          <div className="flex_justify_between">
            <span className="text-gray-400">Balance</span>
            <span>---</span>
          </div>
        </div>
      </div>
    </div>
  );
};
