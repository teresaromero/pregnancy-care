const express = require("express");
const router = express.Router();
const User = require("../models/User");
const Appointment = require("../models/Appointment");
const { isLoggedIn } = require("../middlewares/isLogged");

router.post("/add", isLoggedIn(), (req, res, next) => {
  const { appointment } = req.body;
  const newAppointment = new Appointment(appointment);
  newAppointment
    .save()
    .then(appointment => {
      Appointment.find().then(appointments => res.json({ appointments }));
    })
    .catch(err => {
      res.json(err);
    });
});

router.put("/update", isLoggedIn(), (req, res, next) => {
  let { appointment } = req.body;
  Appointment.findByIdAndUpdate(appointment._id, appointment, { new: true })
    .then(appointment => {
      Appointment.find().then(appointments => {
        res.json({ appointments });
      });
    })
    .catch(err => console.log(err));
});

router.post("/delete", isLoggedIn(), (req, res, next) => {
  const { id } = req.body;
  Appointment.findByIdAndDelete(id).then(appointment => {
    Appointment.find().then(appointments => {
      res.json({ appointments });
    });
  });
});


router.get("/all", isLoggedIn(), (req, res, next) => {
  Appointment.find().then(appointments => {
    res.json({ appointments });
  });
});


router.get("/all/:userId", isLoggedIn(), (req, res, next) => {
  let { userId } = req.params;

  Appointment.find({ userId }).then(appointments => {
    res.json({ appointments });
  });
});

module.exports = router;
