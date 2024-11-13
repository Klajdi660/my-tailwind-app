import { FC } from "react";
import { SmallModal } from "./ModalContent";
import { useProfileService } from "../../../services";
import { useAppModal, useProfilePhoto } from "../../../utils";
import { Button } from "../Button";

export const RemovePhotoModal: FC = () => {
  const { modals, setModalOpen } = useAppModal();
  const { photoType } = useProfilePhoto();
  const { removeDisplayPicture } = useProfileService();

  const removePhotoName =
    photoType === "cover" ? "Delete cover photo" : "Delete profile photo";

  const removePhotoContent =
    photoType === "cover"
      ? "Are you sure? A background image is a great way to help your profile stand out."
      : "Are you sure? Having a profile picture helps others recognize you.";

  const modalName =
    photoType === "cover" ? "changeCoverPhotoModal" : "changeProfilePhotoModal";

  const handleModalClose = () => {
    setModalOpen("removePhotoModal", false);
  };

  const handleRemoveModalClose = () => {
    setModalOpen("removePhotoModal", false);
    setModalOpen(modalName, false);
  };

  const removeProfileImg = async () => {
    try {
      await removeDisplayPicture(photoType);

      handleRemoveModalClose();
    } catch (error) {
      console.error(`Failed to remove cover photo! ${error}`);
    }
  };

  return (
    <SmallModal
      open={modals["removePhotoModal"]}
      onCancel={handleModalClose}
      width={400}
      destroyOnClose={true}
    >
      <div className="modal-header w-full text-xl text-onNeutralBg font-semibold flex items-center">
        {removePhotoName}
      </div>

      <div className="modal-body flex flex-col pt-4 gap-6 text-onNeutralBg">
        <hr className="w-full border-t border-divider" />

        <p className="text-base">{removePhotoContent}</p>

        <hr className="w-full border-t border-divider" />

        <div className="flex_justify_end">
          <Button
            label="Cancel"
            variant="none"
            className="rounded-3xl hover:bg-primary-opacity hover:text-primary"
            onClick={handleModalClose}
          />
          <Button
            label="Delete photo"
            variant="none"
            className="rounded-3xl hover:bg-primary-opacity hover:text-primary"
            onClick={removeProfileImg}
          />
        </div>
      </div>
    </SmallModal>
  );
};
