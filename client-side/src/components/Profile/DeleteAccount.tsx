import { FC } from "react";
import { useStore } from "../../hooks";
import { useAppSelector } from "../../store";
import { Button, Icon } from "../../components";
import { useProfileService } from "../../services";

export const DeleteAccount: FC = () => {
  const { cancelDeleteProfile } = useProfileService();
  const { setModalOpen } = useStore();

  const { isAccountDelete, accoundDeleteDaysDifference } = useAppSelector(
    (state) => state.cancelDeleteAccount
  );

  const handleCancelDelete = async () => {
    try {
      await cancelDeleteProfile();
    } catch (error) {
      console.error(`Failed to cancel delete user! ${error}`);
    }
  };

  return (
    <div className="bg-card p-8 rounded">
      <h5 className="text-lg font-semibold pb-6">Delete Account</h5>
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
          <p className="text-sm text-onNeutralBg text-justify">
            Click DELETE ACCOUNT to start the process of permanently deleting
            your GrooveIT Games account including all personal information,
            purchases, game progress, in-game content and GrooveIT Games Wallet
            account. Once your GrooveIT Games account is deleted, your wallet
            balance will be permanently deleted as well.
          </p>
          <p className="text-sm text-onNeutralBg text-justify font-bold">
            If you request to delete your account, your account will be deleted
            in 14 days. During this time, you can login to reactivate your
            account, which will cancel your deletion. After 14 days deletion
            will be irreversible.
          </p>
          <div className="flex justify-end mt-6">
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
