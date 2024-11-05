import { FC } from "react";
import {
  Title,
  AccountSettingSidebar,
  AccountSettings,
  GeneralSettings,
  ShippingAddressSettings,
  PaymentSettings,
} from "../../components";
import { ProfilePageProps } from "../../types";
import { useSelectedSettings } from "../../utils";

export const EditProfilePage: FC<ProfilePageProps> = () => {
  const { selectedEditProfileName, selectedSetting } = useSelectedSettings();

  const renderEditSettingsContent = () => {
    switch (selectedSetting) {
      case "account-settings":
        return <AccountSettings />;
      case "general-settings":
        return <GeneralSettings />;
      case "shipping-settings":
        return <ShippingAddressSettings />;
      case "payment-settings":
        return <PaymentSettings />;
      default:
        return <div>Select a setting from the left menu</div>;
    }
  };

  return (
    <section className="account_page gap-4 flex flex-col">
      <Title
        name={selectedEditProfileName}
        type="large"
        divider={false}
        className="bg-card p-8 rounded w-full"
      />
      <div className="flex flex-col md:flex-row justify-between text-onNeutralBg gap-6">
        <AccountSettingSidebar />
        {renderEditSettingsContent()}
      </div>
    </section>
  );
};
