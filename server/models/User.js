const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    name: { type: String, required: true },
    surname: { type: String, required: true },
    email: { type: String, required: true, lowercase: true },
    password: { type: String, required: true },
    gender: { type: String, enum: ["Male", "Female"] },
    bornDate: { type: Date, default: Date.now },
    confirmationCode: String,
    image: String,
    isActive: { type: Boolean, default: false },
    role: {
      type: String,
      enum: ["ADMIN", "CUSTOMER", "EMPLOYEE"],
      default: "ADMIN"
    },
    //only customer data
    address: {
      street: { type: String, required: true },
      city: { type: String, required: true },
      state: { type: String, required: true },
      zip: { type: Number, required: true }
    },
    phone: { type: String, required: true },
    profession: { type: String, required: true },
    insurance: { type: String, required: true },
    RGPD: { type: Boolean, default: false },
    RGPDdoc: { type: String },
    idNum: { type: String, required: true },
    business: [{ type: Schema.Types.ObjectId, ref: "Business" }]
  },
  {
    timestamps: true
  }
);

userSchema.index({
  name: "text",
  surname: "text",
  idNum: "text",
  phone: "text"
},{weights:{name:4,surname:3,idNum:2,phone:1}});

const User = mongoose.model("User", userSchema);
module.exports = User;
