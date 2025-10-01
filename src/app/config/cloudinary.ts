import { v2 as cloudinary } from "cloudinary";
import AppError from "../utils/AppError";
import { envList } from "./envList";




cloudinary.config({
  cloud_name: envList.CLOUDINARY_CLOUD_NAME,
  api_key: envList.CLOUDINARY_API_KEY,
  api_secret: envList.CLOUDINARY_API_SECRET,
});



export const deleteCloudinaryImage = async (url: string) => {

    try {

        const regex = /\/v\d+\/(.*?)\.(jpg|jpeg|png|gif|webp)$/i;

        const match = url.match(regex);

        console.log({ match });

        if (match && match[1]) {
            const public_id = match[1];
            await cloudinary.uploader.destroy(public_id)
            console.log(`File ${public_id} is deleted from cloudinary`);

        }
    } catch (error: any) {
        throw new AppError(401, "Cloudinary image deletion failed", error.message)
    }
}











export default cloudinary;
