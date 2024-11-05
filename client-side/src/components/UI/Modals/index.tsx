import { FC } from "react";
import { SettingsModal } from "./SettingsModal";
import { PaymentCardModal } from "./PaymentCardModal";
import { DeleteProfileModal } from "./DeleteProfileModal";
import { SessionExpiredModal } from "./SessionExpiredModal";
import { ChangeProfilePhotoModal } from "./ChangeProfilePhotoModal";
import { ChangeUsernameModal } from "./ChangeUsernameModal";

export const Modal: FC = () => {
  return (
    <>
      <DeleteProfileModal />
      <SessionExpiredModal />
      <ChangeProfilePhotoModal />
      <SettingsModal />
      <PaymentCardModal />
      <ChangeUsernameModal />
    </>
  );
};
