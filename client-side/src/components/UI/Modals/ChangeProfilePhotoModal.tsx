import { FunctionComponent } from "react";
import { SmallModal } from "./Modal";
import { Button } from "../Button";
import { useAppModal } from "../../../utils";

export const ChangeProfilePhotoModal: FunctionComponent<any> = () => {
  const { modals, setModalOpen } = useAppModal();

  return (
    <SmallModal
      // open={modalOpen}
      open={modals["changeProfilePhotoModal"]}
      onCancel={() => setModalOpen("changeProfilePhotoModal", false)}
      closable={true}
      width={600}
    >
      <div className="modal-header w-full text-xl font-semibold">
        Choose profile picture
      </div>
      <div className="modal-body mt-5 flex justify-between">
        <Button
          type="submit"
          label="Upload Photo"
          variant="contained"
          className="w-[48%]"
        />
        <Button
          type="submit"
          label="Remove Current Photo"
          variant="delete"
          className="w-[48%]"
        />
      </div>
    </SmallModal>
  );
};
