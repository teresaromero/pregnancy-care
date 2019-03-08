const express = require("express");
const router = express.Router();
const User = require("../models/User");
const { isLoggedIn } = require("../middlewares/isLogged");
const { parser } = require("../config/cloudinary.js");

router.post(
  "/profile-picture",
  isLoggedIn(),
  parser.single("profile-picture"),
  (req, res, next) => {
    console.log(req.file.url)
    User.findByIdAndUpdate(req.user._id, { image: req.file.url }, { new: true })
      .then(user => res.json(user))
      .catch(err => console.log(err));
  }
);

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
      res.json({ user });
    })
    .catch(e => console.log(e));
});

module.exports = router;
