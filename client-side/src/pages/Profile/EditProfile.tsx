import { FC } from "react";
import { useParams } from "react-router-dom";
import {
  Title,
  AccountSettingSidebar,
  AccountSettings,
  GeneralSettings,
  ShippingAddressSettings,
  PaymentSettings,
} from "../../components";
import { firstLetterToUpperCase } from "../../utils";

const editProfileComponents: Record<string, JSX.Element> = {
  account: <AccountSettings />,
  general: <GeneralSettings />,
  shipping: <ShippingAddressSettings />,
  payments: <PaymentSettings />,
};

export const EditProfilePage: FC = () => {
  const { editProfileId } = useParams<{ editProfileId: string | any }>();

  const ediProfileSectionName = `${firstLetterToUpperCase(editProfileId)} Settings`;

  return (
    <section className="account_page gap-4 flex flex-col">
      <Title
        name={ediProfileSectionName}
        type="large"
        divider={false}
        className="bg-card p-8 rounded w-full"
      />
      <div className="flex flex-col md:flex-row justify-between text-onNeutralBg gap-6">
        <AccountSettingSidebar />
        {editProfileComponents[editProfileId] ? (
          editProfileComponents[editProfileId]
        ) : (
          <div className="w-full h-20 flex_justify_center bg-card rounded">
            <p className="text-base text-onNeutralBg text-red-500">
              {ediProfileSectionName} section does not exist
            </p>
          </div>
        )}
      </div>
    </section>
  );
};
