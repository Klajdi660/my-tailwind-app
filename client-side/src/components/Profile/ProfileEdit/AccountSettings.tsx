import { FC } from "react";
import {
  UserInfo,
  PersonalDetails,
  ChangePassword,
  DeleteAccount,
  EditProfile,
} from "../../../components";

export const AccountSettings: FC = () => {
  return (
    <>
      <div className="flex flex-col gap-4">
        <UserInfo />
        <PersonalDetails />
        <ChangePassword />
        <DeleteAccount />
      </div>
      <EditProfile />
    </>
  );
};
