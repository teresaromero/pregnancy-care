const express = require("express");
const router = express.Router();
const User = require("../models/User");
const Record = require("../models/Record");

// Bcrypt to encrypt passwords
const bcrypt = require("bcrypt");
const bcryptSalt = 10;

router.post("/create", (req, res, next) => {
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
    profession,
    bornDate,
    phone,
    insurance,
    insNumber,
    GDPR
  } = req.body;
  if (name === "" || email === "") {
    res.json({ message: "Please enter all values" });
    return;
  }

  User.findOne({ email }, "email", (err, user) => {
    if (user !== null) {
      res.json({ message: "The email already exists" });
      return;
    }
    let address = {
      street: street,
      number: number,
      city: city,
      state: state,
      zip: zip
    };
    const salt = bcrypt.genSaltSync(bcryptSalt);
    const hashPass = bcrypt.hashSync("12345", salt);

    const newPatient = new User({
      name,
      surname,
      email,
      idNum,
      address,
      profession,
      bornDate,
      phone,
      insurance,
      insNumber,
      GDPR,
      password: hashPass,
      role: "CUSTOMER"
    });

    newPatient
      .save()
      .then(user => res.json({ message: user }))
      .catch(err => {
        res.json({ message: err });
      });
  });
});

router.get("/all", (req, res, next) => {
  User.find({ role: "CUSTOMER" })
    .sort({ createdAt: -1 })
    .then(users => {
      res.json({ users });
    });
});

//route for searching - exact text
router.get("/search", (req, res, next) => {
  let { q } = req.query;
  User.find(
    { role: "CUSTOMER", $text: { $search: q } },
    { score: { $meta: "textScore" } }
  )
    .sort({ score: { $meta: "textScore" } })
    .then(patients => {
      res.json({ patients });
    });
});

router.post("/record/add", (req, res, next) => {
  let { record, id } = req.body;

  const newRecord = new Record(record);
  console.log(newRecord);
  newRecord.save().then(record =>
    User.findByIdAndUpdate(id, { recordId: record._id }, { new: true })
      .populate("recordId")
      .then(patient => res.json({ patient }))
      .catch(e => console.log(e))
  );
});

router.get("/record/:id", (req, res, next) => {
  let { id } = req.params;

  User.findById(id)
    .populate("recordId")
    .then(data => {
      res.json({ data });
    })
    .catch(e => console.log(e));
});

module.exports = router;
