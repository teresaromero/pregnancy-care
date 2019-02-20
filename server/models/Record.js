const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const recordSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User" },

    background: { type: String },

    patientBackground: { type: String },

    addictions: [
      {
        type: String,
        enum: ["alcohol", "tobacco", "drugs", "none"]
      }
    ],
    contraceptive: [
      {
        type: String,
        enum: [
          "None",
          "Implant",
          "IUD",
          "Vaginal Ring",
          "Patch",
          "Pill",
          "Condom",
          "Diaphragm",
          "Other"
        ]
      }
    ],
    contraceptiveOther: { type: String },

    STD: [
      {
        type: String,
        enum: [
          "None",
          "Chlamydia",
          "Gonorrhea",
          "Hepatitis B",
          "Herpes",
          "VIH",
          "HPV",
          "Scabies",
          "Syphilis",
          "Trichomoniasis",
          "Other"
        ]
      }
    ],
    STDother: { type: String },
    STDovercome: { type: String, enum: ["Yes", "No"] },

    HPVvaccine: { type: String, enum: ["Yes", "No"] },

    menstrualCycleDays: { type: Number },
    menstrualCycleFrequency: { type: Number },

    bloodGroup: { type: String, enum: ["A", "B", "AB", "0"] },
    rh: { type: String, enum: ["+", "-"] },

    pregnancies: { type: Number },
    labours: { type: Number },
    caesareanSections: { type: Number },
    abortions: { type: Number },
    ectopics: { type: Number },

    lastCitology: { type: Date },

    height: { type: Number },

    partnerBirthDate: { type: Date },

    LMP: { type: Date },
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
    },

    diet: {
      type: String,
      enum: ["Mediterranean", "Vegetarian", "Vegan", "Other"]
    },
    dietOther: { type: String },

    dietSuplements: [
      {
        type: String,
        enum: ["polivitaminics", "iron", "folic", "iodine", "none"]
      }
    ],

    sport: { type: String, default: "" },
    workRisk: [
      {
        type: String,
        enum: [
          "noise",
          "weight lifting",
          "stress",
          "toxics",
          "cold",
          "standing up",
          "none"
        ]
      }
    ],

    risk: { type: String, enum: ["Low", "High"] },
    riskReason: { type: String },

    weight: [
      {
        value: { type: Number },
        date: { type: Date, default: Date.now }
      }
    ],
    IMC: [
      {
        value: { type: Number },
        date: { type: Date, default: Date.now }
      }
    ],

    bloodPressure: [
      {
        Systolic: { type: Number },
        Diastolic: { type: Number },
        date: { type: Date, default: Date.now }
      }
    ],

    visits: [
      {
        medicalTest: [
          {
            type: String,
            enum: ["📺 Ultrasound", "💉 Blood Test"]
          }
        ],
        testResults: { type: String },
        notes: { type: String },
        notesOut: { type: String },
        date: { type: Date, dafault: Date.now }
      }
    ]
  },
  {
    timestamps: true
  }
);

const Record = mongoose.model("Record", recordSchema);
module.exports = Record;
