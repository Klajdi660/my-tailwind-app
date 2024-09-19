import { FC } from "react";
import {
  Title,
  UserInfo,
  EditProfile,
  DeleteAccount,
  ChangePassword,
  PersonalDetails,
  // AddressDetails,
} from "../../components";
import { ProfilePageProps } from "../../types";

export const EditProfilePage: FC<ProfilePageProps> = () => {
  return (
    <section className="account_page bg-card p-8">
      <Title name="Account Settings" type="large" />
      <div className="flex flex-col md:flex-row justify-between text-onNeutralBg">
        <div className="flex flex-col gap-6 max-w-[700px] w-full">
          <UserInfo />
          <PersonalDetails />
          {/* <AddressDetails /> */}
          <ChangePassword />
          <DeleteAccount />
        </div>
        <div className="flex flex-col gap-6 md:max-w-[500px] w-full shrink-0">
          <EditProfile />
        </div>
      </div>
    </section>
  );
};
