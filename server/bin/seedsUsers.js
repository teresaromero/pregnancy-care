const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const User = require("../models/User");
const Record = require("../models/Record");
const users = require("./users.json");
const records = require("./record.json");

const bcryptSalt = 10;

let usersCustomer = users.map(user => {
  let password = bcrypt.hashSync("1234", bcrypt.genSaltSync(bcryptSalt));
  let concat = user.name + user.surname + user.idNum + user.phone + user.email;
  return { ...user, password, concat };
});

let recordsFinal = records.map(record => {
  let IMC = record.weight.map(w => {
    let calc = w.value / ((record.height / 100) * (record.height / 100));
    return { value: calc, date: w.date };
  });
  return { ...record, IMC };
});

mongoose
  .connect(`${process.env.DBURL}`, { useNewUrlParser: true })
  .then(x => {
    console.log(
      `Connected to Mongo! Database name: "${x.connections[0].name}"`
    );

    for (let i = 0; i < usersCustomer.length; i++) {
      new Record(recordsFinal[i]).save().then(record => {
        console.log("new record" + record._id);
        let recordId = record._id;
        let newUser = { ...usersCustomer[i], recordId };
        new User(newUser).save().then(user => {
          console.log("new user" + user._id);
          Record.findByIdAndUpdate(
            recordId,
            { userId: user._id },
            { new: true }
          ).then(record => console.log("record" + record.userId));
        });
      });
    }
    console.log("finished");
  })
  .catch(err => console.log("connection error" + err));
