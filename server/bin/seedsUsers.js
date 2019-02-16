
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

let users = [
  {
    name: "Unicorn",
    surname: "Administrator",
    email: "admin@pregnancy-care.com",
    password: bcrypt.hashSync("1234", bcrypt.genSaltSync(bcryptSalt)),
    role: "ADMIN",
    bornDate: "1988-01-16 00:00:00.000",
    isActive: true,
    address: {
      street: "Lorem Ipsum",
      number: "5",
      city: "consectetur",
      state: "adipiscing",
      zip: "34007"
    },
    phone: "99000999",
    idNum: "1234453Y"
  },
  {
    name: "Leanora",
    surname: "Hardstaff",
    email: "lhardstaff0@blogs.com",
    password: bcrypt.hashSync("1234", bcrypt.genSaltSync(bcryptSalt)),
    role: "ADMIN",
    bornDate: "1988-01-16 00:00:00.000",
    isActive: true,
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
    role: "CUSTOMER",
    bornDate: "1986-06-16 00:00:00.000",
    isActive: true,
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
    role: "CUSTOMER",
    bornDate: "1970-06-10 00:00:00.000",
    isActive: true,
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
    role: "CUSTOMER",
    bornDate: "1975-06-19 00:00:00.000",
    isActive: true,
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
    role: "CUSTOMER",
    bornDate: "1987-09-25 00:00:00.000",
    isActive: true,
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
Record.collection.drop();

User.create(users)
  .then(usersCreated => {
    console.log(`${usersCreated.length} users created with the following id:`);
    console.log(usersCreated.map(u => u._id));
    usersCreated.map((user, idx) => {
      if (user.role == "CUSTOMER") {
        createRecord(user._id, idx)
          .then(record => {
            mongoose.disconnect();
            console.log("record created");
            console.log(record);
          })
          .catch(e => console.log(e));
      }
    });
  })
  


