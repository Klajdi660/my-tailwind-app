import { FC } from "react";
import { useStore } from "../../hooks";
import { userIcon } from "../../assets";
import { useAppSelector } from "../../store";
import { Button, Image } from "../../components";

export const ProfilePhoto: FC = () => {
  const { isUpdatingProfileImg, setModalOpen } = useStore();

  const { user } = useAppSelector((state) => state.user);

  const { username } = user;
  const { avatar, firstName, lastName } = user.extra;

  return (
    <div className="flex_justify_between w-full p-8 bg-card rounded">
      <div className="flex_justify_start flex-row gap-6">
        <div className="relative w-20 h-20 rounded-full ring-2 ring-gray-300">
          {avatar ? (
            <Image
              imgUrl={avatar}
              name="Profile Img"
              styles="w-20 h-20 rounded-full p-1 object-cover"
              effect="blur"
            />
          ) : (
            <Image
              imgUrl={userIcon}
              name="Profile Img"
              styles="w-20 h-20 rounded-full p-1 bg-main"
              effect="blur"
            />
          )}
          {isUpdatingProfileImg && (
            <div className="absolute inset-1 bg-gray-400 rounded-full bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10" />
          )}
        </div>
        <div>
          <p className="text-onNeutralBg">{username}</p>
          <p className="text-secondary">
            {firstName} {lastName}
          </p>
        </div>
      </div>
      <Button
        type="submit"
        label="Change photo"
        labelIcon="HiOutlineUpload"
        variant="contained"
        onClick={() => setModalOpen("changeProfilePhotoModal", true)}
      />
    </div>
  );
};
