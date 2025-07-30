import { FC } from "react";
import { useParams } from "react-router-dom";
import {
  ProfileSidebar,
  ProfileSidebarMobile,
  ProfileView,
  Title,
} from "../../components";
import { useMediaResponsive } from "../../hooks";
import { firstLetterToUpperCase } from "../../utils";

export const ProfilePage: FC = () => {
  const { isMobile } = useMediaResponsive();
  const { profileId } = useParams<{ profileId: string | any }>();

  const profileSectionName = `${firstLetterToUpperCase(profileId)} Settings`;

  return (
    <section className="profile_page flex flex-col gap-4">
      <Title
        name={profileSectionName}
        type="large"
        divider={false}
        className="bg-card md:p-8 p-4 rounded"
      />
      <div className="flex flex-col md:flex-row justify-between text-onNeutralBg gap-6">
        {isMobile ? <ProfileSidebarMobile /> : <ProfileSidebar />}
        <ProfileView profileId={profileId} />
      </div>
    </section>
  );
};
