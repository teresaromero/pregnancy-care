const express = require("express");
const router = express.Router();
const User = require("../models/User");
const Appointment = require("../models/Appointment");
const { isLoggedIn} = require('../middlewares/isLogged');

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

router.get("/all", isLoggedIn(), (req, res, next) => {
  Appointment.find().then(appointments => {
    res.json({ appointments });
  });
});

module.exports = router;
