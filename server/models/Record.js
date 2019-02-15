const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const recordSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User" },

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

    height: { type: Number, default: 0 },

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
      enum: ["Mediterranean", "Vegetarian", "Vegan", "Other"],
      default: "Mediterranean"
    },
    dietOther: { type: String, default: "" },

    dietSuplements: [
      {
        type: String,
        enum: ["polivitaminics", "iron", "folic", "iodine", "none"],
        default: "none"
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
        ],
        default: "none"
      }
    ],

    risk: { type: String, enum: ["Low", "High"], default: "Low" },
    riskReason: { type: String, default: "" },

    weight: [
      {
        value: { type: Number, default: 0 },
        date: { type: Date, default: Date.now }
      }
    ],
    IMC: [
      {
        value: { type: Number, default: 0 },
        date: { type: Date, default: Date.now }
      }
    ],

    bloodPressure: [
      {
        Systolic: { type: Number, default: 0 },
        Diastolic: { type: Number, default: 0 },
        date: { type: Date, default: Date.now }
      }
    ],

    visits: [
      {
        medicalTest: [
          {
            type: String,
            enum: [
              "Ultrasound 1Term",
              "Ultrasound 2Term",
              "Ultrasound 3Term",
              "Blood Test 1Term",
              "Blood Test 2Term",
              "Blood Test 3Term"
            ]
          }
        ],
        testResults: { type: String, default: "" },
        notes: { type: String, default: "" },
        notesOut: { type: String, default: "" },
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
