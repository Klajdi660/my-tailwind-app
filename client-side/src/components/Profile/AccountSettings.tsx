import { FC } from "react";
import {
  AccountDetails,
  AccountInfo,
  AccountPaymentMethods,
  AccountShippingAddress,
} from "../../components";

export const AccountSettings: FC = () => {
  return (
    <div className="flex_justify_between w-full gap-6">
      <AccountInfo />
      <div className="w-[500px] h-full flex flex-col gap-6">
        <AccountDetails />
        <AccountShippingAddress />
      </div>
      <AccountPaymentMethods />
    </div>
  );
};
