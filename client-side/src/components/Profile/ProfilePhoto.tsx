import { FC } from "react";
import { Button, Image } from "../UI";
import { useStore } from "../../hooks";
import { useAppSelector } from "../../store";
import { userIcon, iconName } from "../../assets";

export const ProfilePhoto: FC = () => {
  const { isUpdatingProfileImg, setModalOpen } = useStore();

  const { user } = useAppSelector((state) => state.user);

  const { avatar } = user.extra;

  const handleModalOpen = () => {
    setModalOpen("changeProfilePhotoModal", true);
  };

  return (
    <div>
      <div className="bg-card p-8 rounded w-[400px]">
        <h5 className="text-lg font-semibold pb-6">Profile photo</h5>
        <div className="flex flex-col items-center gap-6">
          <div className="relative w-52 h-52 rounded-full ring-2 ring-gray-300">
            {avatar ? (
              <Image
                imgUrl={avatar}
                name="Profile Img"
                styles="w-52 h-52 rounded-full p-1 object-cover"
                effect="blur"
              />
            ) : (
              <Image
                imgUrl={userIcon}
                name="Profile Img"
                styles="w-52 h-52 rounded-full p-1 ring-2 ring-gray-300 bg-main"
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
          </div>
          <div className="group">
            <Button
              type="submit"
              label="Change photo"
              labelIcon="HiOutlineUpload"
              variant="none"
              onClick={handleModalOpen}
              className="w-48 h-10 rounded-full bg-primary-opacity text-onNeutralBg group-hover:bg-primary group-hover:text-white"
              iconClassName="group-hover:text-white"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
