import { FunctionComponent, ChangeEvent, useRef, useState } from "react";
import { SmallModal } from "./ModalContent";
import { Button } from "../Button";
import { useProfileService } from "../../../services";
import { useAppModal, useProfilePhoto } from "../../../utils";

export const ChangeProfilePhotoModal: FunctionComponent<any> = () => {
  const { updateDisplayPicture } = useProfileService();
  const { modals, setModalOpen } = useAppModal();
  const { files, setFiles } = useProfilePhoto();
  const [test, setTest] = useState(false);

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleFileClick = () => {
    fileInputRef?.current?.click();
  };

  const handleModalClose = () => {
    setModalOpen("changeProfilePhotoModal", false);
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      setFiles(file);
      setTest(true);
    }
  };

  const handleFileUpload = async () => {
    try {
      const formData = new FormData();
      formData.append("displayPicture", files);
      console.log("files :>> ", files);
      await updateDisplayPicture(formData);
      setModalOpen("changeProfilePhotoModal", false);
      setTest(false);
    } catch (error) {
      console.log("ERROR MESSAGE - ", error);
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
      {!test && (
        <div className="modal-body mt-5 flex justify-between">
          <input
            className="hidden"
            type="file"
            ref={fileInputRef}
            // accept="image/*"
            accept="image/png, image/gif, image/jpeg"
            onChange={handleFileChange}
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
          />
          <Button
            type="submit"
            label="Cancel"
            variant="outlined"
            className=""
            onClick={handleModalClose}
          />
        </div>
      )}
      {test && (
        <Button
          type="submit"
          label="OK"
          variant="outlined"
          className=""
          onClick={handleFileUpload}
        />
      )}
    </SmallModal>
  );
};
