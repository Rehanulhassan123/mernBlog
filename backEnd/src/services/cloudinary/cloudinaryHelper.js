import cloudinary from "./cloudinaryConfig.js";
import fs from "fs";

export const uploadOnCloudinary = async (localFilePath, folderName = "") => {
  console.log("localFilePath", localFilePath);

  try {
    const response = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto",
      folder: folderName,
      allowed_formats: ["jpg", "png", "jpeg", "bmp"],
    });
    console.log("File has been uploaded successfully", response);
    fs.unlinkSync(localFilePath);
    return response.url;
  } catch (error) {
    console.log(error);
    fs.unlinkSync(localFilePath);
    return null;
  }
};

export const deleteFromCloudinary = async (url) => {
  const regex = /\/upload\/(?:v\d+\/)?([^/.]+)/;
  const match = url.match(regex);
  const pubicId = match ? match[1] : null;
  try {
    if (pubicId) {
      const res = await cloudinary.uploader.destroy(pubicId);
      console.log("image deleted successfully", res);
    }
  } catch (error) {
    console.log(error);
    throw error;
  }
};
