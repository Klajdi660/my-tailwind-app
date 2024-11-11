import { FC } from "react";
import moment from "moment";
import { SmallModal } from "./ModalContent";
import { useStore } from "../../../hooks";
import { useAppModal } from "../../../utils";
import { useAppSelector } from "../../../store";

export const ProfileNameModal: FC = () => {
  const { modals, setModalOpen } = useAppModal();
  const { lang, selectedTimeZone, currency } = useStore();

  const { user } = useAppSelector((state) => state.user);

  const { createdAt, extra } = user;
  const { firstName, lastName } = extra;

  const formattedDate = moment(createdAt).format("MMMM YYYY");

  const handleModalClose = () => {
    setModalOpen("profileNameModal", false);
  };

  return (
    <SmallModal
      open={modals["profileNameModal"]}
      onCancel={handleModalClose}
      width={400}
    >
      <div className="modal-header w-full text-xl text-onNeutralBg font-semibold">
        About this profile
      </div>
      <div className="modal-body w-full flex flex-col gap-4 pt-5">
        <p className="text-xl">
          {firstName} {lastName}
        </p>
        <div className="grid grid-cols-2 gap-2">
          <div>
            <p>Joined</p>
            <p className="text-secondary">{formattedDate}</p>
          </div>
          <div>
            <p>Language</p>
            <p className="text-secondary">{lang}</p>
          </div>
          <div>
            <p>Time Zone</p>
            <p className="text-secondary">{selectedTimeZone}</p>
          </div>
          <div>
            <p>Currency</p>
            <p className="text-secondary">{currency}</p>
          </div>
        </div>
      </div>
    </SmallModal>
  );
};
