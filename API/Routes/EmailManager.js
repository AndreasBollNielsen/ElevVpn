const { json } = require("express");
const express = require("express");
const mailer = require("nodemailer");
const smtp = require("nodemailer-smtp-transport");
const router = express.Router();
const config = require('../Config.json');
const db = require('../DB/DBManager');
const radius = require('../DB/RadiusDB');
const security = require('../Crypto/SecurityManager');




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
  html: "", // html body
};

router.post("/SendMail", async (req, res) => {

  let data = req.body
  const userData = SplitMail(req.body.email);
  console.log(userData);

  //1 check if email exists in whitelist & update vpn status
  const dbResult = await db.UpdateVPN(data.email);
  if (dbResult.affectedRows > 0) {

    //2 generate secure password
    const passwords = await security.GeneratePassword();
    console.log("password: ", passwords.hashed);

    //3 add new user to radius with secure password
    console.log("username: ", userData.userName);
    // const radiusResult = radius.AddUser(data.userName, passwords.hashed);
    // console.log("radius feedback: ", radiusResult);

    //4 get email info from db
    const infoResult = await db.GetInfo();
    const mailInfo = infoResult[0].info;
    console.log("mail info: ", mailInfo);

    //5 generate email body
    const body = `Hej ${userData.userName} <br>  <br>
    
    ${mailInfo} <p>klik <a href="https://heynode.com/blog/2020-04/salt-and-hash-passwords-bcrypt/">her</a> for at downloade</p>
    
    log på med ${userData.userName} initialer og følgende kode: ${passwords.password}`;
    
    //6 send email
    mailOptions.to = data.email;
    mailOptions.html = body;
    try {

      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          return console.log(error);
        } else {
          console.log("Message sent: " + info.response);
          res.status(200).send({ status: 'OK' });
        }

      });
    }
    catch (error) {
      console.log(error);
      res.sendStatus(500);
    }

  }
});

//creates an json object with seperated username and email
SplitMail = (email) => {


  let temp = email.split('@');
  const data = { "userName": temp[0], "email": email };
  return data;
}


router.get('/testemail', async (req, res, next) => {

  try {
    const data = req.body;
    let results = await db.getUsers();


    console.log("logData: ", results);
    res.json(results);

  } catch (error) {
    console.log("error kent den store: ", error);
    res.sendStatus(500);
  }
});



module.exports = router;
