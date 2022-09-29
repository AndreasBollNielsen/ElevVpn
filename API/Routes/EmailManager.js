const { json } = require("express");
const express = require("express");
const mailer = require("nodemailer");
const smtp = require("nodemailer-smtp-transport");
const router = express.Router();
const config = require('../Config.json');
const db = require('../DB/DBManager');
const radius = require('../DB/RadiusDB');
const security = require('../Auth/SecurityManager');




const transporter = mailer.createTransport(smtp({
  host: config.KpDesign.host,
  port: config.KpDesign.port,
  auth: {
    user: config.KpDesign.user,
    pass: config.KpDesign.pass
  },
  tls: {
    rejectUnauthorized: false
  }
}));

let mailOptions = {
  from: "andreas@kpdesign.dk", // sender address
  to: "", // list of receivers
  subject: "VPN adgang", // Subject line
  html: "", // html body
};

router.post("/SendMail", async (req, res) => {

  let data = req.body
  const userData = SplitMail(req.body.email);
 

  //1 check if email exists in whitelist & update vpn status
  const dbResult = await db.UpdateVPN(userData.email);
  console.log("checking excisting users: ", dbResult);
  if (dbResult.affectedRows > 0) {

    //2 generate secure password
    const passwords = await security.GeneratePassword();
    console.log("password: ", passwords.hashed);

    
    //3 add new user to radius with secure password
    //replaces old user if one exists
    try {
      const Radiususer = await radius.GetFromRadius(userData.userName);
     
      if (Radiususer.length > 0) {
        await radius.RemoveUser(userData.userName);
      }
      const radiusResult = await radius.AddUser(userData.userName, passwords.hashed);
      console.log("radius feedback: ", radiusResult);
      
    } catch (error) {
      console.log("radius error: ", error);
      res.status(500).send('Servicen er ikke tilgængelig...');
      return;
    }
    
    

    //4 get email info from db
    const infoResult = await db.GetInfo();
    const mailInfo = infoResult[0].info;
    //const link = infoResult[0].link;
    console.log("mail info: ", mailInfo);

    //5 generate email body
    const body = `Hej ${userData.userName} <br>  <br>
    
    ${mailInfo} <br> <br>
    
    log på med ${userData.userName} initialer og følgende kode:   ${passwords.password}`;

    //6 send email
    mailOptions.to = data.email;
    mailOptions.html = body;
    try {

      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          res.status(500).send('bruger godkendt, fejl på mail');
          return console.log(error);
        } else {
          //console.log("Message sent: " + info.response);
          res.status(200).json({ "info": "Bruger godkendt, du modtager om få minutter en mail med login" });
        }

      });
    }
    catch (error) {
      console.log(error);
      res.status(500).send('bruger godkendt, fejl på mail');
      //res.sendStatus(500);
    }

  }
  else {
    res.status(500).send('Brugeren ikke godkendt, kontakt din underviser');
  }
});

//creates an json object with seperated username and email
SplitMail = (email) => {


  let temp = email.split('@');
  const data = { "userName": temp[0], "email": email };
  return data;
}


module.exports = router;
