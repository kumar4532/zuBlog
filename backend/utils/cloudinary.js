import { v2 as cloudinary} from "cloudinary";
import fs from 'fs'
import dotenv from 'dotenv'

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

const uploadOnCloudinary = async (localFilePath) => {
    try {
        if (!localFilePath) return null;

        if (!fs.existsSync(localFilePath)) {
            console.error(`File not found: ${localFilePath}`);
            return null;
        }

        console.log('Uploading file:', localFilePath);

        const response = await cloudinary.uploader.upload(localFilePath, {
            resource_type: "auto"
        });

        console.log('File uploaded successfully:', response.secure_url);

        fs.unlinkSync(localFilePath);
        return response;

    } catch (error) {
        console.error('Error uploading to Cloudinary:', error);

        if (fs.existsSync(localFilePath)) {
            fs.unlinkSync(localFilePath);
        }

        return null;
    }
}

export {uploadOnCloudinary}
