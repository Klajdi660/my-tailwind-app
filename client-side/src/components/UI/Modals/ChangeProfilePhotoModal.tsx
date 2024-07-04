import { FunctionComponent } from "react";
import { SmallModal } from "./Modal";
import { Button } from "../Button";
import { useAppModal } from "../../../utils";

export const ChangeProfilePhotoModal: FunctionComponent<any> = () => {
  const { modals, setModalOpen } = useAppModal();

  const handleModalClose = () => {
    setModalOpen("changeProfilePhotoModal", false);
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
        <Button
          type="submit"
          label="Upload Photo"
          variant="contained"
          className="w-2/5"
          labelIcon="AiOutlinePlus"
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
    </SmallModal>
  );
};
