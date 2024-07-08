import { FunctionComponent } from "react";
import { Button } from "./Button";
import { Image } from "./Image";
import { userIcon, iconName } from "../../assets";
import { useAuth } from "../../hooks";
import { ImgUploaderParams } from "../../types";
import { useAppModal, useProfilePhoto } from "../../utils";

export const ImgUploader: FunctionComponent<ImgUploaderParams> = () => {
  const { user } = useAuth();
  const { setModalOpen } = useAppModal();
  const { isUpdatingProfileImg } = useProfilePhoto();

  const imgUrl = user?.extra?.avatar;

  const handleModalOpen = () => {
    setModalOpen("changeProfilePhotoModal", true);
  };

  return (
    <div className="flex items-center gap-10 mb-5">
      <div className="relative w-40 h-40 rounded-full ring-2 ring-gray-300">
        {imgUrl ? (
          <Image
            imgUrl={imgUrl}
            name="Profile Img"
            styles="w-40 h-40 rounded-full p-1 object-cover"
          />
        ) : (
          <Image
            imgUrl={userIcon}
            name="Profile Img"
            styles="w-40 h-40 rounded-full p-1 ring-2 ring-gray-300 bg-main"
          />
        )}
        {isUpdatingProfileImg && (
          // <div className="absolute flex items-center justify-center border-[4px] border-primary border-t-transparent h-12 w-12 rounded-full animate-spin z-10" />
          <>
            <div className="absolute inset-0 flex items-center justify-center z-10">
              <Image imgUrl={iconName} name="Loading Img" width={120} />
            </div>
            <div className="absolute inset-1 bg-gray-400 backdrop-filter backdrop-blur-md bg-opacity-10 rounded-full" />
          </>
        )}
      </div>
      <div>
        <div className="font-normal capitalize text-base">
          {user?.extra?.firstName} {user?.extra?.lastName}
        </div>
        <div className="text-sm font-normal tracking-wider text-secondary">
          @{user?.username}
        </div>
        <div className="mt-4">
          <Button
            type="submit"
            label="Change photo"
            variant="contained"
            onClick={handleModalOpen}
          />
        </div>
      </div>
    </div>
  );
};
