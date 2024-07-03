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
import { fileBlob, useAppModal } from "../../utils";

export const ImgUploader: FunctionComponent<ImgUploaderParams> = () => {
  const { user } = useAuth();
  const { setModalOpen } = useAppModal();
  const [files, setFiles] = useState<File[] | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const imgUrl = user?.extra?.avatar;

  const handleModalOpen = () => {
    setModalOpen("changeProfilePhotoModal", true);
  };

  const blob = useMemo(() => {
    return fileBlob(files);
  }, [files]);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();

    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      setFiles(Array.from(e.target.files));

      if (!file.type.includes("image")) return;
    }
  };

  const handleFileClick = () => {
    fileInputRef?.current?.click();
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
          <input
            className="hidden"
            type="file"
            ref={fileInputRef}
            // accept="image.png, image/gif image/jpeg"
            accept="image/*"
            onChange={handleFileChange}
          />
          <button
            className="flex_justify_center items-center bg-primary text-white rounded font-semibold text-sm py-2 px-4 disabled:cursor-not-allowed disabled:opacity-50 transition duration-300 ease-linear scale-1 outline-none w-fit hover:brightness-110"
            // onClick={handleFileClick}
            onClick={handleModalOpen}
          >
            {/* <Icon name="AiOutlineEdit" className="mr-1 text-white" size={18} /> */}
            Change photo
          </button>
        </div>
      </div>
    </div>
  );
};
