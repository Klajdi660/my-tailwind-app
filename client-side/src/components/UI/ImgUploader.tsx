import { FunctionComponent } from "react";
import { Button } from "./Button";
import { Image } from "./Image";
import { userIcon } from "../../assets";
import { useAuth } from "../../hooks";
import { ImgUploaderParams } from "../../types";
import { useAppModal } from "../../utils";

export const ImgUploader: FunctionComponent<ImgUploaderParams> = () => {
  const { user } = useAuth();
  const { setModalOpen } = useAppModal();

  const imgUrl = user?.extra?.avatar;

  const handleModalOpen = () => {
    setModalOpen("changeProfilePhotoModal", true);
  };

  return (
    <div className="flex items-center gap-10 mb-5">
      {imgUrl ? (
        <Image
          imgUrl={imgUrl}
          name="Profile Img"
          styles="w-40 h-40 rounded-full p-1 ring-2 ring-gray-300"
        />
      ) : (
        <Image
          imgUrl={userIcon}
          name="Profile Img"
          styles="w-40 h-40 rounded-full p-1 ring-2 ring-gray-300 bg-main"
        />
      )}
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
