import { FunctionComponent } from "react";
import { ProfilePageProps } from "../../types";
import { Title, Profile } from "../../components";

export const ProfilePage: FunctionComponent<ProfilePageProps> = () => {
  return (
    <section className="account_page">
      <Title name="Profile" type="large" />
      <Profile />
    </section>
  );
};

export default ProfilePage;
