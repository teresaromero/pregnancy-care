const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const recordSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User" },

    preconceptional: {
      partnerBirthDate: { type: Date },

      backgroundAbortions: { type: Number, default: 0 },
      backgroundSterility: { type: String },
      backgroundAssistedReproduction: { type: String },
      backgroundDeseases: { type: String },
      backgroundMalformations: { type: String },
      backgroundPsychiatricIll: { type: String },
      backgroundAddictions: { type: String },

      chronicalIll: { type: String },
      illness: { type: String },
      surgeries: { type: String },
      alergies: { type: String },
      addictions: [{ type: String, enum: ["alcohol", "tobacco", "drugs"] }],

      pregnancies: { type: Number, default: 0 },
      abortions: { type: Number, default: 0 },
      ectopics: { type: Number, default: 0 },
      labours: { type: Number, default: 0 },
      caesareanSections: { type: Number, default: 0 },

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
      STDovercome: { type: Boolean, default: false },
      sexHabits: { type: String, default: "" },

      menstrualCycleDays: { type: Number, default: "" },
      menstrualCycleFrequency: { type: Number, default: "" },

      HPVvaccine: { type: Boolean, default: false },
      bloodGroup: { type: String, enum: ["A", "B", "AB", "0"] },
      rh: { type: String, enum: ["+", "-"] },

      rubella: { type: Boolean, default: false },
      LUES: { type: Boolean, default: false },
      HBsAg: { type: Boolean, default: false },
      VHC: { type: Boolean, default: false },
      VIH: { type: Boolean, default: false },
      toxoplasmosis: { type: Boolean, default: false },
      coombs: { type: Boolean, default: false },
      citology: { type: Boolean, default: false }
    },

    height: { type: Number, default: 0 },
    TSH: { type: Number, default: 0 },
    activity: {
      sport: { type: Boolean, default: false },
      profession: { type: String, default: "" },
      workRisk: [
        {
          type: String,
          enum: [
            "noise",
            "weight lifting",
            "stress",
            "toxics",
            "cold",
            "standing up"
          ]
        }
      ]
    },

    diet: {
      type: String,
      enum: ["Mediterranean", "Vegetarian", "Vegan", "Other"]
    },
    dietOther: { type: String, default: "" },

    dietSuplements: [
      {
        polivitaminics: { type: Boolean, default: false },
        iron: { type: Boolean, default: false },
        folic: { type: Boolean, default: false },
        iodine: { type: Boolean, default: false }
      }
    ],

    physics: [
      {
        weight: { type: Number },
        ICM: { type: Number },
        bloodPressureSystolic: { type: Number },
        bloodPressureDiastolic: { type: Number }
      }
    ],

    tests: [
      {
        redBloodCell: { type: Number, default: 0 },
        haemoglobin: { type: Number, default: 0 },
        hematocrit: { type: Number, default: 0 },
        platelet: { type: Number, default: 0 },
        glucose: { type: Number, default: 0 },
        urea: { type: Number, default: 0 },
        uricAcid: { type: Number, default: 0 },
        bilirubin: { type: Number, default: 0 },
        AFT: { type: Number, default: 0 },
        ALT: { type: Number, default: 0 }
      }
    ],

    pregnancyRisk: { type: String, enum: ["Low", "High"] },
    pregnancyRiskReason: { type: String, enum: ["", "Other"] },
    pregnancyRiskReasonOther: { type: String },

    //actual pregnancy information LMP - last menstruation ; EDC - estimated labour day ; HPT - home pregnancy test
    pregnancy: {
      LMP: { type: Date },
      LMPrev: { type: Date },
      EDC: { type: Date },
      HPT: { type: Date },
      pregnancyType: {
        type: String,
        enum: [
          "Spontaneus",
          "In Vitro - Derived",
          "In Vitro - Generated",
          "Artificial Insemination - Donor",
          "Artificial Insemination - Partner"
        ]
      }
    },

    appointments: [{ type: Schema.Types.ObjectId, ref: "Appointment" }]
  },
  {
    timestamps: true
  }
);

const Record = mongoose.model("Record", recordSchema);
module.exports = Record;
