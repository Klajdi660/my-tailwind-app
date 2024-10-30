import { FC } from "react";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../store";
import { Button, Icon, Image } from "../UI";
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
          <button
            type="button"
            key={saveAuthUser.id}
            className="flex flex-col items-center text-onNeutralBg bg-card rounded-xl p-4 hover:bg-primary-opacity w-44 h-52"
          >
            <div className="flex w-full justify-end">
              <Icon
                name="BsThreeDotsVertical"
                className="text-secondary"
                size={12}
              />
            </div>
            <div className="flex_justify_between flex-col gap-4 w-full">
              <p className="w-full text-center">{saveAuthUser.email}</p>
              {saveAuthUser.photo ? (
                <Image
                  imgUrl={saveAuthUser.photo}
                  name="Profile Img"
                  styles="w-20 h-20 rounded-full p-1 ring-2 ring-white object-cover"
                  effect="blur"
                />
              ) : (
                <Image
                  imgUrl={userIcon}
                  name="Profile Img"
                  styles="w-20 h-20 rounded-full p-1 ring-2 ring-white bg-main"
                  effect="blur"
                />
              )}
              <p className="w-full text-center">{saveAuthUser.username}</p>
            </div>
          </button>
        );
      })}
      <button
        className="flex_justify_center flex-col text-onNeutralBg bg-card rounded p-4 gap-4 w-44 h-52 hover:bg-primary-opacity"
        onClick={() => navigate(login)}
      >
        <div className="w-full text-center">
          Switch accounts
          {/* <div className="w-full h-[1px] bg-divider mt-4" /> */}
        </div>
        <Icon name="FaCirclePlus" className="w-20 h-20 text-secondary" />
        <div className="h-4"></div>
      </button>
    </div>
  );
};
