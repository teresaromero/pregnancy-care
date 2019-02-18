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
    .then(appointment => res.json({ appointment }))
    .catch(err => {
      res.json(err);
    });
});

router.post("/delete", isLoggedIn(), (req, res, next) => {
  const { id } = req.body;

  Appointment.findByIdAndDelete(id).then(appointment => {
    Appointment.find().then(appointments => {
      res.json({ appointments });
    });
  });
});

router.put("/update", isLoggedIn(), (req, res, next) => {
  const { start, end, id } = req.body;
  console.log(id);
  Appointment.findByIdAndUpdate(
    id,
    { start: start, end: end },
    { new: true }
  ).then(appointment => {
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

module.exports = router;
