const cloudinary = require("cloudinary").v2;
const multer = require("multer");
require("dotenv").config();
const cloud_name = process.env.CLOUD_NAME;
const api_key = process.env.CLOUDINARY_API_KEY;
const api_secret = process.env.CLOUDINARY_API_SECRET;
cloudinary.config({
  api_key,
  api_secret,
  cloud_name,
});

const parseFile = (type) =>
  multer({ storage: multer.diskStorage({}) }).single(type);
const uploadFile = async (type, image) => {
  const result = await cloudinary.uploader.upload(image, {
    folder: `bookstore/${type}s`,
    use_filename: true,
  });
  return result;
};
module.exports = { parseFile, uploadFile };
