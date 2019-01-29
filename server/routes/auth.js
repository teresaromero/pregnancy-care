const express = require("express");
const passport = require("passport");
const router = express.Router();
const User = require("../models/User");
const getCode = require("../email/ConfirmationCode");
const activateUserMail = require("../email/sendMail");

// Bcrypt to encrypt passwords
const bcrypt = require("bcrypt");
const bcryptSalt = 10;

const loginPromise = (req, user) => {
  return new Promise((resolve, reject) => {
    req.login(user, e => (e ? reject(e) : resolve(user)));
  });
};

router.post("/login", (req, res, next) => {
  passport.authenticate("local", (err, user, failureDetails) => {
    if (err) return res.status(500).json({ message: err });
    if (!user) return res.status(401).json({ failureDetails });
    loginPromise(req, user)
      .then(() => res.status(200).json({ user }))
      .catch(e => res.status(500).json({ message: e.message }));
  })(req, res, next);
});

router.post("/signup", (req, res, next) => {
  const { name, surname, email, password, gender } = req.body;
  if (
    name === "" ||
    surname === "" ||
    email === "" ||
    gender === "" ||
    password === ""
  ) {
    res.json({ message: "Please enter all values" });
    return;
  }

  User.findOne({ email }, "email", (err, user) => {
    if (user !== null) {
      res.json({ message: "The email already exists" });
      return;
    }

    let confirmationCode = getCode();

    const salt = bcrypt.genSaltSync(bcryptSalt);
    const hashPass = bcrypt.hashSync(password, salt);

    const newUser = new User({
      name,
      surname,
      email,
      gender,
      confirmationCode,
      password: hashPass
    });

    newUser
      .save()
      .then(user =>
        loginPromise(req, user).then(user => {
          res.json({ user });
          activateUserMail(
            user.email,
            user.name,
            user.email,
            user.confirmationCode
          );
        })
      )
      .catch(err => {
        res.json({ message: "Something went wrong creating user" });
      });
  });
});

router.get("/currentUser", (req, res) => {
  const { user } = req;
  user
    ? res.json({ success: "ok", user })
    : res.status(401).json({ message: "No user logged" });
});

router.get("/confirm/:confirmationCode", (req, res) => {
  let { confirmationCode } = req.params;
  User.findOneAndUpdate(
    { confirmationCode: confirmationCode },
    { isActive: true }
  ).then(user => {
    res.json({ success: "user active", user });
  });
});

router.get("/isAdmin", (req, res) => {
  const { user } = req;
  user.role === "ADMIN"
    ? res.json({ success: "ok", user })
    : res.status(401).json({ role: user.role });
});

router.get("/isCustomer", (req, res) => {
  const { user } = req;
  user.role === "CUSTOMER"
    ? res.json({ success: "ok", user })
    : res.status(401).json({ role: user.role });
});

router.get("/isEmployee", (req, res) => {
  const { user } = req;
  user.role === "EMPLOYEE"
    ? res.json({ success: "ok", user })
    : res.status(401).json({ message: user.role });
});

router.get("/logout", (req, res) => {
  req.logout();
  res.json({ success: "Ok! Loged out" });
});

module.exports = router;