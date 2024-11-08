import { FC } from "react";
import { Profile } from "../../components";

export const ProfilePage: FC = () => {
  return (
    <section className="account_page flex flex-col gap-4">
      <Profile />
    </section>
  );
};
