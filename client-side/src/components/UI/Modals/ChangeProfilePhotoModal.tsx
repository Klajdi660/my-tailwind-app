import { FC, ChangeEvent, useRef } from "react";
import { SmallModal } from "./ModalContent";
import { Button } from "../Button";
import { useProfileService } from "../../../services";
import { useAppModal, useProfilePhoto } from "../../../utils";

export const ChangeProfilePhotoModal: FC<any> = () => {
  const { modals, setModalOpen } = useAppModal();
  const { setIsUpdatingProfileImg } = useProfilePhoto();
  const { updateDisplayPicture, removeDisplayPicture } = useProfileService();

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleModalClose = () => {
    setModalOpen("changeProfilePhotoModal", false);
  };

  const handleFileClick = () => {
    fileInputRef?.current?.click();
    handleModalClose();
  };

  const changeProfileImg = async (e: ChangeEvent<HTMLInputElement>) => {
    try {
      const file = e.target.files?.[0];

      if (file) {
        setIsUpdatingProfileImg(true);

        const formData = new FormData();
        formData.append("displayPicture", file);

        await updateDisplayPicture(formData);

        setIsUpdatingProfileImg(false);
      }
    } catch (error) {
      console.error(`Failed to upload display picture! ${error}`);
    }
  };

  const removeProfileImg = async () => {
    try {
      await removeDisplayPicture();

      handleModalClose();
    } catch (error) {
      console.error(`Failed to remove profile photo! ${error}`);
    }
  };

  return (
    <SmallModal
      open={modals["changeProfilePhotoModal"]}
      onCancel={handleModalClose}
      closable={false}
      width={400}
    >
      <div className="modal-header w-full text-center text-xl text-onNeutralBg font-semibold">
        Choose profile picture
      </div>

      <div className="modal-body mt-5 flex flex-col gap-1">
        <hr className="w-full border-t border-divider" />

        <input
          className="hidden"
          type="file"
          ref={fileInputRef}
          accept="image/*"
          onChange={changeProfileImg}
        />
        <Button
          type="submit"
          label="Upload Photo"
          variant="none"
          onClick={handleFileClick}
        />

        <hr className="w-full border-t border-divider" />

        <Button
          type="submit"
          label="Remove Current Photo"
          variant="none"
          className="text-red-500"
          onClick={removeProfileImg}
        />

        <hr className="w-full border-t border-divider" />

        <Button
          type="submit"
          label="Cancel"
          variant="none"
          className=""
          onClick={handleModalClose}
        />
      </div>
    </SmallModal>
  );
};
