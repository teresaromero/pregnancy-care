const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const User = require("../models/User");
const Record = require("../models/Record");
const createRecord = require("./seedsRecord");

const bcryptSalt = 10;

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

let usersAdmin = [
  {
    name: "Teresa",
    surname: "Parser",
    email: "admin@admin.com",
    password: bcrypt.hashSync("1234", bcrypt.genSaltSync(bcryptSalt)),
    bornDate: "1988-01-16 00:00:00.000",
    isActive: true,
    role: "ADMIN",
    address: {
      street: "Lorem Ipsum",
      number: "5",
      city: "Madrid",
      state: "Comunidad de Madrid",
      zip: "28045"
    },
    phone: "99000999",
    idNum: "1234453Y"
  }
];

let usersCustomer = [
  {
    name: "Leanora",
    surname: "Hardstaff",
    email: "leonora@leonora.com",
    password: bcrypt.hashSync("1234", bcrypt.genSaltSync(bcryptSalt)),
    bornDate: "1987-06-18 00:00:00.000",
    isActive: true,
    role: "CUSTOMER",
    address: {
      street: "Lorem Ipsum",
      number: "6",
      city: "Madrid",
      state: "Comunidad de Madrid",
      zip: "28047"
    },
    phone: "99000999",
    idNum: "1234567Y"
  },
  {
    name: "Gottfried",
    surname: "Redmile",
    email: "gottfried@gottfried.com",
    password: bcrypt.hashSync("1234", bcrypt.genSaltSync(bcryptSalt)),
    bornDate: "1986-06-15 00:00:00.000",
    isActive: true,
    role: "CUSTOMER",
    address: {
      street: "Lorem Ipsum",
      number: "5",
      city: "Zaragoza",
      state: "Aragón",
      zip: "50020"
    },
    phone: "99000999",
    idNum: "1234568Y"
  },
  {
    name: "Saunders",
    surname: "Clemoes",
    email: "saunders@saunders.com",
    password: bcrypt.hashSync("1234", bcrypt.genSaltSync(bcryptSalt)),
    bornDate: "1970-06-10 00:00:00.000",
    isActive: true,
    role: "CUSTOMER",
    address: {
      street: "Lorem Ipsum",
      number: "5",
      city: "Zaragoza",
      state: "Aragón",
      zip: "50002"
    },
    phone: "99000999",
    idNum: "1234569Y"
  }
];

User.collection.drop();

User.create(usersAdmin).then(admins => {
  User.create(usersCustomer).then(usersCreated => {
    usersCreated.map((user, idx) => {
      createRecord(user._id, idx).then(record => {
        User.findOneAndUpdate(
          { _id: user._id },
          { recordId: record._id },
          { new: true }
        ).then(user => {
          console.log(user);
          mongoose.disconnect();
        });
      });
    });
  });
});
