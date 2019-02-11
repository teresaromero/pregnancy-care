const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const recordSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User" },
    pregnanciesId: [{ type: Schema.Types.ObjectId, ref: "Pregnancy" }],
    
    backgroundDiseases: { type: String, default: "" },
    backgroundPsychiatricIll: { type: String, default: "" },
    backgroundAddictions: { type: String, default: "" },
    backgroundReproductive: { type: String, default: "" },

    diseases: { type: String, default: "" },
    allergies: { type: String, default: "" },

    addictions: [
      {
        type: String,
        enum: ["alcohol", "tobacco", "drugs", "none"],
        default: "none"
      }
    ],
    contraceptive: [
      {
        type: String,
        enum: [
          "None",
          "Implant",
          "IUD",
          "Shot",
          "Vaginal Ring",
          "Patch",
          "Pill",
          "Condom",
          "Internal Condom",
          "Diaphragm",
          "Sponge",
          "Cervical Cap",
          "Spermicide",
          "Withdrawal",
          "Breastfeeding",
          "Abstinence",
          "Other"
        ],
        default: "None"
      }
    ],
    contraceptiveOther: { type: String, default: "" },

    STD: [
      {
        type: String,
        enum: [
          "None",
          "Chlamydia",
          "Genital Warts (HPV)",
          "Gonorrhea",
          "Hepatitis B",
          "Herpes",
          "VIH",
          "HPV",
          "Molluscum Contagiosum",
          "Pubic Lice",
          "Scabies",
          "Syphilis",
          "Trichomoniasis",
          "Other"
        ],
        default: "None"
      }
    ],
    STDother: { type: String, default: "" },
    STDovercome: { type: String, default: "NotCurrently" },

    HPVvaccine: { type: String, enum: ["Yes", "No"], default: "No" },

    menstrualCycleDays: { type: Number, default: "" },
    menstrualCycleFrequency: { type: Number, default: "" },

    bloodGroup: { type: String, enum: ["A", "B", "AB", "0"] },
    rh: { type: String, enum: ["+", "-"] },

    pregnancies: { type: Number, default: 0 },
    labours: { type: Number, default: 0 },
    caesareanSections: { type: Number, default: 0 },
    abortions: { type: Number, default: 0 },
    ectopics: { type: Number, default: 0 },

    lastCitology: { type: Date, default: Date.now() },

    height: { type: Number, default: 0 }
  },
  {
    timestamps: true
  }
);

const Record = mongoose.model("Record", recordSchema);
module.exports = Record;
