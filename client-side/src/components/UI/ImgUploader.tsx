/* eslint-disable jsx-a11y/img-redundant-alt */
import { FunctionComponent } from "react";
import { Icons } from "./Icon";
import { classNames } from "../../utils";

interface ImgUploaderParams {
    blobUrl?: string;
    imageRef?: any;
    containerDims?: string;
    borderType?: string;
};

export const ImgUploader: FunctionComponent<ImgUploaderParams> = (props) => {
    const {
        blobUrl,
        imageRef,
        containerDims = "h-32 w-full",
        borderType = "rounded",
    } = props;
    
    return (
        <div
            className={classNames(
                "flex flex-col gap-2 relative bg-main p-1",
                containerDims,
                borderType
            )}
        >
            <div
                className={classNames(
                    "flex justify-center items-center h-full w-full cursor-pointer",
                    borderType
                )}
                onClick={() => imageRef?.current?.click()}
            >
                {blobUrl ? (
                    <>
                        <img
                            src={blobUrl}
                            alt="image"
                            width={96}
                            height={96}
                            className={classNames(
                                "h-full w-full object-contain",
                                borderType
                            )}
                        />
                    </>
                ) : (
                    <div className="flex flex-col items-center gap-2">
                        <Icons
                            name="AiOutlineCloudUpload"
                            size={28}
                            className="!text-secondary"
                        />
                        <div className="text-base font-semibold text-center text-secondary">
                            Browse file to upload
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};
