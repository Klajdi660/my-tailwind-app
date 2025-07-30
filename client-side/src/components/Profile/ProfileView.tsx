import { FC } from "react";
import {
  AccountSettings,
  GeneralSettings,
  PaymentSettings,
  ShippingAddressSettings,
} from "../../components";
import { ProfileViewProps } from "../../types";
import { firstLetterToUpperCase } from "../../utils";

export const ProfileView: FC<ProfileViewProps> = (props) => {
  const { profileId } = props;

  const profileSectionName = `${firstLetterToUpperCase(profileId)} Settings section does not exist`;

  switch (profileId) {
    case "account":
      return <AccountSettings />;
    case "general":
      return <GeneralSettings />;
    case "shipping":
      return <ShippingAddressSettings />;
    case "payments":
      return <PaymentSettings />;
    default:
      return (
        <div className="w-full h-20 flex_justify_center bg-card rounded">
          <p className="text-base text-onNeutralBg text-red-500">
            {profileSectionName}
          </p>
        </div>
      );
  }
};
