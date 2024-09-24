import { FC } from "react";
import {
  Title,
  UserInfo,
  EditProfile,
  DeleteAccount,
  ChangePassword,
  PersonalDetails,
  // AddressDetails,
  AccountSettingSidebar,
} from "../../components";
import { ProfilePageProps } from "../../types";
import { classNames } from "../../utils";

export const EditProfilePage: FC<ProfilePageProps> = () => {
  return (
    <section className="account_page gap-4 flex flex-col">
      <Title
        name="Account Settings"
        type="large"
        divider={false}
        className="bg-card p-8 rounded w-full"
      />
      <div className="flex flex-col md:flex-row justify-between text-onNeutralBg gap-6">
        <AccountSettingSidebar />
        <div className="flex flex-col gap-4">
          <UserInfo />
          <PersonalDetails />
          {/* <AddressDetails /> */}
          <ChangePassword />
          <DeleteAccount />
        </div>
        <EditProfile />
      </div>
    </section>
  );
};
