import { FunctionComponent } from "react";
import { SettingsModal } from "./SettingsModal";
import { PaymentCardModal } from "./PaymentCardModal";
import { DeleteProfileModal } from "./DeleteProfileModal";
import { SessionExpiredModal } from "./SessionExpiredModal";
import { ChangeProfilePhotoModal } from "./ChangeProfilePhotoModal";

export const Modal: FunctionComponent = () => {
  return (
    <>
      <DeleteProfileModal />
      <SessionExpiredModal />
      <ChangeProfilePhotoModal />
      <SettingsModal />
      <PaymentCardModal />
    </>
  );
};
