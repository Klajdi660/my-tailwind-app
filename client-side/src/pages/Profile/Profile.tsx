import { FC } from "react";
import { ProfilePageProps } from "../../types";
import { Profile } from "../../components";

export const ProfilePage: FC<ProfilePageProps> = () => {
  return (
    <section className="account_page flex flex-col gap-4">
      <Profile />
    </section>
  );
};
