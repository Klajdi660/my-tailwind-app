import { FunctionComponent } from "react";
import { Title, Profile } from "../../components";
import { ProfilePageProps } from "../../types";

export const ProfilePage: FunctionComponent<ProfilePageProps> = () => {
  return (
    <section className="account_page">
      <Title name="Profile" type="large" />
      <Profile />
    </section>
  );
};

export default ProfilePage;
