/* eslint-disable jsx-a11y/img-redundant-alt */
import { FunctionComponent } from "react";
import { Icon } from "./Icon";
// import { classNames } from "../../utils";
import { Image } from "./Image";

interface ImgUploaderParams {
  imgUrl: string;
  hasProvider?: boolean;
  imageRef?: any;
  containerDims?: string;
  borderType?: string;
  name?: string;
  bio?: string;
}

export const ImgUploader: FunctionComponent<ImgUploaderParams> = (props) => {
  const {
    imgUrl,
    hasProvider,
    name,
    bio,
    // imageRef,
    // containerDims = "h-32 w-full",
    // borderType = "rounded",
  } = props;

  return (
    // <div
    //   className={classNames(
    //     "flex flex-col gap-2 relative bg-main p-1",
    //     containerDims,
    //     borderType
    //   )}
    // >
    //   <div
    //     className={classNames(
    //       "flex justify-center items-center h-full w-full cursor-pointer",
    //       borderType
    //     )}
    //     onClick={() => imageRef?.current?.click()}
    //   >
    //     {blobUrl ? (
    //       <>
    //         <img
    //           src={blobUrl}
    //           alt="image"
    //           width={96}
    //           height={96}
    //           className={classNames("h-full w-full object-contain", borderType)}
    //         />
    //       </>
    //     ) : (
    //       <div className="flex flex-col items-center gap-2">
    //         <Icon
    //           name="AiOutlineCloudUpload"
    //           size={28}
    //           className="!text-secondary"
    //         />
    //         <div className="text-base font-semibold text-center text-secondary">
    //           Browse file to upload
    //         </div>
    //       </div>
    //     )}
    //   </div>
    // </div>

    <div className="flex items-center gap-10">
      <Image
        imgUrl={imgUrl}
        name="Profile Img"
        styles="w-40 h-40 rounded-full p-1 ring-2 ring-gray-300"
      />
      <div>
        <div className="font-normal capitalize text-base">{name}</div>
        {bio && (
          <div className="text-sm font-normal tracking-wider text-secondary">
            {bio}
          </div>
        )}
        <div className="mt-4">
          <button className="flex_justify_center items-center bg-primary text-white rounded font-semibold text-sm py-2 px-4 disabled:cursor-not-allowed disabled:opacity-50 transition duration-300 ease-linear scale-1 outline-none w-fit hover:brightness-110">
            <Icon name="AiOutlineEdit" className="mr-1 text-white" size={18} />
            Change photo
          </button>
        </div>
      </div>
    </div>
  );
};
