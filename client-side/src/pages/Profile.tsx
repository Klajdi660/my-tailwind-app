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

interface ProfileProps {}

const Profile: FunctionComponent<ProfileProps> = () => {
  const { user } = useAuth();

  return (
    <section className="account_page">
      <Title
        name="Account Settings"
        // desc="Here you can edit public information about yourself. If you signed in with Google or Facebook, you can't change your email and password."
        type="large"
      />
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
    </section>
  );
};

export default Profile;
