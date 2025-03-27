import { v2 as cloudinary } from "cloudinary";
import "dotenv/config.js";

const cloudinaryName = process.env.CLOUDINARY_CLOUD_NAME;
const cloudinaryKey = process.env.CLOUDINARY_API_KEY;
const cloudinarySecret = process.env.CLOUDINARY_API_SECRET;

cloudinary.config({
  cloud_name: cloudinaryName,
  api_key: cloudinaryKey,
  api_secret: cloudinarySecret,
  secure: true,
});

export const uploadImage = async (filePath) => {
  return await cloudinary.uploader.upload(filePath, {
    folder: "JFR",
  });
};

export const deleteImage = async (public_id) => {
  try {
    await cloudinary.uploader.destroy(public_id);
  } catch (error) {
    console.error("Error al eliminar imagen de Cloudinary:", error);
  }
};