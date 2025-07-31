import { FC } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { paths } from "../../data";
import { setRemember } from "../../store";
import { Button, Icon } from "../../components";
import { useUserService } from "../../services";

export const SaveDataAuthPage: FC = () => {
  const { DISCOVER } = paths;

  const { saveAuthUser } = useUserService();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async () => {
    await saveAuthUser({ remember: true });
  };

  const handleCancel = async () => {
    dispatch(setRemember(false));
    navigate(DISCOVER);
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
            onClick={handleSubmit}
          />
          <Button
            label="Not now"
            variant="none"
            className="text-primary hover:text-onNeutralBg"
            onClick={handleCancel}
          />
        </div>
      </div>
    </div>
  );
};
