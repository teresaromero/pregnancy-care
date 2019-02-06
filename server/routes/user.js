const express = require("express");
const router = express.Router();
const User = require("../models/User");

const uploadMethods = require("../config/cloudinary.js");
const { parser } = uploadMethods;

router.post(
  "/profile-picture",
  parser.single("profile-picture"),
  (req, res, next) => {
    res.json({
      success: true,
      image: req.file.url
    });
  }
);

router.put("/editProfilePicture", (req, res, next) => {
  let { id, file } = req.body;
  User.findByIdAndUpdate(id, { image: file }, { new: true })
    .then(user => res.json(user))
    .catch(e => console.log(e));
});

router.put("/edit", (req, res, next) => {
  const {
    name,
    surname,
    email,
    idNum,
    street,
    number,
    city,
    state,
    zip,
    bornDate,
    phone,
    id
  } = req.body;

  let address = { street, number, city, state, zip };

  User.findByIdAndUpdate(
    id,
    {
      name,
      surname,
      email,
      idNum,
      address,
      bornDate,
      phone
    },
    { new: true }
  )
    .then(user => res.json({ user }))
    .catch(e => console.log(e));
});

module.exports = router;
