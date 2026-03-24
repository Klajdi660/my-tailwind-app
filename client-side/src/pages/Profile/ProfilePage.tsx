import { FC } from "react";
import { useParams } from "react-router-dom";
import {
  AccountSettings,
  Icon,
  ProfileSidebar,
  ProfileSidebarMobile,
  ProfileView,
  Title,
} from "../../components";
import { useMediaResponsive } from "../../hooks";
import { firstLetterToUpperCase } from "../../utils";
import { Breadcrumb, Button } from "antd";
import { HomeOutlined } from "@ant-design/icons";

export const ProfilePage: FC = () => {
  const { isMobile } = useMediaResponsive();
  const { profileId } = useParams<{ profileId: string | any }>();

  const profileSectionName = `${firstLetterToUpperCase(profileId)} Settings`;

  return (
    <section className="profile_page flex flex-col gap-8">
      <div className="flex flex-col gap-4">
        <Title name={profileSectionName} type="large" divider={false} />
        <Breadcrumb
          items={[
            {
              href: "/discover",
              title: <HomeOutlined />,
            },
            { title: "Profile" },
            {
              title: firstLetterToUpperCase(profileId),
            },
          ]}
        />
      </div>
      <div className="flex flex-col md:flex-row justify-between text-onNeutralBg gap-6">
        <AccountSettings />
        {/* {isMobile ? <ProfileSidebarMobile /> : <ProfileSidebar />}
        <ProfileView profileId={profileId} /> */}
      </div>
    </section>
  );
};
