import { v2 as cloudinary } from "cloudinary";

export const uploadImgToCloudinary = async (file: any, folder: any, height: any, quality: any) => {
    const options = {
        folder,
        ...(height && { height }),
        ...(quality && { quality }),
        resource_type: "auto"
    };

    const updatedImgToCloudinary = await cloudinary.uploader.upload(file.templatePath, options);
    if (!updatedImgToCloudinary) {
        // console.error("Error uploading image to Cloudinary:");
        return { error: true, message: "Error uploading image to Cloudinary"}
    }

    return updatedImgToCloudinary;
};
