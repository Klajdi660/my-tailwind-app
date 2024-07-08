import { FunctionComponent, ChangeEvent, useRef, useState } from "react";
import { SmallModal } from "./ModalContent";
import { Button } from "../Button";
import { useProfileService } from "../../../services";
import { useAppModal, useProfilePhoto } from "../../../utils";

export const ChangeProfilePhotoModal: FunctionComponent<any> = () => {
  const { updateDisplayPicture, removeDisplayPicture } = useProfileService();
  const { modals, setModalOpen } = useAppModal();
  const { setIsUpdatingProfileImg } = useProfilePhoto();

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
      closable={true}
      width={600}
    >
      <div className="modal-header w-full text-xl text-onNeutralBg font-semibold">
        Choose profile picture
      </div>

      <div className="modal-body mt-5 flex justify-between">
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
          variant="contained"
          className="w-2/5"
          labelIcon="AiOutlinePlus"
          onClick={handleFileClick}
        />
        <Button
          type="submit"
          label="Remove Current Photo"
          variant="delete"
          className="w-2/5"
          labelIcon="MdOutlineDeleteOutline"
          onClick={removeProfileImg}
        />
        <Button
          type="submit"
          label="Cancel"
          variant="outlined"
          className=""
          onClick={handleModalClose}
        />
      </div>
    </SmallModal>
  );
};
