const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const appointmentSchema = new Schema(
  {
    //information
    userId: { type: Schema.Types.ObjectId, ref: "User" },

    //preconceptional visit data
    preconceptionalApp: { type: Boolean },
    preconceptionalProblems: { type: Array },
    preconceptionalDrugs: { type: Array },
    addictions: { type: Array },
    familyHistory: { type: Array },
    alergies: { type: String },
    riskHistory: { type: String },
    labours: { type: Number },
    caesareanSections: { type: Number },
    diseases: { type: String },
    surgeries: { type: String },
    pregnancies: { type: Number },
    abortions: { type: Number },
    preconceptionalNotes: { type: String },

    //actual pregnancy information LMP - last menstruation ; EDC - estimated labour day ; HPT - home pregnancy test
    LMP: { type: Date },
    EDC: { type: Date },
    HPT: { type: Date },
    pregnancyType: { type: String, enum: ["Natural", "Aided"] },

    actualPregnancy: { type: Number },

    IgG: { type: Number },
    IgM: { type: Number },
    LUES: { type: Boolean },
    VIH: { type: Boolean },
    rubella: { type: Boolean },
    hepatB: { type: Boolean },
    hepatC: { type: Boolean },

    bloodGroup: { type: String, enum: ["A", "B", "AB", "0"] },
    rh: { type: String, enum: ["+", "-"] },

    patologies: { type: Array },

    appointments: [{ type: Schema.Types.ObjectId, ref: "Appointment" }]

    //visit 1 -- w7-10
    //1T - ultrasound
    //visit 2 --
    //2T - ultrasound
    //visit 3
    //2T - blood test
    //visit 4
    //visit 5
    //3T - ultrasound
    //visit 6
    //labour
    //puerperium
  },
  {
    timestamps: true
  }
);

const Appointment = mongoose.model("Appointment", appointmentSchema);
module.exports = Appointment;
