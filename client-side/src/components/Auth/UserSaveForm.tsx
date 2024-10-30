import { FC } from "react";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../store";
import { Button, Image } from "../UI";
import { userIcon } from "../../assets";
import { paths } from "../../data";

export const UserSaveForm: FC = () => {
  const { login } = paths;

  const navigate = useNavigate();

  const { saveAuthUserData } = useAppSelector((state) => state.user);

  return (
    <div className="flex_justify_center gap-6 absolute_center">
      {saveAuthUserData.map((saveAuthUser) => {
        return (
          <div
            key={saveAuthUser.id}
            className="flex_justify_center flex-col text-onNeutralBg bg-card rounded p-4 gap-4"
          >
            <div className="w-full text-center">
              {saveAuthUser.username}
              <div className="w-full h-[1px] bg-divider mt-4" />
            </div>

            <div className="w-60 h-52 flex items-center flex-col gap-4">
              {saveAuthUser.photo ? (
                <Image
                  imgUrl={saveAuthUser.photo}
                  name="Profile Img"
                  styles="w-24 h-24 rounded-full p-1 object-cover"
                  effect="blur"
                />
              ) : (
                <Image
                  imgUrl={userIcon}
                  name="Profile Img"
                  styles="w-24 h-24 rounded-full p-1 ring-2 ring-white bg-main"
                  effect="blur"
                />
              )}

              <div className="flex flex-col gap-2">
                <Button
                  variant="contained"
                  label={`Continue as ${saveAuthUser.username}`}
                />
                <Button
                  variant="none"
                  label="Remove account"
                  className="text-primary hover:text-onNeutralBg"
                />
              </div>
            </div>
          </div>
        );
      })}
      <div className="flex_justify_center flex-col text-onNeutralBg bg-card rounded p-4 gap-4">
        <div className="w-full text-center">
          Switch accounts
          <div className="w-full h-[1px] bg-divider mt-4" />
        </div>

        <div
          className="group w-60 h-52 flex_justify_center"
          onClick={() => navigate(login)}
        >
          <Button
            variant="none"
            type="button"
            className="w-24 h-24 rounded-full flex_justify_center border-2 group-hover:border-primary"
            iconClassName="group-hover:text-primary"
            labelIcon="AiOutlinePlus"
            size={40}
          />
        </div>
      </div>
    </div>
  );
};
