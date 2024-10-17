import { FC } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Icon } from "../../components/UI";
import { paths } from "../../data";

export const SaveDataAuthPage: FC = () => {
  const { discover } = paths;

  const navigate = useNavigate();

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
            type="button"
            label="Save info"
            variant="contained"
            onClick={() => navigate(discover)}
          />
          <Button
            type="button"
            label="Not now"
            variant="none"
            className="text-primary hover:text-onNeutralBg"
            onClick={() => navigate(discover)}
          />
        </div>
      </div>
    </div>
  );
};
