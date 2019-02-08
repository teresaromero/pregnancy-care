const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const appointmentSchema = new Schema(
  {
    title:{type:String,required},
    allDay:{type:Boolean, default:false},
    start:{type:Date},
    end:{type:Date},
    editable:{type:Boolean, default:true},
    overlap:{type:Boolean, default:false}
  },
  {
    timestamps: true
  }
);

const Appointment = mongoose.model("Appointment", appointmentSchema);
module.exports = Appointment;
