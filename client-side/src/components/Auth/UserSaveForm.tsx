import { FC } from "react";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../store";
import { Icon, Image } from "../UI";
import { userIcon } from "../../assets";
import { paths } from "../../data";
import { Tooltip } from "antd";

export const UserSaveForm: FC = () => {
  const { logIn } = paths;

  const navigate = useNavigate();

  const { saveAuthUserData } = useAppSelector((state) => state.user);

  return (
    <div className="flex_justify_center gap-6 absolute_center">
      {saveAuthUserData.map((saveAuthUser) => {
        return (
          <button
            type="button"
            key={saveAuthUser.id}
            className="relative flex_justify_center flex-col text-onNeutralBg bg-card rounded-xl hover:bg-primary-opacity w-44 h-52 p-2 group"
          >
            {/* Tooltip for removing account, visible only on hover */}
            <div className="absolute top-2 left-2 hidden group-hover:flex">
              <Tooltip
                title="Remove account from this page"
                placement="topLeft"
              >
                <div className="flex_justify_center bg-main h-6 w-6 rounded-full cursor-pointer">
                  <Icon
                    name="MdClear"
                    size={14}
                    className="hover:text-primary"
                  />
                </div>
              </Tooltip>
            </div>

            <div className="flex_justify_center flex-col gap-4">
              <p>{saveAuthUser.email}</p>
              {saveAuthUser.photo ? (
                <Image
                  imgUrl={saveAuthUser.photo}
                  name="Profile Img"
                  styles="w-20 h-20 rounded-full p-1 ring-1 ring-onNeutralBg object-cover"
                  effect="blur"
                />
              ) : (
                <Image
                  imgUrl={userIcon}
                  name="Profile Img"
                  styles="w-20 h-20 rounded-full p-1 ring-1 ring-onNeutralBg bg-main"
                  effect="blur"
                />
              )}
              <p className="h-4">{saveAuthUser.username}</p>
            </div>
          </button>
        );
      })}
      <button
        className="flex_justify_center flex-col text-onNeutralBg bg-card rounded-xl hover:bg-primary-opacity w-44 h-52 p-2"
        onClick={() => navigate(logIn)}
      >
        <div className="flex_justify_center flex-col gap-4">
          <p>Switch accounts</p>
          <Icon name="FaCirclePlus" className="w-20 h-20 text-secondary" />
          <p className="h-4"></p>
        </div>
      </button>
    </div>
  );
};
