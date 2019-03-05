const graphql = require("graphql");
const passport = require("passport");
const bcrypt = require("bcrypt");

const Appointment = require("../models/Appointment");
const User = require("../models/User");
const Record = require("../models/Record");
const moment = require("moment");

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLFloat,
  GraphQLSchema,
  GraphQLID,
  GraphQLBoolean,
  GraphQLList,
  GraphQLNonNull
} = graphql;

const { GraphQLDateTime } = require("graphql-iso-date");

const AppointmentType = new GraphQLObjectType({
  name: "Appointment",
  fields: () => ({
    id: { type: GraphQLID },
    title: { type: GraphQLString },
    start: { type: GraphQLDateTime },
    end: { type: GraphQLDateTime },
    description: { type: GraphQLString },
    user: {
      type: UserType,
      resolve(parent, args) {
        return User.findById(parent.userId);
      }
    }
  })
});

const TrackedDataType = new GraphQLObjectType({
  name: "TrackedData",
  fields: () => ({
    value: { type: GraphQLFloat },
    date: { type: GraphQLDateTime }
  })
});

const TrackedPressureType = new GraphQLObjectType({
  name: "TrackedPressure",
  fields: () => ({
    Systolic: { type: GraphQLInt },
    Diastolic: { type: GraphQLInt },
    date: { type: GraphQLDateTime }
  })
});

const VisitType = new GraphQLObjectType({
  name: "Visit",
  fields: () => ({
    medicalTest: { type: new GraphQLList(GraphQLString) },
    testResults: { type: GraphQLString },
    notes: { type: GraphQLString },
    notesOut: { type: GraphQLString },
    date: { type: GraphQLDateTime }
  })
});

const RecordType = new GraphQLObjectType({
  name: "Record",
  fields: () => ({
    user: {
      type: UserType,
      resolve(parent, args) {
        return User.findById(parent.userId);
      }
    },
    id: { type: GraphQLID },
    background: { type: GraphQLString },
    patientBackground: { type: GraphQLString },
    addictions: { type: new GraphQLList(GraphQLString) },
    contraceptive: { type: new GraphQLList(GraphQLString) },
    contraceptiveOther: { type: GraphQLString },
    STD: { type: new GraphQLList(GraphQLString) },
    STDother: { type: GraphQLString },
    STDovercome: { type: GraphQLString },
    HPVvaccine: { type: GraphQLString },
    menstrualCycleDays: { type: GraphQLInt },
    menstrualCycleFrequency: { type: GraphQLInt },
    bloodGroup: { type: GraphQLString },
    rh: { type: GraphQLString },
    pregnancies: { type: GraphQLInt },
    labours: { type: GraphQLInt },
    caesareanSections: { type: GraphQLInt },
    abortions: { type: GraphQLInt },
    ectopics: { type: GraphQLInt },
    lastCitology: { type: GraphQLString },
    height: { type: GraphQLInt },
    partnerBirthDate: { type: GraphQLString },
    LMP: { type: GraphQLDateTime },
    EDC: { type: GraphQLDateTime },
    HPT: { type: GraphQLDateTime },
    pregnancyType: { type: GraphQLString },
    diet: { type: GraphQLString },
    dietOther: { type: GraphQLString },
    dietSuplements: { type: new GraphQLList(GraphQLString) },
    sport: { type: GraphQLString },
    workRisk: { type: new GraphQLList(GraphQLString) },
    risk: { type: GraphQLString },
    riskReason: { type: GraphQLString },
    weight: { type: new GraphQLList(TrackedDataType) },
    IMC: { type: new GraphQLList(TrackedDataType) },
    bloodPressure: { type: new GraphQLList(TrackedPressureType) },
    visits: { type: new GraphQLList(VisitType) }
  })
});

const AddressType = new GraphQLObjectType({
  name: "Address",
  fields: () => ({
    street: { type: GraphQLString },
    number: { type: GraphQLString },
    city: { type: GraphQLString },
    state: { type: GraphQLString },
    zip: { type: GraphQLString }
  })
});

const UserType = new GraphQLObjectType({
  name: "User",
  fields: () => ({
    id: { type: GraphQLID },
    concat: { type: GraphQLString },
    name: { type: GraphQLString },
    surname: { type: GraphQLString },
    email: { type: GraphQLString },
    password: { type: GraphQLString },
    gender: { type: GraphQLString },
    bornDate: { type: GraphQLDateTime },
    confirmationCode: { type: GraphQLString },
    image: { type: GraphQLString },
    isActive: { type: GraphQLBoolean },
    role: { type: GraphQLString },
    address: {
      type: AddressType
    },
    phone: { type: GraphQLString },
    profession: { type: GraphQLString },
    insurance: { type: GraphQLString },
    insNumber: { type: GraphQLString },
    GDPR: { type: GraphQLBoolean },
    GDPRdoc: { type: GraphQLString },
    idNum: { type: GraphQLString },
    record: {
      type: RecordType,
      resolve(parent, args) {
        return Record.findOne({ userId: parent.id });
      }
    },
    appointments: {
      type: new GraphQLList(AppointmentType),
      resolve(parent, args) {
        return Appointment.find({ userId: parent.id });
      }
    }
  })
});

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    currentUser: {
      type: UserType,
      resolve(parent, args, req) {
        if (req.isAuthenticated()) {
          return req.user;
        }
        throw new Error("Not logged");
      }
    },
    logout: {
      type: UserType,
      resolve(parent, args, req) {
        if (req.isAuthenticated()) {
          return req.logout();
        }
        throw new Error("There is not current session");
      }
    },

    appointment: {
      type: AppointmentType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args, req) {
        if (req.isAuthenticated()) {
          return Appointment.findById(args.id);
        }
        throw new Error("You need to log in!");
      }
    },
    appointments: {
      type: new GraphQLList(AppointmentType),
      resolve(parent, args, req) {
        if (req.isAuthenticated()) {
          return Appointment.find();
        }
        throw new Error("You need to log in!");
      }
    },

    todayAppointments: {
      type: new GraphQLList(AppointmentType),
      resolve(parent, args, req) {
        let start = moment(Date.now()).startOf("day")._d;
        let end = moment(Date.now()).endOf("day")._d;

        if (req.isAuthenticated()) {
          return Appointment.find({ start: { $gte: start, $lt: end } });
        }
        throw new Error("You need to log in!");
      }
    },

    patient: {
      type: UserType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args, req) {
        if (req.isAuthenticated()) {
          return User.findById(args.id);
        }
        throw new Error("You need to log in!");
      }
    },
    patients: {
      type: new GraphQLList(UserType),
      args: { filter: { type: GraphQLString } },
      resolve(parent, args, req) {
        let regex = new RegExp(args.filter, "i");
        if (req.isAuthenticated()) {
          return User.find({ role: "CUSTOMER", concat: regex }).sort({
            name: 1
          });
        }
        throw new Error("You need to log in!");
      }
    },

    record: {
      type: RecordType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args, req) {
        if (req.isAuthenticated()) {
          return Record.findById(args.id);
        }
        throw new Error("You need to log in!");
      }
    },

    records: {
      type: new GraphQLList(RecordType),
      resolve(parent, args, req) {
        if (req.isAuthenticated()) {
          return Record.find();
        }
        throw new Error("You need to log in!");
      }
    }
  }
});

const Mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    login: {
      type: UserType,
      args: {
        email: { type: GraphQLString },
        password: { type: GraphQLString }
      },
      resolve(parent, args, req) {
        let { email, password } = args;

        if (req.isAuthenticated()) {
          throw new Error("There is already a session!");
        }

        return User.findOne({ email: email, role: "CUSTOMER" }).then(
          foundUser => {
            if (!foundUser) {
              throw new Error("Email not found");
            }

            if (!bcrypt.compareSync(password, foundUser.password)) {
              throw new Error("Password is incorrect");
            }

            return new Promise((resolve, reject) => {
              req.login(foundUser, e => (e ? reject(e) : resolve(foundUser)));
            }).then(user => {
              return user;
            });
          }
        );
      }
    },

    addAppointment: {
      type: AppointmentType,
      args: {
        title: { type: GraphQLString },
        start: { type: GraphQLDateTime },
        end: { type: GraphQLDateTime },
        description: { type: GraphQLString },
        userId: { type: GraphQLID }
      },
      resolve(parent, args, req) {
        if (req.isAuthenticated()) {
          let appointment = new Appointment({
            title: args.title,
            start: args.start,
            end: args.end,
            description: args.description,
            userId: args.userId
          });
          return appointment.save();
        }
        throw new Error("You need to log in!");
      }
    },
    updateAppointment: {
      type: AppointmentType,
      args: {
        id: { type: GraphQLNonNull(GraphQLID) },
        title: { type: GraphQLString },
        start: { type: GraphQLDateTime },
        end: { type: GraphQLDateTime },
        description: { type: GraphQLString },
        userId: { type: GraphQLID }
      },
      resolve(parent, args, req) {
        if (req.isAuthenticated()) {
          let { id, title, start, end, description, userId } = args;
          return Appointment.findByIdAndUpdate(
            id,
            {
              title: title,
              start: start,
              end: end,
              description: description,
              userId: userId
            },
            { new: true }
          );
        }
        throw new Error("You need to log in!");
      }
    },

    updateAppointmentDateTime: {
      type: AppointmentType,
      args: {
        id: { type: GraphQLNonNull(GraphQLID) },
        start: { type: GraphQLDateTime },
        end: { type: GraphQLDateTime }
      },
      resolve(parent, args, req) {
        if (req.isAuthenticated()) {
          let { id, start, end } = args;

          return Appointment.findByIdAndUpdate(
            id,
            {
              start: start,
              end: end
            },
            { new: true }
          );
        }
        throw new Error("You need to log in!");
      }
    },
    deleteAppointment: {
      type: AppointmentType,
      args: {
        id: { type: GraphQLNonNull(GraphQLID) }
      },
      resolve(parent, args, req) {
        if (req.isAuthenticated()) {
          return Appointment.findByIdAndDelete(args.id);
        }
        throw new Error("You need to log in!");
      }
    }
  }
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation
});
