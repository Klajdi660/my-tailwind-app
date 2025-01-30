import { FC } from "react";
import { useStore } from "../../hooks";
import { useAppSelector } from "../../store";
import { Button, Image } from "../../components";
import { userIcon, iconName } from "../../assets";

export const ProfilePhoto: FC = () => {
  const { isUpdatingProfileImg, setModalOpen } = useStore();

  const { user } = useAppSelector((state) => state.user);
  const { username } = user;
  const { avatar, firstName, lastName } = user.extra;

  const handleModalOpen = () => {
    setModalOpen("changeProfilePhotoModal", true);
  };

  return (
    <div className="flex_justify_between w-full p-8 bg-card rounded">
      {/* <div className="relative w-20 h-20 rounded-full ring-2 ring-gray-300">
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
            styles="w-20 h-20 rounded-full p-1 ring-2 ring-gray-300 bg-main"
            effect="blur"
          />
        )}
        {isUpdatingProfileImg && (
          <>
            <div className="absolute inset-0 flex items-center justify-center z-10">
              <Image
                imgUrl={iconName}
                name="Loading Img"
                width={120}
                effect="blur"
              />
            </div>
            <div className="absolute inset-1 bg-gray-400 backdrop-filter backdrop-blur-md bg-opacity-10 rounded-full" />
          </>
        )}
      </div> */}
      <div className="flex_justify_start flex-row  gap-6">
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
            styles="w-20 h-20 rounded-full p-1 ring-2 ring-gray-300 bg-main"
            effect="blur"
          />
        )}
        <div>
          <p className="text-onNeutralBg">{username}</p>
          <p className="text-secondary">
            {firstName} {lastName}
          </p>
        </div>
      </div>
      <div className="group">
        <Button
          type="submit"
          label="Change photo"
          labelIcon="HiOutlineUpload"
          variant="contained"
          onClick={handleModalOpen}
        />
      </div>
    </div>
  );
};
