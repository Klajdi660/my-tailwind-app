import { FunctionComponent } from "react";
import { Button, Icon, PatternBg, SmallModal } from "../UI";
import { DeleteAccountProps } from "../../types";
import { useAppModal } from "../../utils";
import { Form } from "../Auth";
import { deleteProfileList } from "../../data";

export const DeleteModal = () => {
  const { modalOpen, setModalOpen } = useAppModal();

  return (
    <SmallModal
      open={modalOpen}
      onCancel={() => setModalOpen(false)}
      closable={false}
      cancelText="Keep Account"
      cancelButtonProps={{ style: { display: "" } }}
      okText="Delete Account"
      width={800}
    >
      <div className="modal-header w-full mt-2 mb-4 text-xl font-semibold">
        Delete Account
      </div>
      <div className="modal-body">
        <Form lists={deleteProfileList} schema={""} />
      </div>
    </SmallModal>
  );
};

export const DeleteAccount: FunctionComponent<DeleteAccountProps> = () => {
  const { setModalOpen } = useAppModal();

  return (
    <div className="relative p-4 rounded xs:p-6 bg-card overflow-hidden">
      <PatternBg />
      <div className="mb-4 header">
        <h5 className="text-lg font-semibold">Delete Account</h5>
        {/* <span className="flex items-center gap-1 text-sm text-red-500 ">
          <Icon name="FiAlertTriangle" className="!text-red-500" size={16} />
          Once you delete account, there is no going back. Please be certain.
        </span> */}
      </div>
      <p className="flex items-center gap-1 text-sm text-red-500 ">
        <Icon name="FiAlertTriangle" className="!text-red-500" size={16} />
        Once you delete account, there is no going back. Please be certain.
      </p>
      <div className="flex justify-end mt-14">
        <Button
          type="submit"
          label="Delete Account"
          variant="delete"
          onClick={() => {
            setModalOpen(true);
          }}
        />
      </div>
    </div>
  );
};
