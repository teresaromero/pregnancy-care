const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const User = require("../models/User");
const Record = require("../models/Record");
require("dotenv").config();
const users = require("./users.json");
const records = require("./record.json");

const bcryptSalt = 10;

let usersAdmin = users
  .filter(user => user.role === "ADMIN")
  .map(user => {
    let password = bcrypt.hashSync("1234", bcrypt.genSaltSync(bcryptSalt));
    let concat =
      user.name + user.surname + user.idNum + user.phone + user.email;
    return { ...user, password, concat };
  });

let usersCustomer = users
  .filter(user => user.role === "CUSTOMER")
  .map(user => {
    let password = bcrypt.hashSync("1234", bcrypt.genSaltSync(bcryptSalt));
    return { ...user, password };
  })
  .map((user, idx) => {
    let recordId = records[idx];

    return { ...user, recordId };
  });

mongoose.connect(`${process.env.DBURL}`, { useNewUrlParser: true }).then(x => {
  console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`);

  for (let i = 0; i < usersAdmin.length; i++) {
    new User(usersAdmin[i]).save().then(user => console.log(user._id));
  }

  for (let i = 0; i < usersCustomer.length; i++) {
    new Record(records[i]).save().then(record => {
      let recordId = record._id;
      let newUser = { ...usersCustomer[i], recordId };
      new User(newUser).save().then(user => console.log(user._id));
    });
  }

  mongoose.disconnect();
});
