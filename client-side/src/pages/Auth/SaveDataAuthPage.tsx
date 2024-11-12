import { FC } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Button, Icon } from "../../components/UI";
import { useUserService } from "../../services";
import { paths } from "../../data";
import { setRemember } from "../../store";

export const SaveDataAuthPage: FC = () => {
  const { discover } = paths;

  const { saveAuthUser } = useUserService();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmitSaveAuthUserHandler = async () => {
    try {
      await saveAuthUser({ remember: true });
    } catch (error) {
      console.error(`Failed to save auth user! ${error}`);
    }
  };

  const onCancelSaveAuthUserHandler = async () => {
    dispatch(setRemember(false));
    navigate(discover);
  };

  return (
    <div className="fixed inset-0 flex justify-center items-center">
      <div className="save_auth_card flex_justify_center flex-col bg-card w-1/4 text-onNeutralBg rounded p-8 gap-2">
        <Icon name="PiKeyholeThin" size={80} />
        <p className="font-semibold text-base">Save your login info?</p>
        <p className="text-secondary text-center">
          We can save your login info on this browser so you don't need to enter
          it again.
        </p>
        <div className="flex flex-col mt-2 w-full gap-2">
          <Button
            label="Save info"
            variant="contained"
            onClick={onSubmitSaveAuthUserHandler}
          />
          <Button
            label="Not now"
            variant="none"
            className="text-primary hover:text-onNeutralBg"
            onClick={onCancelSaveAuthUserHandler}
          />
        </div>
      </div>
    </div>
  );
};
