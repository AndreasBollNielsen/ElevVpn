const { json } = require("express");
const express = require("express");
const mailer = require("nodemailer");
const smtp = require("nodemailer-smtp-transport");
const router = express.Router();
const config = require('../Config.json');
const db = require('../DB/RadiusDB');



const transporter = mailer.createTransport(smtp({
  host: 'Smtp.efif.dk',
  port: 587,
 auth: {
  user: config.user,
  pass: config.pass
 },
 tls: {
  rejectUnauthorized: false
}
}));

let mailOptions = {
  from: "Noreply-zbc-elev-vpn", // sender address
  to: "", // list of receivers
  subject: "VPN adgang", // Subject line
  text: "det her er en test for at se om email systemet virker", // plain text body
  html: "", // html body
};

router.post("/SendMail", async (req, res) => {
  
 

console.log("login: ", config);

  let data = req.body
  console.log(data.email);
  if(data == null)
  {
    return;
  }
  mailOptions.to = data.email;
  try {
    
    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        return console.log(error);
      } else {
        console.log("Message sent: " + info.response);
        res.status(200).send({ status: 'OK'});
      }
      
    });
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});


router.get('/GetRadius', async (req, res, next) => {
  try {

      let results = await db.GetFromRadius();
      console.log(results);
      res.json(results);

  } catch (error) {
      console.log(error);
      res.sendStatus(500);
  }
});



module.exports = router;
