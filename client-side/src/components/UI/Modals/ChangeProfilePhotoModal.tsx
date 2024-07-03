import { FunctionComponent } from "react";
import { SmallModal } from "./Modal";
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
        Change Profile Photo
      </div>
    </SmallModal>
  );
};
