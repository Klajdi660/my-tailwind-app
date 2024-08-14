import { FC } from "react";
import { ProfilePageProps } from "../../types";
import { Title, Profile } from "../../components";

export const ProfilePage: FC<ProfilePageProps> = () => {
  return (
    <section className="account_page">
      <Title name="Profile" type="large" />
      <Profile />
    </section>
  );
};
