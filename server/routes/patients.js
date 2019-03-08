const express = require("express");
const router = express.Router();
const User = require("../models/User");
const Record = require("../models/Record");
const { isLoggedIn } = require("../middlewares/isLogged");

// Bcrypt to encrypt passwords
const bcrypt = require("bcrypt");
const bcryptSalt = 10;

router.post("/create", isLoggedIn(), (req, res, next) => {
  const { patient } = req.body;
  const emailCheck = patient.email;
  User.find({ email: emailCheck, role: "CUSTOMER" }, (err, user) => {
    if (user.length !== 0) {
      res.json({ message: "The email already exists" });
      return;
    }
    const salt = bcrypt.genSaltSync(bcryptSalt);
    const hashPass = bcrypt.hashSync("12345", salt);

    let concat =
      patient.name +
      patient.surname +
      patient.idNum +
      patient.phone +
      patient.email;

    const newPatient = new User({
      ...patient,
      password: hashPass,
      role: "CUSTOMER",
      concat
    });

    newPatient
      .save()
      .then(patient => res.json({ patient }))
      .catch(err => {
        res.json(err);
      });
  });
});

router.get("/all", isLoggedIn(), (req, res, next) => {
  User.find({ role: "CUSTOMER" })
    .sort({ createdAt: -1 })
    .select({ name: 1, surname: 1, _id: 1, image: 1 })
    .then(patients => {
      res.json({ patients });
    });
});

router.get("/search", isLoggedIn(), (req, res, next) => {
  let { q } = req.query;
  let regex = new RegExp(q, "i");
  console.log(regex);
  User.find({ role: "CUSTOMER", concat: regex })
    .limit(5)
    .then(patients => {
      console.log(patients);
      res.json({ patients });
    });
});

router.put("/update", isLoggedIn(), (req, res, next) => {
  let { patient, id } = req.body;

  User.findByIdAndUpdate(id, patient, { new: true })
    .populate("recordId")
    .then(patient => res.json({ patient }))
    .catch(e => console.log(e));
});

router.post("/record/create", isLoggedIn(), (req, res, next) => {
  let { id } = req.body;

  const newRecord = new Record();
  console.log(newRecord);
  newRecord.save().then(record =>
    User.findByIdAndUpdate(id, { recordId: record._id }, { new: true })
      .populate("recordId")
      .then(patient => res.json({ patient }))
      .catch(e => console.log(e))
  );
});

router.put("/record/update", isLoggedIn(), (req, res, next) => {
  let { record, idRecord } = req.body;

  Record.findByIdAndUpdate(idRecord, record, { new: true }).then(record =>
    User.findOne({ recordId: record._id })
      .populate("recordId")
      .then(patient => {
        res.json({ patient });
      })
      .catch(e => console.log(e))
  );
});

router.put("/record/visit", isLoggedIn(), (req, res, next) => {
  let { visit, weight, bloodPressure, IMC, idRecord, idPatient } = req.body;

  Record.findById(idRecord).then(record => {
    Promise.all([
      record.visits.push(visit),
      record.weight.push(weight),
      record.bloodPressure.push(bloodPressure),
      record.IMC.push(IMC)
    ]).then(() => {
      record.save();
      User.findOne({ _id: idPatient })
        .populate("recordId")
        .then(patient => {
          res.json({ patient });
        })
        .catch(e => console.log(e));
    });
  });
});

router.get("/record/:id", isLoggedIn(), (req, res, next) => {
  let { id } = req.params;

  User.findById(id)
    .populate("recordId")
    .then(patient => {
      res.json({ patient });
    })
    .catch(e => console.log(e));
});

router.get("/record/delete/:id", isLoggedIn(), (req, res, next) => {
  let { id } = req.params;

  User.findByIdAndDelete(id)
    .then(res => {
      console.log(res);
    })
    .catch(e => console.log(e));
});

module.exports = router;
