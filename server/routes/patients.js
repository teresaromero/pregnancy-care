const express = require("express");
const router = express.Router();
const User = require("../models/User");
const Record = require("../models/Record");

// Bcrypt to encrypt passwords
const bcrypt = require("bcrypt");
const bcryptSalt = 10;

router.post("/create", (req, res, next) => {
  const { patient } = req.body;
  const emailCheck = patient.email;
  User.find({ email: emailCheck, role: "CUSTOMER" }, (err, user) => {
    if (user.length !== 0) {
      res.json({ message: "The email already exists" });
      return;
    }
    const salt = bcrypt.genSaltSync(bcryptSalt);
    const hashPass = bcrypt.hashSync("12345", salt);

    const newPatient = new User({
      ...patient,
      password: hashPass,
      role: "CUSTOMER"
    });

    newPatient
      .save()
      .then(patient => res.json({ patient }))
      .catch(err => {
        res.json(err);
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
    .then(patient => {
      res.json({ patient });
    })
    .catch(e => console.log(e));
});

module.exports = router;
