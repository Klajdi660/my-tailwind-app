import { FC } from "react";
import {
  AccountDetails,
  AccountInfo,
  AccountPaymentMethods,
  AccountShippingAddress,
} from "../../components";

export const AccountSettings: FC = () => {
  return (
    <div className="w-full flex md:flex-row flex-col gap-6">
      <AccountInfo />
      <div className="w-full flex flex-col gap-6">
        <AccountDetails />
        <AccountShippingAddress />
      </div>
      <AccountPaymentMethods />
    </div>
  );
};
