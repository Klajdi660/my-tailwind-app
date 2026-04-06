import { FC } from "react";
import {
  AccountDetails,
  AccountInfo,
  AccountPaymentMethods,
  AccountShippingAddress,
} from "../../components";

export const AccountSettings: FC = () => {
  return (
    <div className="flex">
      <div className="w-full flex flex-col md:flex-row text-onNeutralBg gap-6">
        <AccountInfo />
        <AccountDetails />
        {/* <div className="w-full flex flex-col gap-6">
          <AccountDetails />
          <AccountShippingAddress />
        </div>
        <AccountPaymentMethods /> */}
      </div>
    </div>
  );
};
