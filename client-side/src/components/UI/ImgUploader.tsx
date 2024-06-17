import { FunctionComponent } from "react";
import { userIcon } from "../../assets";
import { Icon } from "./Icon";
import { Image } from "./Image";
import { useAuth } from "../../hooks";
import { ImgUploaderParams } from "../../types";

export const ImgUploader: FunctionComponent<ImgUploaderParams> = (props) => {
  const { imgUrl, hasProvider } = props;
  const { user } = useAuth();

  return (
    <div className="flex items-center gap-10">
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
          {user?.extra?.name}
        </div>
        <div className="text-sm font-normal tracking-wider text-secondary">
          @{user?.username}
        </div>
        <div className="mt-4">
          {hasProvider ? (
            <button className="flex_justify_center items-center bg-primary text-white rounded font-semibold text-sm py-2 px-4 disabled:cursor-not-allowed disabled:opacity-50 transition duration-300 ease-linear scale-1 outline-none w-fit hover:brightness-110">
              <Icon
                name="AiOutlineEdit"
                className="mr-1 text-white"
                size={18}
              />
              Change photo
            </button>
          ) : (
            <button className="flex_justify_center items-center bg-primary text-white rounded font-semibold text-sm py-2 px-4 disabled:cursor-not-allowed disabled:opacity-50 transition duration-300 ease-linear scale-1 outline-none w-fit hover:brightness-110">
              <Icon name="FiUpload" className="mr-1 text-white" size={18} />
              Upload photo
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
