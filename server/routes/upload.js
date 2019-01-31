const express = require("express");
const router = express.Router()
const User = require("../models/User");

const uploadMethods = require("../config/cloudinary.js");
const uploadProfilePicture = uploadMethods.uploadProfilePicture;

router.post(
  "/profile-picture",
  uploadProfilePicture.single("profile-picture"),
  (req, res, next) => {
    let image = req.file.url;
    let { user } = req.body;

    User.findByIdAndUpdate(user._id, { image }, { new: true }).then(user =>
      res.json({ user })
    );
  }
);

module.exports = router;
