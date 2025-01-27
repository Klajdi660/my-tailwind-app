import { FC } from "react";
import { SmallModal } from "./ModalContent";
import { useProfileService } from "../../../services";
import { useAppModal } from "../../../utils";
import { Button } from "../Button";

export const RemovePhotoModal: FC = () => {
  const { modals, setModalOpen } = useAppModal();
  const { removeDisplayPicture } = useProfileService();

  const handleModalClose = () => {
    setModalOpen("removePhotoModal", false);
  };

  const handleRemoveModalClose = () => {
    setModalOpen("removePhotoModal", false);
    setModalOpen("changeProfilePhotoModal", false);
  };

  const removeProfileImg = async () => {
    try {
      await removeDisplayPicture();

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
        Delete profile photo
      </div>

      <div className="modal-body flex flex-col pt-4 gap-6 text-onNeutralBg">
        <hr className="w-full border-t border-divider" />

        <p className="text-base">
          Are you sure? Having a profile picture helps others recognize you.
        </p>

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
