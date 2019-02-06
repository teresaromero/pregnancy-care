const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const recordSchema = new Schema(
  {
    userId: [{ type: Schema.Types.ObjectId, ref: "User" }],

    lastMenstruationDate: { type: Date },
    birthDate: { type: Date },

    prevPregnancies: { type: Number },
    prevMiss: { type: Number },
    actualPregnancy: { type: Number },

    prevBirths: { type: Number },
    prevCSec: { type: Number },

    prevDeseases: { type: Array },
    prevSurgery: { type: Array },

    alergies: { type: Array },
    riskHistory: { type: String },

    IgG: { type: Number },
    IgM: { type: Number },
    LUES: { type: Boolean },
    VIH: { type: Boolean },
    rubella: { type: Boolean },
    hepatB: { type: Boolean },
    hepatC: { type: Boolean },

    bloodGroup: { type: String, enum: ["A", "B", "AB", "0"] },
    rh: { type: String, enum: ["+", "-"] }
  },
  {
    timestamps: true
  }
);

const Record = mongoose.model("Record", recordSchema);
module.exports = Record;
