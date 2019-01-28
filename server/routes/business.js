const express = require("express");
const passport = require("passport");
const router = express.Router();
const Business = require("../models/Business");


router.post("/addBusiness", (req, res, next) => {
  const { name, VAT, email, password } = req.body;
  if (username === "" || password === "") {
    res.json({ message: "Please enter all values" });
    return;
  }

  User.findOne({ email }, "email", (err, user) => {
    if (user !== null) {
      res.json({ message: "The email already exists" });
      return;
    }

    const salt = bcrypt.genSaltSync(bcryptSalt);
    const hashPass = bcrypt.hashSync(password, salt);

    const newUser = new User({
      name,
      surname,
      email,
      password: hashPass
    });

    newUser
      .save()
      .then(user => loginPromise(req, user).then(() => res.json({ user })))
      .catch(err => {
        res.json({ message: "Something went wrong creating user" });
      });
  });
});