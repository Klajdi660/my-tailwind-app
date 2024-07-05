import { FunctionComponent } from "react";
import { ChangeProfilePhotoModal } from "./ChangeProfilePhotoModal";
import { DeleteProfileModal } from "./DeleteProfileModal";
import { SessionExpiredModal } from "./SessionExpiredModal";

export const Modal: FunctionComponent = () => {
  return (
    <>
      <SessionExpiredModal />
      <ChangeProfilePhotoModal />
      <DeleteProfileModal />
    </>
  );
};
