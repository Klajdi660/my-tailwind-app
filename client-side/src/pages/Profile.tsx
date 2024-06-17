import { FunctionComponent } from "react";
import {
  DeleteAccount,
  EditProfile,
  ChangePassword,
  Title,
  PersonalDetails,
  UserInfo,
  DeleteProfileModal,
} from "../components";
import { useAuth } from "../hooks";
import { ProfilePageProps } from "../types";
import { useAppModal } from "../utils";

export const ProfilePage: FunctionComponent<ProfilePageProps> = () => {
  const { user } = useAuth();
  const { modalOpen } = useAppModal();

  return (
    <section className="account_page">
      <Title name="Account Settings" type="large" />
      <div className="flex flex-col gap-y-10 text-onNeutralBg">
        <UserInfo />
        <EditProfile />
        <PersonalDetails />
        <ChangePassword provider={user?.provider} />
        <DeleteAccount />
      </div>
      {modalOpen && <DeleteProfileModal />}
    </section>
  );
};

export default ProfilePage;
