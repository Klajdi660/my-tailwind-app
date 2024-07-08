import { FunctionComponent } from "react";
import { useNavigate } from "react-router-dom";
import { SmallModal } from "./ModalContent";
import { Button } from "../Button";
import { Icon } from "../Icon";
import { paths } from "../../../data";
import { SessionExpiredProps } from "../../../types";
import { useAppModal } from "../../../utils";

export const SessionExpiredModal: FunctionComponent<
  SessionExpiredProps
> = () => {
  const { home } = paths;
  const { modals, setModalOpen } = useAppModal();
  const navigate = useNavigate();

  const handleModalClose = () => {
    setModalOpen("sessionExpiredModal", false);
    navigate(home);

    delete localStorage.atoken;
    delete localStorage.user;
    delete localStorage.lastLocation;
  };

  return (
    <SmallModal
      open={modals["sessionExpiredModal"]}
      closable={false}
      width={500}
    >
      <div className="flex_justify_between gap-4">
        <div className="flex items-center justify-center w-12 h-12 bg-yellow-100 rounded-full border border-solid border-1 border-yellow-500">
          <p>
            <Icon
              name="FiAlertTriangle"
              className="text-yellow-500"
              size={25}
            />
          </p>
        </div>
        <div className="flex flex-col flex-1">
          <span className="text-base text-onNeutralBg font-semibold">
            Your session has expired
          </span>
          <span className="text-sm text-secondary font-semibold mt-2">
            Please log in again to continue using the app.
          </span>
        </div>
      </div>
      <div className="flex items-center justify-end w-full mt-8">
        <Button
          type="submit"
          label="Log in"
          variant="contained"
          onClick={handleModalClose}
        />
      </div>
    </SmallModal>
  );
};