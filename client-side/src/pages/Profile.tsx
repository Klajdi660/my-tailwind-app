import { FunctionComponent } from "react";
import { useAuth } from "../hooks";
import {
  DeleteAccount,
  EditProfile,
  ChangePassword,
  Title,
  PersonalDetails,
  UserInfo,
} from "../components";
import { useAppModal } from "../utils";
import { DeleteModal } from "../components/Settings/DeleteAccount";

interface ProfileProps {}

const Profile: FunctionComponent<ProfileProps> = () => {
  const { user } = useAuth();
  const { modalOpen } = useAppModal();

  return (
    <section className="account_page">
      <Title name="Account Settings" type="large" />
      <div className="flex flex-col gap-y-10 text-onNeutralBg">
        <UserInfo />
        <EditProfile
          email={user?.email}
          username={user?.username}
          imgUrl={user?.avatar}
          provider={user?.provider}
          user={user}
        />
        <PersonalDetails />
        <ChangePassword provider={user?.provider} />
        <DeleteAccount />
      </div>
      {modalOpen && <DeleteModal />}
    </section>
  );
};

export default Profile;
