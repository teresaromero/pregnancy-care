const cloudinary = require("cloudinary");
const cloudinaryStorage = require("multer-storage-cloudinary");
const multer = require("multer");

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET
});

let profilePictures = cloudinaryStorage({
  cloudinary:cloudinary,
  folder: "pregnancy-care/profile-pictures",
  allowedFormats: ["jpg", "png"],
  filename: function(req, file, cb) {
    cb(null, req.file);
  }
});

const parser = multer({ storage: profilePictures });

module.exports = { parser };
