const bcrypt = require('bcrypt');
const generator = require('generate-password');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

//create json object that holds all the methods

//get access to environment variables
dotenv.config();

encryption = {};
const salt = 10;

const key = require('crypto').randomBytes(64).toString('hex');


// process.env.TOKEN_PRIVATE_KEY = key;


encryption.Encrypt = async (password) => {

    return new Promise((resolve, error) => {

        bcrypt.hash(password, salt, (err, hash) => {
            console.log("hashed and salted password: ", hash);
            return resolve(hash);
        })

    });


}


encryption.GeneratePassword = async () => {


    let password = generator.generate({
        length: 10,
        numbers: true,
        symbols: true,
        lowercase: true,
        uppercase: true
    });

    let hashedPassword = await encryption.Encrypt(password);
    let passwords = { "password": password, "hashed": hashedPassword };

    return passwords;

}

encryption.passwordCompare = (password, hashedPassword) => {

    // console.log("password compare: " + `password plain: ${password} hashed password: ${hashedPassword}`);
    return new Promise((resolve, error) => {

        bcrypt.compare(password, hashedPassword, (err, hash) => {
            console.log("checked hashresult: ", hash);
            return resolve(hash);
        })

    });
}

encryption.GenerateToken = (userName) => {

    const sessionId = Math.floor(Math.random() * 100);

    const payload = { "username": userName, "sessionId": sessionId };
    console.log("payload: ", payload);
    let signOptions = {
        algorithm: "HS512",
        expiresIn: `${process.env.EXPIRE_TIME}s`
    };
    // const token = jwt.sign(userName, process.env.TOKEN_PRIVATE_KEY, { algorithm: "RS512" }, { expiresIn: expiration});
    const token = jwt.sign(payload, process.env.TOKEN_PRIVATE_KEY, signOptions);
    return token;
}

encryption.VerifyToken = (req, res, next) => {

    const token = req.cookies.token || '';
   // console.log("req: ", token);
  //  const header = req.headers['authorization'];
  //  const token = header.split(' ')[1];
    //  console.log("token: ", token);




    try {

        jwt.verify(token, process.env.TOKEN_PRIVATE_KEY);
        console.log("user verified!");
        next();
    } catch (error) {

        if (error instanceof jwt.TokenExpiredError) {
            console.log(error);
            return status(401);
        }
        else if (error instanceof jwt.JsonWebTokenError) {
            return res.status(401).send('bruger ikke autoriseret');
        }


        return res.status(400).send('bad request');
    }

}

encryption.VerifyExpiration = (token) => {
   // const token = header.split(' ')[1];

    //check expire status
    var decodedToken = jwt.decode(token, { complete: true });
    //  console.log("header: ", decodedToken.header);
    //console.log("payload: ", decodedToken.payload);
    const expire = decodedToken.payload.exp;
    const now = (Date.now() / 1000);
    console.log(`expire: ${expire} now: ${now}`);
    if (expire < now) {
        return false;
    }
    return true;
}

module.exports = encryption;
//  module.exports = expiration;