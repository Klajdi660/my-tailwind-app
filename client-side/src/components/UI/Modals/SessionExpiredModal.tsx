import { FC } from "react";
import { useDispatch } from "react-redux";
// import { useNavigate } from "react-router-dom";
import { SmallModal } from "./ModalContent";
import { Icon } from "../Icon";
import { Button } from "../Button";
// import { paths } from "../../../data";
import { useAppModal } from "../../../utils";
import { SessionExpiredProps } from "../../../types";
import {
  setAToken,
  setIsAuthenticated,
  setRToken,
  setUser,
} from "../../../store";

export const SessionExpiredModal: FC<SessionExpiredProps> = () => {
  // const { home, logIn } = paths;
  const { modals, setModalOpen } = useAppModal();
  // const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleModalClose = () => {
    setModalOpen("sessionExpiredModal", false);
    // navigate(home);

    dispatch(setAToken(null));
    dispatch(setRToken(null));
    dispatch(setUser(null));
    dispatch(setIsAuthenticated(false));

    delete localStorage.atoken;
    delete localStorage.user;
    delete localStorage.rtoken;
    // delete localStorage.lastLocation;
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
