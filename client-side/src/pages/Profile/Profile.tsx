import { FC } from "react";
import { ProfilePageProps } from "../../types";
import { Title, Profile } from "../../components";

export const ProfilePage: FC<ProfilePageProps> = () => {
  return (
    <section className="account_page flex flex-col gap-4">
      {/* <Title
        name="Profile"
        type="large"
        divider={false}
        className="bg-card p-8 rounded w-full"
      /> */}
      <Profile />
    </section>
  );
};
