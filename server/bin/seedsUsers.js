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
    name: "Unicorn",
    surname: "Administrator",
    email: "admin@pregnancy-care.com",
    password: bcrypt.hashSync("1234", bcrypt.genSaltSync(bcryptSalt)),
    bornDate: "1988-01-16 00:00:00.000",
    isActive: true,
    role: "ADMIN",
    address: {
      street: "Lorem Ipsum",
      number: "5",
      city: "consectetur",
      state: "adipiscing",
      zip: "34007"
    },
    phone: "99000999",
    idNum: "1234453Y"
  }
];

let usersCustomer = [
  {
    name: "Leanora",
    surname: "Hardstaff",
    email: "lhardstaff0@blogs.com",
    password: bcrypt.hashSync("1234", bcrypt.genSaltSync(bcryptSalt)),
    bornDate: "1988-01-16 00:00:00.000",
    isActive: true,
    role: "CUSTOMER",
    address: {
      street: "Lorem Ipsum",
      number: "5",
      city: "consectetur",
      state: "adipiscing",
      zip: "34007"
    },
    phone: "99000999",
    idNum: "1234567Y"
  },
  {
    name: "Gottfried",
    surname: "Redmile",
    email: "gredmile1@mayoclinic.com",
    password: bcrypt.hashSync("1234", bcrypt.genSaltSync(bcryptSalt)),
    bornDate: "1986-06-16 00:00:00.000",
    isActive: true,
    role: "CUSTOMER",
    address: {
      street: "Lorem Ipsum",
      number: "5",
      city: "consectetur",
      state: "adipiscing",
      zip: "34007"
    },
    phone: "99000999",
    idNum: "1234568Y"
  },
  {
    name: "Saunders",
    surname: "Clemoes",
    email: "sclemoes3@indiegogo.com",
    password: bcrypt.hashSync("1234", bcrypt.genSaltSync(bcryptSalt)),
    bornDate: "1970-06-10 00:00:00.000",
    isActive: true,
    role: "CUSTOMER",
    address: {
      street: "Lorem Ipsum",
      number: "5",
      city: "consectetur",
      state: "adipiscing",
      zip: "34007"
    },
    phone: "99000999",
    idNum: "1234569Y"
  },
  {
    name: "Shayne",
    surname: "Moorcraft",
    email: "smoorcraft4@yellowpages.com",
    password: bcrypt.hashSync("1234", bcrypt.genSaltSync(bcryptSalt)),
    bornDate: "1975-06-19 00:00:00.000",
    isActive: true,
    role: "CUSTOMER",
    address: {
      street: "Lorem Ipsum",
      number: "5",
      city: "consectetur",
      state: "adipiscing",
      zip: "34007"
    },
    phone: "99000999",
    idNum: "1234570Y"
  },
  {
    name: "Jock",
    surname: "Gannaway",
    email: "jgannaway5@microsoft.com",
    password: bcrypt.hashSync("1234", bcrypt.genSaltSync(bcryptSalt)),
    bornDate: "1987-09-25 00:00:00.000",
    isActive: true,
    role: "CUSTOMER",
    address: {
      street: "Lorem Ipsum",
      number: "5",
      city: "consectetur",
      state: "adipiscing",
      zip: "34007"
    },
    phone: "99000999",
    idNum: "1234571Y"
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
