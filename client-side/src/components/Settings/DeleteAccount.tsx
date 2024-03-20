import { FunctionComponent } from "react";
import { Button, Icon } from "../UI";

interface DeleteAccountProps {}

export const DeleteAccount: FunctionComponent<DeleteAccountProps> = () => {
  return (
    <div className="relative p-4 rounded xs:p-6 bg-card">
      <div className="mb-4 header">
        <h5 className="text-lg font-semibold">Delete Account</h5>
        <span className="flex items-center gap-1 text-sm text-red-500 ">
          <Icon name="FiAlertTriangle" className="!text-red-500" size={16} />
          Once you delete account, there is no going back. Please be certain.
        </span>
      </div>
      <div className="flex justify-end">
        <Button type="submit" label="Delete Account" variant="delete" />
      </div>
    </div>
  );
};
