import { v2 as cloudinary } from "cloudinary";

const connectCloudinary = async () => {
  if (!process.env.CLOUDINARY_CLOUD_NAME) {
    console.error("⚠️ CLOUDINARY_CLOUD_NAME is missing!");
    process.exit(1);
  }

  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME.trim(),
    api_key: process.env.CLOUDINARY_API_KEY.trim(),
    api_secret: process.env.CLOUDINARY_API_SECRET.trim(),
  });

  console.log("✅ Cloudinary configured");
};

export default connectCloudinary;
export { cloudinary };
