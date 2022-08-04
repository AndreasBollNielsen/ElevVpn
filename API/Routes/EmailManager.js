const { json } = require("express");
const express = require("express");
const mailer = require("nodemailer");
const smtp = require("nodemailer-smtp-transport");
const router = express.Router();


const transporter = mailer.createTransport(smtp({
  host: 'localhost',
  port: 587,
  tls: {rejectUnauthorized: false}
}));

let mailOptions = {
  from: "vpn", // sender address
  to: "andr687w@zbc.dk", // list of receivers
  subject: "subject", // Subject line
  text: "test", // plain text body
  html: "", // html body
};

router.post("/SendMail", async (req, res) => {
  try {
    res.sendStatus(200);

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        return console.log(error);
      } else {
        console.log("Message sent: " + info.response);
      }
      done();
    });
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

module.exports = router;
