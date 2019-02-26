const graphql = require("graphql");

const mongoose = require("mongoose");
const Appointment = require("../models/Appointment");
const User = require("../models/User");
const Record = require("../models/Record");

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
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
    value: { type: GraphQLInt },
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
    appointment: {
      type: AppointmentType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return Appointment.findById(args.id);
      }
    },
    appointments: {
      type: new GraphQLList(AppointmentType),
      resolve(parent, args) {
        return Appointment.find();
      }
    },

    patient: {
      type: UserType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return User.findById(args.id);
      }
    },
    patients: {
      type: new GraphQLList(UserType),
      args: { filter: { type: GraphQLString } },
      resolve(parent, args) {
        let regex = new RegExp(args.filter, "i");
        return User.find({ role: "CUSTOMER", concat: regex }).sort({
          name: 1
        });
      }
    },

    record: {
      type: RecordType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return Record.findById(args.id);
      }
    },

    records: {
      type: new GraphQLList(RecordType),
      resolve(parent, args) {
        return Record.find();
      }
    }
  }
});

const Mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    addAppointment: {
      type: AppointmentType,
      args: {
        title: { type: GraphQLString },
        start: { type: GraphQLDateTime },
        end: { type: GraphQLDateTime },
        description: { type: GraphQLString },
        userId: { type: GraphQLID }
      },
      resolve(parent, args) {
        let appointment = new Appointment({
          title: args.title,
          start: args.start,
          end: args.end,
          description: args.description,
          userId: args.user
        });
        return appointment.save();
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
      resolve(parent, args) {
        let { id, title, start, end, description, userId } = args;
        console.log(args);
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
    },

    updateAppointmentDateTime: {
      type: AppointmentType,
      args: {
        id: { type: GraphQLNonNull(GraphQLID) },
        start: { type: GraphQLDateTime },
        end: { type: GraphQLDateTime }
      },
      resolve(parent, args) {
        let { id, start, end } = args;
        console.log(args);
        return Appointment.findByIdAndUpdate(
          id,
          {
            start: start,
            end: end
          },
          { new: true }
        );
      }
    },
    deleteAppointment: {
      type: AppointmentType,
      args: {
        id: { type: GraphQLNonNull(GraphQLID) }
      },
      resolve(parent, args) {
        return Appointment.findByIdAndDelete(args.id);
      }
    }
  }
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation
});
