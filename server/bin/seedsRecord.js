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
    backgroundDiseases:
      "Dandruff disinfectants islet cells lacrimal glands neurologist white blood cells adenology astrology bionomics dermatoglyphics heortology horology hygiology irenology kinesics optometry planetology pseudology trophology virology. Adhd antibiotics glucose lymph node perspiration barology garbology halieutics hippology iamatology laryngology planetology stylometry. ",
    backgroundPsychiatricIll:
      "Ct scan or cat scan epiglottis er exchange meal plan neuropathy tragus caliology carpology cometology cryptology eremology ergology gemmology gigantology hedonics idiopsychology meteoritics morphology neurypnology neutrosophy pyrgology reflexology stomatology symbology telmatology zoogeology. ",
    backgroundAddictions:
      "Aerobic activity bruise contagious diagnosis gastroenteritis genetics intensive care unit iris lunula red blood cells retinopathy symptoms aerodynamics anaesthesiology anaglyptics chalcotriptics emmenology hymnography iamatology mastology myology nematology orthography pharyngology pyretology textology vinology zoopathology.",
    backgroundReproductive:
      "Cardiologist nebulizer violence bibliotics cetology coleopterology diagraphics ethology gastronomy gerocomy gyrostatics immunopathology meteorology obstetrics posology psychognosy suicidology telmatology trichology vulcanology. Airway obstruction chemotherapy eustachian tube myopia nicotine nits pimple pupil tobacco urinalysis astacology campanology catacoustics cosmology dysgenics geography glyptography heraldry lexigraphy limnology posology splanchnology thremmatology tocology. ",

    diseases:
      "Dandruff disinfectants islet cells lacrimal glands neurologist white blood cells adenology astrology bionomics dermatoglyphics heortology horology hygiology irenology kinesics optometry planetology pseudology trophology virology. Adhd antibiotics glucose lymph node perspiration barology garbology halieutics hippology iamatology laryngology planetology stylometry. ",
    allergies: "Aerobic activity bruise contagious.",

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
        date: "2019-02-16 00:00:00.000"
      }
    ],
    IMC: [
      {
        value: 22.5,
        date: "2019-02-16 00:00:00.000"
      }
    ],

    bloodPressure: [
      {
        Systolic: 13,
        Diastolic: 7,
        date: "2019-02-16 00:00:00.000"
      }
    ],

    visits: [
      {
        medicalTest: ["Ultrasound 1Term", "Blood Test 1Term"],
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
    backgroundDiseases:
      "Dandruff disinfectants islet cells lacrimal glands neurologist white blood cells adenology astrology bionomics dermatoglyphics heortology horology hygiology irenology kinesics optometry planetology pseudology trophology virology. Adhd antibiotics glucose lymph node perspiration barology garbology halieutics hippology iamatology laryngology planetology stylometry. ",
    backgroundPsychiatricIll:
      "Ct scan or cat scan epiglottis er exchange meal plan neuropathy tragus caliology carpology cometology cryptology eremology ergology gemmology gigantology hedonics idiopsychology meteoritics morphology neurypnology neutrosophy pyrgology reflexology stomatology symbology telmatology zoogeology. ",
    backgroundAddictions:
      "Aerobic activity bruise contagious diagnosis gastroenteritis genetics intensive care unit iris lunula red blood cells retinopathy symptoms aerodynamics anaesthesiology anaglyptics chalcotriptics emmenology hymnography iamatology mastology myology nematology orthography pharyngology pyretology textology vinology zoopathology.",
    backgroundReproductive:
      "Cardiologist nebulizer violence bibliotics cetology coleopterology diagraphics ethology gastronomy gerocomy gyrostatics immunopathology meteorology obstetrics posology psychognosy suicidology telmatology trichology vulcanology. Airway obstruction chemotherapy eustachian tube myopia nicotine nits pimple pupil tobacco urinalysis astacology campanology catacoustics cosmology dysgenics geography glyptography heraldry lexigraphy limnology posology splanchnology thremmatology tocology. ",

    diseases:
      "Dandruff disinfectants islet cells lacrimal glands neurologist white blood cells adenology astrology bionomics dermatoglyphics heortology horology hygiology irenology kinesics optometry planetology pseudology trophology virology. Adhd antibiotics glucose lymph node perspiration barology garbology halieutics hippology iamatology laryngology planetology stylometry. ",
    allergies: "Aerobic activity bruise contagious.",

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
        date: "2019-02-16 00:00:00.000"
      }
    ],
    IMC: [
      {
        value: 22.5,
        date: "2019-02-16 00:00:00.000"
      }
    ],

    bloodPressure: [
      {
        Systolic: 13,
        Diastolic: 7,
        date: "2019-02-16 00:00:00.000"
      }
    ],

    visits: [
      {
        medicalTest: ["Ultrasound 1Term", "Blood Test 1Term"],
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
    backgroundDiseases:
      "Dandruff disinfectants islet cells lacrimal glands neurologist white blood cells adenology astrology bionomics dermatoglyphics heortology horology hygiology irenology kinesics optometry planetology pseudology trophology virology. Adhd antibiotics glucose lymph node perspiration barology garbology halieutics hippology iamatology laryngology planetology stylometry. ",
    backgroundPsychiatricIll:
      "Ct scan or cat scan epiglottis er exchange meal plan neuropathy tragus caliology carpology cometology cryptology eremology ergology gemmology gigantology hedonics idiopsychology meteoritics morphology neurypnology neutrosophy pyrgology reflexology stomatology symbology telmatology zoogeology. ",
    backgroundAddictions:
      "Aerobic activity bruise contagious diagnosis gastroenteritis genetics intensive care unit iris lunula red blood cells retinopathy symptoms aerodynamics anaesthesiology anaglyptics chalcotriptics emmenology hymnography iamatology mastology myology nematology orthography pharyngology pyretology textology vinology zoopathology.",
    backgroundReproductive:
      "Cardiologist nebulizer violence bibliotics cetology coleopterology diagraphics ethology gastronomy gerocomy gyrostatics immunopathology meteorology obstetrics posology psychognosy suicidology telmatology trichology vulcanology. Airway obstruction chemotherapy eustachian tube myopia nicotine nits pimple pupil tobacco urinalysis astacology campanology catacoustics cosmology dysgenics geography glyptography heraldry lexigraphy limnology posology splanchnology thremmatology tocology. ",

    diseases:
      "Dandruff disinfectants islet cells lacrimal glands neurologist white blood cells adenology astrology bionomics dermatoglyphics heortology horology hygiology irenology kinesics optometry planetology pseudology trophology virology. Adhd antibiotics glucose lymph node perspiration barology garbology halieutics hippology iamatology laryngology planetology stylometry. ",
    allergies: "Aerobic activity bruise contagious.",

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
        date: "2019-02-16 00:00:00.000"
      }
    ],
    IMC: [
      {
        value: 22.5,
        date: "2019-02-16 00:00:00.000"
      }
    ],

    bloodPressure: [
      {
        Systolic: 13,
        Diastolic: 7,
        date: "2019-02-16 00:00:00.000"
      }
    ],

    visits: [
      {
        medicalTest: ["Ultrasound 1Term", "Blood Test 1Term"],
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
    backgroundDiseases:
      "Dandruff disinfectants islet cells lacrimal glands neurologist white blood cells adenology astrology bionomics dermatoglyphics heortology horology hygiology irenology kinesics optometry planetology pseudology trophology virology. Adhd antibiotics glucose lymph node perspiration barology garbology halieutics hippology iamatology laryngology planetology stylometry. ",
    backgroundPsychiatricIll:
      "Ct scan or cat scan epiglottis er exchange meal plan neuropathy tragus caliology carpology cometology cryptology eremology ergology gemmology gigantology hedonics idiopsychology meteoritics morphology neurypnology neutrosophy pyrgology reflexology stomatology symbology telmatology zoogeology. ",
    backgroundAddictions:
      "Aerobic activity bruise contagious diagnosis gastroenteritis genetics intensive care unit iris lunula red blood cells retinopathy symptoms aerodynamics anaesthesiology anaglyptics chalcotriptics emmenology hymnography iamatology mastology myology nematology orthography pharyngology pyretology textology vinology zoopathology.",
    backgroundReproductive:
      "Cardiologist nebulizer violence bibliotics cetology coleopterology diagraphics ethology gastronomy gerocomy gyrostatics immunopathology meteorology obstetrics posology psychognosy suicidology telmatology trichology vulcanology. Airway obstruction chemotherapy eustachian tube myopia nicotine nits pimple pupil tobacco urinalysis astacology campanology catacoustics cosmology dysgenics geography glyptography heraldry lexigraphy limnology posology splanchnology thremmatology tocology. ",

    diseases:
      "Dandruff disinfectants islet cells lacrimal glands neurologist white blood cells adenology astrology bionomics dermatoglyphics heortology horology hygiology irenology kinesics optometry planetology pseudology trophology virology. Adhd antibiotics glucose lymph node perspiration barology garbology halieutics hippology iamatology laryngology planetology stylometry. ",
    allergies: "Aerobic activity bruise contagious.",

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
        date: "2019-02-16 00:00:00.000"
      }
    ],
    IMC: [
      {
        value: 22.5,
        date: "2019-02-16 00:00:00.000"
      }
    ],

    bloodPressure: [
      {
        Systolic: 13,
        Diastolic: 7,
        date: "2019-02-16 00:00:00.000"
      }
    ],

    visits: [
      {
        medicalTest: ["Ultrasound 1Term", "Blood Test 1Term"],
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
    backgroundDiseases:
      "Dandruff disinfectants islet cells lacrimal glands neurologist white blood cells adenology astrology bionomics dermatoglyphics heortology horology hygiology irenology kinesics optometry planetology pseudology trophology virology. Adhd antibiotics glucose lymph node perspiration barology garbology halieutics hippology iamatology laryngology planetology stylometry. ",
    backgroundPsychiatricIll:
      "Ct scan or cat scan epiglottis er exchange meal plan neuropathy tragus caliology carpology cometology cryptology eremology ergology gemmology gigantology hedonics idiopsychology meteoritics morphology neurypnology neutrosophy pyrgology reflexology stomatology symbology telmatology zoogeology. ",
    backgroundAddictions:
      "Aerobic activity bruise contagious diagnosis gastroenteritis genetics intensive care unit iris lunula red blood cells retinopathy symptoms aerodynamics anaesthesiology anaglyptics chalcotriptics emmenology hymnography iamatology mastology myology nematology orthography pharyngology pyretology textology vinology zoopathology.",
    backgroundReproductive:
      "Cardiologist nebulizer violence bibliotics cetology coleopterology diagraphics ethology gastronomy gerocomy gyrostatics immunopathology meteorology obstetrics posology psychognosy suicidology telmatology trichology vulcanology. Airway obstruction chemotherapy eustachian tube myopia nicotine nits pimple pupil tobacco urinalysis astacology campanology catacoustics cosmology dysgenics geography glyptography heraldry lexigraphy limnology posology splanchnology thremmatology tocology. ",

    diseases:
      "Dandruff disinfectants islet cells lacrimal glands neurologist white blood cells adenology astrology bionomics dermatoglyphics heortology horology hygiology irenology kinesics optometry planetology pseudology trophology virology. Adhd antibiotics glucose lymph node perspiration barology garbology halieutics hippology iamatology laryngology planetology stylometry. ",
    allergies: "Aerobic activity bruise contagious.",

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
        date: "2019-02-16 00:00:00.000"
      }
    ],
    IMC: [
      {
        value: 22.5,
        date: "2019-02-16 00:00:00.000"
      }
    ],

    bloodPressure: [
      {
        Systolic: 13,
        Diastolic: 7,
        date: "2019-02-16 00:00:00.000"
      }
    ],

    visits: [
      {
        medicalTest: ["Ultrasound 1Term", "Blood Test 1Term"],
        testResults:
          "Complete blood count (cbc) dehydration dermatologist veins and arteries adenology astrology astrometeorology dendrology dosiology edaphology ",
        notes:
          "Allergy-triggered asthma hydrocortisone immune system insulin pump iv ketoacidosis polyphagia seizure stress aedoeology aerology aphnology archaeology astrophysics characterology clinology cryptozoology diabology ",
        notesOut:
          "Acne bruxism cerebral cortex exchange meal plan exercise-induced asthma gluteus maximus glycogen insulin pump sclera ultrasound accidence aerodynamics aeronautics",
        date: "2019-02-16 00:00:00.000"
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
