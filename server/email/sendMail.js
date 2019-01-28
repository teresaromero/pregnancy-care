const transporter = require("./transport");
const fs = require("fs");
const path = require("path");
const hbs = require("handlebars");

const templateFile = path.join(__dirname, "./templates/activeAccount.html");
const htmlstr = fs.readFileSync(templateFile).toString();
var template = hbs.compile(htmlstr);

const activateUserMail = (to,name,email,confirmationCode) => {
  return transporter
    .sendMail({
      from: process.env.FROM_EMAIL,
      to,
      subject:"Activate your account",
      html: template({
        name:name,
        email:email,
        confirmationCode:confirmationCode
      })
    })
    .then(info => console.log(info)).catch(e=>console.log(e))
};

module.exports = activateUserMail;