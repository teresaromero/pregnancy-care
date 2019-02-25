const express = require("express");
const passport = require("passport");
const router = express.Router();
const User = require("../models/User");
const getCode = require("../email/ConfirmationCode");
const activateUserMail = require("../email/sendMail");
const { isLoggedOut, isLoggedIn } = require("../middlewares/isLogged");

// Bcrypt to encrypt passwords
const bcrypt = require("bcrypt");
const bcryptSalt = 10;

const loginPromise = (req, user) => {
  return new Promise((resolve, reject) => {
    req.login(user, e => (e ? reject(e) : resolve(user)));
  });
};

router.post("/login", isLoggedOut(), (req, res, next) => {
  passport.authenticate("local", (err, user, failureDetails) => {
    if (err) return res.status(500).json({ message: err });
    if (!user) return res.status(401).json({ failureDetails });
    loginPromise(req, user)
      .then(() => {
        return res.status(200).json({ user });
      })
      .catch(e => res.status(500).json({ message: e.message }));
  })(req, res, next);
});

router.post("/signup", isLoggedOut(), (req, res, next) => {
  const { name, surname, email, password } = req.body;
  if (name === "" || surname === "" || email === "" || password === "") {
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
      confirmationCode,
      password: hashPass
    });

    newUser
      .save()
      .then(user =>
        loginPromise(req, user).then(user => {
          res.json({ user });
        })
      )
      .catch(err => {
        res.json({ err });
      });
  });
});

router.get("/currentUser", isLoggedIn(), (req, res) => {
  if (req.isAuthenticated()) {
    res.status(200).json(req.user);
    return;
  }
  res.status(403).json({ message: "Unauthorized" });
});

router.get("/confirm/:confirmationCode", (req, res) => {
  let { confirmationCode } = req.params;
  User.findOneAndUpdate(
    { confirmationCode: confirmationCode },
    { isActive: true },
    { new: true }
  )
    .then(user => {
      res.json({ success: "user active", user });
    })
    .catch(err => console.log("error in activation"));
});

router.get("/logout", isLoggedIn(), (req, res) => {
  req.logout();
  res.json({ success: "Ok! Loged out" });
});

module.exports = router;
