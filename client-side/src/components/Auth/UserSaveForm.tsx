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
            className="flex_justify_center flex-col text-onNeutralBg bg-card rounded-xl p-4 gap-4 hover:bg-primary-opacity w-40 h-52"
          >
            <div className="w-full text-center">{saveAuthUser.email}</div>
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
            <div className="w-full text-center">{saveAuthUser.username}</div>
          </button>
        );
      })}
      <button
        type="button"
        className="flex_justify_center flex-col text-onNeutralBg bg-card rounded p-4 gap-4 w-40 h-52 hover:bg-primary-opacity"
      >
        <div className="w-full text-center">
          Switch accounts
          {/* <div className="w-full h-[1px] bg-divider mt-4" /> */}
        </div>

        <Icon name="FaCirclePlus" className="w-20 h-20 text-secondary" />
        {/* 
        <Button
          variant="none"
          type="button"
          // className="flex_justify_center"
          iconClassName="w-20 h-20 text-secondary"
          labelIcon="FaCirclePlus"
          // size={40}
        /> */}
        <div className="w-full text-center">Test</div>
      </button>
    </div>
  );
};
