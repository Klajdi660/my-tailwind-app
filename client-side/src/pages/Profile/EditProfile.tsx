import { FC } from "react";
import {
  Title,
  UserInfo,
  EditProfile,
  DeleteAccount,
  ChangePassword,
  PersonalDetails,
} from "../../components";
import { ProfilePageProps } from "../../types";

export const EditProfilePage: FC<ProfilePageProps> = () => {
  return (
    <section className="account_page">
      <Title name="Edit Profile" type="large" />
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
