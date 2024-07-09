import { FunctionComponent } from "react";
import { useSelector } from "react-redux";
import { Button, Icon } from "../UI";
import { useProfileService } from "../../services";
import { DeleteAccountProps } from "../../types";
import { useAppModal } from "../../utils";

export const DeleteAccount: FunctionComponent<DeleteAccountProps> = () => {
  const { cancelDeleteProfile } = useProfileService();
  const { setModalOpen } = useAppModal();

  const { isAccountDelete, accoundDeleteDaysDifference } = useSelector(
    (state: any) => state.cancelDeleteAccount
  );

  const handleCancelDelete = async () => {
    try {
      await cancelDeleteProfile();
    } catch (error) {
      console.error(`Failed to cancel delete user! ${error}`);
    }
  };

  return (
    <div className="relative p-4 rounded xs:p-6 bg-card">
      <div className="mb-4 header">
        <h5 className="text-lg font-semibold">Delete Account</h5>
      </div>
      {isAccountDelete ? (
        <>
          <span className="flex items-center gap-1 text-sm text-secondary">
            <Icon
              name="FiAlertTriangle"
              className="!text-secondary"
              size={16}
            />
            Your profile is scheduled to be deleted. If you change your mind,
            you can cancel the deletion within {accoundDeleteDaysDifference}{" "}
            days.
          </span>
          <div className="flex justify-end mt-2">
            <Button
              type="submit"
              label="Cancel Delete Account"
              variant="contained"
              onClick={handleCancelDelete}
            />
          </div>
        </>
      ) : (
        <>
          <span className="flex items-center gap-1 text-sm text-red-500 ">
            <Icon name="FiAlertTriangle" className="!text-red-500" size={16} />
            Once you delete account, there is no going back. Please be certain.
          </span>
          <div className="flex justify-end mt-2">
            <Button
              type="submit"
              label="Delete Account"
              variant="delete"
              onClick={() => setModalOpen("deleteProfileModal", true)}
            />
          </div>
        </>
      )}
    </div>
  );
};
