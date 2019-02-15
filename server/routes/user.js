const express = require("express");
const router = express.Router();
const User = require("../models/User");
const { isLoggedIn } = require("../middlewares/isLogged");
const uploadMethods = require("../config/cloudinary.js");
const { parser } = uploadMethods;

router.post(
  "/profile-picture",
  isLoggedIn(),
  parser.single("profile-picture"),
  (req, res, next) => {
    res.json({
      success: true,
      image: req.file.url
    });
  }
);

router.put("/editProfilePicture", isLoggedIn(), (req, res, next) => {
  let { id, file } = req.body;
  User.findByIdAndUpdate(id, { image: file }, { new: true })
    .then(user => res.json(user))
    .catch(e => console.log(e));
});

router.put("/editProfile", isLoggedIn(), (req, res, next) => {
  const {
    name,
    surname,
    email,
    bornDate,
    address,
    phone,
    idNum,
    _id
  } = req.body.user;

  User.findByIdAndUpdate(
    _id,
    { name, surname, email, bornDate, address, phone, idNum },
    { new: true }
  )
    .then(user => {
      console.log(user);
      res.json({ user });
    })
    .catch(e => console.log(e));
});

module.exports = router;
