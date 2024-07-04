import { FunctionComponent } from "react";
import {
  DeleteAccount,
  EditProfile,
  ChangePassword,
  Title,
  PersonalDetails,
  UserInfo,
} from "../components";
import { ProfilePageProps } from "../types";

export const ProfilePage: FunctionComponent<ProfilePageProps> = () => {
  return (
    <section className="account_page">
      <Title name="Account Settings" type="large" />
      <div className="flex flex-col gap-y-10 text-onNeutralBg">
        <UserInfo />
        <EditProfile />
        <PersonalDetails />
        <ChangePassword />
        <DeleteAccount />
      </div>
    </section>
  );
};

export default ProfilePage;
