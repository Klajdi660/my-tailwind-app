import { FunctionComponent } from "react";
import { Button, Icon, PatternBg } from "../UI";
import { DeleteAccountProps } from "../../types";
import { useAppModal } from "../../utils";

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
      <span className="flex items-center gap-1 text-sm text-red-500 ">
        <Icon name="FiAlertTriangle" className="!text-red-500" size={16} />
        Once you delete account, there is no going back. Please be certain.
      </span>
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
