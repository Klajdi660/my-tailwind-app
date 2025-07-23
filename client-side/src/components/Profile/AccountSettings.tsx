import { FC } from "react";
import {
  ChangePassword,
  DeleteAccount,
  PersonalDetails,
  ProfilePhoto,
  UserInfo,
} from "../../components";

export const AccountSettings: FC = () => {
  return (
    <div className="flex flex-col gap-4">
      <ProfilePhoto />
      <UserInfo />
      <PersonalDetails />
      <ChangePassword />
      <DeleteAccount />
    </div>
  );
};
