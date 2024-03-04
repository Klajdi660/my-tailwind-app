import config from "config";
import { v2 as cloudinary } from "cloudinary";

const { cloud_name, api_key, api_secret } = config.get<any>("cloudinary");

export const cloudinaryConnect = () => {
    cloudinary.config({
        cloud_name,
        api_key,
        api_secret
    })
};