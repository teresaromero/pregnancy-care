const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    concat: { type: String },
    name: { type: String, required: true },
    surname: { type: String, required: true },
    email: { type: String, required: true, lowercase: true },
    password: { type: String, required: true },
    gender: { type: String, enum: ["Male", "Female"] },
    bornDate: { type: Date },
    confirmationCode: String,
    image: {
      type: "String",
      default:
        "https://res.cloudinary.com/dpid82d4m/image/upload/v1549438809/user-placeholder.svg"
    },
    isActive: { type: Boolean, default: false },
    role: {
      type: String,
      enum: ["ADMIN", "CUSTOMER", "EMPLOYEE"],
      default: "ADMIN"
    },
    address: {
      street: { type: String },
      number: { type: String },
      city: { type: String },
      state: { type: String },
      zip: { type: String }
    },
    phone: { type: String },
    profession: { type: String },
    insurance: { type: String },
    insNumber: { type: String },
    GDPR: { type: Boolean, default: false },
    GDPRdoc: { type: String },
    idNum: { type: String },
    recordId: { type: Schema.Types.ObjectId, ref: "Record" },
  },
  {
    timestamps: true
  }
);


const User = mongoose.model("User", userSchema);
module.exports = User;
