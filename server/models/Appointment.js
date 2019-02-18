const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const appointmentSchema = new Schema(
  {
    title: { type: String },
    start: { type: Date },
    end: { type: Date },
    description: { type: String },
    userId: { type: Schema.Types.ObjectId, ref: "User" }
  },
  {
    timestamps: true
  }
);

const Appointment = mongoose.model("Appointment", appointmentSchema);
module.exports = Appointment;
