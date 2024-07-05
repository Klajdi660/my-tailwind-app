import {
  FunctionComponent,
  useRef,
  useState,
  useMemo,
  ChangeEvent,
} from "react";
import { userIcon } from "../../assets";
// import { Icon } from "./Icon";
import { Image } from "./Image";
import { useAuth } from "../../hooks";
import { ImgUploaderParams } from "../../types";
import { fileBlob, useAppModal, useProfilePhoto } from "../../utils";
import { Button } from "./Button";

export const ImgUploader: FunctionComponent<ImgUploaderParams> = () => {
  const { user } = useAuth();
  const { setModalOpen } = useAppModal();
  const { files } = useProfilePhoto();

  const imgUrl = user?.extra?.avatar;

  const handleModalOpen = () => {
    setModalOpen("changeProfilePhotoModal", true);
  };

  const blob = useMemo(() => {
    return fileBlob(files);
  }, [files]);

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
