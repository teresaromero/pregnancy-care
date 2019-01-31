const nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "96734cd329ab1e",
    pass: "8f67189aae1f04"
  }
});

module.exports = transporter;