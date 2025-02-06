import { FC } from "react";
import { useParams } from "react-router-dom";
import {
  AccountSettingSidebar,
  AccountSettings,
  GeneralSettings,
  ShippingAddressSettings,
  PaymentSettings,
  Title,
} from "../../components";
import { useMediaResponsive } from "../../hooks";
import { firstLetterToUpperCase } from "../../utils";

const profileComponents: Record<string, JSX.Element> = {
  account: <AccountSettings />,
  general: <GeneralSettings />,
  shipping: <ShippingAddressSettings />,
  payments: <PaymentSettings />,
};

export const ProfilePage: FC = () => {
  const { isMobile } = useMediaResponsive();
  const { profileId } = useParams<{ profileId: string | any }>();

  const profileSectionName = `${firstLetterToUpperCase(profileId)} Settings`;

  return (
    <section className="profile_page flex flex-col gap-4">
      <Title
        name={profileSectionName}
        type="large"
        divider={false}
        className="bg-card md:p-8 p-4 rounded"
      />
      <div className="flex flex-col md:flex-row justify-between text-onNeutralBg gap-6">
        {isMobile ? "" : <AccountSettingSidebar />}
        {profileComponents[profileId] ? (
          profileComponents[profileId]
        ) : (
          <div className="w-full h-20 flex_justify_center bg-card rounded">
            <p className="text-base text-onNeutralBg text-red-500">
              {profileSectionName} section does not exist
            </p>
          </div>
        )}
      </div>
    </section>
  );
};
