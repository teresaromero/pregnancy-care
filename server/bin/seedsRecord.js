const mongoose = require("mongoose");

const Record = require("../models/Record");

mongoose
  .connect(`mongodb://localhost/pregnancy-care`, { useNewUrlParser: true })
  .then(x => {
    console.log(
      `Connected to Mongo! Database name: "${x.connections[0].name}"`
    );
  })
  .catch(err => {
    console.error("Error connecting to mongo", err);
  });

let records = [
  {
    background:
      "Lorem ipsum dolor sit amet consectetur adipiscing elit habitasse, pellentesque vulputate etiam molestie cursus torquent maecenas nisl et, praesent ultricies ac rhoncus fames cubilia pulvinar.",
    patientBackground:
      "arius ad nibh tellus habitant fermentum ac nullam neque nostra lacus nisi justo, suscipit vestibulum sociis donec malesuada curabitur quis mus vitae feugiat.",
    allergies: "Primis senectus aptent himenaeos praesent venenatis.",

    addictions: ["alcohol", "tobacco", "drugs", "none"],
    contraceptive: ["Pill", "Condom", "Other"],
    contraceptiveOther: "Other Contraceptive",

    STD: ["None"],
    STDother: "",

    HPVvaccine: "Yes",

    menstrualCycleDays: 5,
    menstrualCycleFrequency: 28,

    bloodGroup: "A",
    rh: "+",

    pregnancies: 0,
    labours: 0,
    caesareanSections: 0,
    abortions: 0,
    ectopics: 0,

    height: 168,

    partnerBirthDate: "1986-07-13 00:00:00.000",

    LMP: "2019-01-10 00:00:00.000",
    EDC: "2019-10-17 00:00:00.000",
    HPT: "2019-01-20 00:00:00.000",
    pregnancyType: ["Spontaneus"],
    diet: ["Mediterranean"],

    dietOther: "",

    dietSuplements: ["polivitaminics"],

    sport: "none",
    workRisk: ["noise", "weight lifting", "stress"],

    risk: "Low",
    riskReason: "",

    weight: [
      {
        value: 70,
        date: "2019-01-16 00:00:00.000"
      },
      {
        value: 72,
        date: "2019-02-16 00:00:00.000"
      }
    ],
    IMC: [
      {
        value: 22.5,
        date: "2019-01-16 00:00:00.000"
      },
      {
        value: 23.5,
        date: "2019-02-16 00:00:00.000"
      }
    ],

    bloodPressure: [
      {
        Systolic: 86,
        Diastolic: 70,
        date: "2019-01-16 00:00:00.000"
      },
      {
        Systolic: 85,
        Diastolic: 65,
        date: "2019-02-16 00:00:00.000"
      }
    ],

    visits: [
      {
        medicalTest: ["📺 Ultrasound", "💉 Blood Test"],
        notes:
          "Allergy-triggered asthma hydrocortisone immune system insulin pump iv ketoacidosis polyphagia seizure stress aedoeology aerology aphnology archaeology astrophysics characterology clinology cryptozoology diabology ",
        notesOut:
          "Acne bruxism cerebral cortex exchange meal plan exercise-induced asthma gluteus maximus glycogen insulin pump sclera ultrasound accidence aerodynamics aeronautics",
        date: "2019-01-16 00:00:00.000"
      },
      {
        testResults:
          "Complete blood count (cbc) dehydration dermatologist veins and arteries adenology astrology astrometeorology dendrology dosiology edaphology ",
        notes:
          "Allergy-triggered asthma hydrocortisone immune system insulin pump iv ketoacidosis polyphagia seizure stress aedoeology aerology aphnology archaeology astrophysics characterology clinology cryptozoology diabology ",
        notesOut:
          "Acne bruxism cerebral cortex exchange meal plan exercise-induced asthma gluteus maximus glycogen insulin pump sclera ultrasound accidence aerodynamics aeronautics",
        date: "2019-02-16 00:00:00.000"
      }
    ]
  },
  {
    background:
      "Lorem ipsum dolor sit amet consectetur adipiscing elit habitasse, pellentesque vulputate etiam molestie cursus torquent maecenas nisl et, praesent ultricies ac rhoncus fames cubilia pulvinar.",
    patientBackground:
      "arius ad nibh tellus habitant fermentum ac nullam neque nostra lacus nisi justo, suscipit vestibulum sociis donec malesuada curabitur quis mus vitae feugiat.",
    allergies: "Primis senectus aptent himenaeos praesent venenatis.",

    addictions: ["tobacco"],
    contraceptive: ["Pill"],

    STD: ["None"],
    STDother: "",

    HPVvaccine: "No",

    menstrualCycleDays: 7,
    menstrualCycleFrequency: 31,

    bloodGroup: "B",
    rh: "-",

    pregnancies: 1,
    labours: 1,
    caesareanSections: 0,
    abortions: 0,
    ectopics: 0,

    height: 178,

    partnerBirthDate: "1981-06-01 00:00:00.000",

    LMP: "2018-10-01 00:00:00.000",
    EDC: "2019-07-08 00:00:00.000",
    HPT: "2018-10-20 00:00:00.000",
    pregnancyType: ["Artificial Insemination - Donor"],
    diet: ["Mediterranean"],

    

    dietSuplements: ["polivitaminics","iron", "folic"],

    sport: "Running",
    workRisk: ["stress"],

    risk: "High",
    riskReason: "Artificial Insemination",

    weight: [
      {
        value: 65,
        date: "2018-11-16 00:00:00.000"
      },
      {
        value: 72,
        date: "2018-12-16 00:00:00.000"
      }
    ],
    IMC: [
      {
        value: 22.5,
        date: "2018-11-16 00:00:00.000"
      },
      {
        value: 23.5,
        date: "2018-12-16 00:00:00.000"
      }
    ],

    bloodPressure: [
      {
        Systolic: 86,
        Diastolic: 70,
        date: "2018-11-16 00:00:00.000"
      },
      {
        Systolic: 85,
        Diastolic: 65,
        date: "2018-12-16 00:00:00.000"
      }
    ],

    visits: [
      {
        medicalTest: ["📺 Ultrasound", "💉 Blood Test"],
        notes:
          "Allergy-triggered asthma hydrocortisone immune system insulin pump iv ketoacidosis polyphagia seizure stress aedoeology aerology aphnology archaeology astrophysics characterology clinology cryptozoology diabology ",
        notesOut:
          "Acne bruxism cerebral cortex exchange meal plan exercise-induced asthma gluteus maximus glycogen insulin pump sclera ultrasound accidence aerodynamics aeronautics",
          date: "2018-11-16 00:00:00.000"
      },
      {
        testResults:
          "Complete blood count (cbc) dehydration dermatologist veins and arteries adenology astrology astrometeorology dendrology dosiology edaphology ",
        notes:
          "Allergy-triggered asthma hydrocortisone immune system insulin pump iv ketoacidosis polyphagia seizure stress aedoeology aerology aphnology archaeology astrophysics characterology clinology cryptozoology diabology ",
        notesOut:
          "Acne bruxism cerebral cortex exchange meal plan exercise-induced asthma gluteus maximus glycogen insulin pump sclera ultrasound accidence aerodynamics aeronautics",
          date: "2018-12-16 00:00:00.000"
      }
    ]
  },
  {
    background:
      "Lorem ipsum dolor sit amet consectetur adipiscing elit habitasse, pellentesque vulputate etiam molestie cursus torquent maecenas nisl et, praesent ultricies ac rhoncus fames cubilia pulvinar.",
    patientBackground:
      "arius ad nibh tellus habitant fermentum ac nullam neque nostra lacus nisi justo, suscipit vestibulum sociis donec malesuada curabitur quis mus vitae feugiat.",
    allergies: "Primis senectus aptent himenaeos praesent venenatis.",

    addictions: ["none"],
    contraceptive: ["Condom"],
    

    STD: ["None"],
    STDother: "",

    HPVvaccine: "Yes",

    menstrualCycleDays: 4,
    menstrualCycleFrequency: 34,

    bloodGroup: "AB",
    rh: "+",

    pregnancies: 2,
    labours: 1,
    caesareanSections: 1,
    abortions: 0,
    ectopics: 0,

    height: 172,

    partnerBirthDate: "1981-01-04 00:00:00.000",

    LMP: "2018-09-05 00:00:00.000",
    EDC: "2019-06-12 00:00:00.000",
    HPT: "2018-09-20 00:00:00.000",
    pregnancyType: ["Spontaneus"],
    diet: ["Mediterranean"],

    dietOther: "",

    dietSuplements: ["polivitaminics"],

    sport: "none",
    workRisk: ["stress"],

    risk: "Low",
    riskReason: "",

    weight: [
      {
        value: 70,
        date: "2018-09-26 00:00:00.000"
      },
      {
        value: 73,
        date: "2018-10-26 00:00:00.000"
      },
      {
        value: 75,
        date: "2018-11-26 00:00:00.000"
      },
      {
        value: 78,
        date: "2018-12-26 00:00:00.000"
      }
    ],
    IMC: [
      {
        value: 23.66,
        date: "2018-09-26 00:00:00.000"
      },
      {
        value: 24.68,
        date: "2018-10-26 00:00:00.000"
      },
      {
        value: 25.35,
        date: "2018-11-26 00:00:00.000"
      },
      {
        value: 26.37,
        date: "2018-12-26 00:00:00.000"
      }
    ],

    bloodPressure: [
      {
        Systolic: 86,
        Diastolic: 70,
        date: "2018-09-26 00:00:00.000"
      },
      {
        Systolic: 85,
        Diastolic: 65,
        date: "2018-10-26 00:00:00.000"
      },
      {
        Systolic: 86,
        Diastolic: 70,
        date: "2018-11-26 00:00:00.000"
      },
      {
        Systolic: 85,
        Diastolic: 65,
        date: "2018-12-26 00:00:00.000"
      }
    ],

    visits: [
      {
        medicalTest: ["📺 Ultrasound", "💉 Blood Test"],
        notes:
          "Allergy-triggered asthma hydrocortisone immune system insulin pump iv ketoacidosis polyphagia seizure stress aedoeology aerology aphnology archaeology astrophysics characterology clinology cryptozoology diabology ",
        notesOut:
          "Acne bruxism cerebral cortex exchange meal plan exercise-induced asthma gluteus maximus glycogen insulin pump sclera ultrasound accidence aerodynamics aeronautics",
          date: "2018-09-26 00:00:00.000"
      },
      {
        testResults:
          "Complete blood count (cbc) dehydration dermatologist veins and arteries adenology astrology astrometeorology dendrology dosiology edaphology ",
        notes:
          "Allergy-triggered asthma hydrocortisone immune system insulin pump iv ketoacidosis polyphagia seizure stress aedoeology aerology aphnology archaeology astrophysics characterology clinology cryptozoology diabology ",
        notesOut:
          "Acne bruxism cerebral cortex exchange meal plan exercise-induced asthma gluteus maximus glycogen insulin pump sclera ultrasound accidence aerodynamics aeronautics",
          date: "2018-10-26 00:00:00.000"
      },
      {
        medicalTest: ["📺 Ultrasound", "💉 Blood Test"],
        notes:
          "Allergy-triggered asthma hydrocortisone immune system insulin pump iv ketoacidosis polyphagia seizure stress aedoeology aerology aphnology archaeology astrophysics characterology clinology cryptozoology diabology ",
        notesOut:
          "Acne bruxism cerebral cortex exchange meal plan exercise-induced asthma gluteus maximus glycogen insulin pump sclera ultrasound accidence aerodynamics aeronautics",
          date: "2018-11-26 00:00:00.000"
      },
      {
        testResults:
          "Complete blood count (cbc) dehydration dermatologist veins and arteries adenology astrology astrometeorology dendrology dosiology edaphology ",
        notes:
          "Allergy-triggered asthma hydrocortisone immune system insulin pump iv ketoacidosis polyphagia seizure stress aedoeology aerology aphnology archaeology astrophysics characterology clinology cryptozoology diabology ",
        notesOut:
          "Acne bruxism cerebral cortex exchange meal plan exercise-induced asthma gluteus maximus glycogen insulin pump sclera ultrasound accidence aerodynamics aeronautics",
          date: "2018-12-26 00:00:00.000"
      }
    ]
  }
  
  
];

const createRecord = (idUser, idx) => {
  return Record.create({ ...records[idx], userId: idUser })
    .then(record => {
      return record;
    })
    .catch(e => console.log(e));
};

module.exports = createRecord;
