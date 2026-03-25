import { FC } from "react";
import { Breadcrumb } from "antd";
import { useParams } from "react-router-dom";
import { firstLetterToUpperCase } from "../../utils";
import { ProfileSidebar, ProfileView, Title } from "../../components";

export const ProfilePage: FC = () => {
  const { profileId } = useParams<{ profileId: string | any }>();

  const selectedName = firstLetterToUpperCase(profileId);

  return (
    <section className="profile_page flex flex-col gap-8">
      <div className="flex flex-col gap-2">
        <Title name={selectedName} type="large" divider={false} />
        <Breadcrumb
          items={[
            { href: "/discover", title: "Home" },
            { title: selectedName },
          ]}
        />
      </div>
      <div className="flex flex-col gap-6">
        <ProfileSidebar />
        <ProfileView profileId={profileId} />
      </div>
    </section>
  );
};
