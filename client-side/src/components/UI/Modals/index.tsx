import { FC } from "react";
import { DeleteProfileModal } from "./DeleteProfileModal";
import { SessionExpiredModal } from "./SessionExpiredModal";
import { ChangeProfilePhotoModal } from "./ChangeProfilePhotoModal";
import { ChangeUsernameModal } from "./ChangeUsernameModal";
import { ProfileNameModal } from "./ProfileNameModal";
import { RemovePhotoModal } from "./RemovePhotoModal";

export const Modal: FC = () => {
  return (
    <>
      <DeleteProfileModal />
      <SessionExpiredModal />
      <ChangeProfilePhotoModal />
      <ChangeUsernameModal />
      <ProfileNameModal />
      <RemovePhotoModal />
    </>
  );
};
