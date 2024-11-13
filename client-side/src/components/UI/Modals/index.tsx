import { FC } from "react";
import { SettingsModal } from "./SettingsModal";
import { PaymentCardModal } from "./PaymentCardModal";
import { DeleteProfileModal } from "./DeleteProfileModal";
import { SessionExpiredModal } from "./SessionExpiredModal";
import { ChangeProfilePhotoModal } from "./ChangeProfilePhotoModal";
import { ChangeUsernameModal } from "./ChangeUsernameModal";
import { ProfileNameModal } from "./ProfileNameModal";
import { ChangeCoverPhotoModal } from "./ChangeCoverPhotoModal";
import { RemovePhotoModal } from "./RemovePhotoModal";

export const Modal: FC = () => {
  return (
    <>
      <DeleteProfileModal />
      <SessionExpiredModal />
      <ChangeProfilePhotoModal />
      <SettingsModal />
      <PaymentCardModal />
      <ChangeUsernameModal />
      <ProfileNameModal />
      <ChangeCoverPhotoModal />
      <RemovePhotoModal />
    </>
  );
};
