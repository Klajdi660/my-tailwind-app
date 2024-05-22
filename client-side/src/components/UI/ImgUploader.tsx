/* eslint-disable jsx-a11y/img-redundant-alt */
import { FunctionComponent } from "react";
import { Icon } from "./Icon";
// import { classNames } from "../../utils";
import { Image } from "./Image";
import { userIcon } from "../../assets";
// import { useAppModal } from "../../lib";
// import { Button } from "./Button";
// import { Modal } from "antd";
import { ImgUploaderParams } from "../../types";

export const ImgUploader: FunctionComponent<ImgUploaderParams> = (props) => {
  const {
    imgUrl,
    hasProvider,
    name,
    username,
    // imageRef,
    // containerDims = "h-32 w-full",
    // borderType = "rounded",
  } = props;

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
        <div className="font-normal capitalize text-base">{name}</div>
        <div className="text-sm font-normal tracking-wider text-secondary">
          @{username}
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
