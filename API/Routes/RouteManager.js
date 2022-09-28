const { json } = require('express');
const express = require('express');
const router = express.Router();
const db = require('../DB/DBManager');
const radius = require('../DB/RadiusDB');
const query = require('querystring');
const security = require('../Auth/SecurityManager');
const corsConfig = require('../Origins_Config.json');


const loginAttempts = [];

router.get('/test', async (req, res) => {

    try {
        const data = req.body;
        console.log(data);
        let results = await radius.GetFromRadius(data.userName);

        console.log(results.length);
        res.json(results);

    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
});

// test login
router.get('/loginTest', async (req, res) => {

    console.log('test');
    let results = await db.getUsers();

    res.cookie("mytest", 'test', { expires: new Date(Date.now() + 160000), secure: true, httpOnly: true, sameSite: 'none' }, path = '/');
    res.json(results);



})

// test get users
router.get('/testElev', async (req, res) => {

    try {

        let results = await db.getUsers();

        console.log("logData: ", results);
        res.json(results);

    } catch (error) {
        console.log("error kent den store: ", error);
        res.sendStatus(500);
    }
});



// get users for whitelist
router.get('/Getusers', security.VerifyToken, async (req, res, next) => {

    // const header = req.headers['authorization'];
    // const token = header.split(' ')[1];
    //   console.log("token: ", token);

    try {

        let results = await db.getUsers();
        //    let results = 'ok';
        // console.log(results);
        res.json(results);

    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
});

// add users to whitelist
router.post('/AddUsers', security.VerifyToken, async (req, res) => {


    try {
        const data = req.body;
        const userValidation = await db.getUsers();
        let validEmails = [];
        let sameEmail;
        let validation = true;




        //add unique emails to valid list
        for (let index = 0; index < data.length; index++) {
            const currentEmail = data[index];
            if (currentEmail == "") {
                console.log("emtpy: ", index);
                return;
            }

            validation = true;
            for (let index = 0; index < userValidation.length; index++) {

                if (userValidation[index].email == currentEmail) {
                    validation = false;
                    sameEmail = userValidation[index].email;

                    //break out of loop
                    index = userValidation.length;
                }


            }

            //if email is unique add it to DB
            if (validation) {
                validEmails.push(currentEmail);
                console.log("unique email: ", currentEmail);
            }
            else {
                console.log("found same", sameEmail);
            }


        }




        // console.log("added user: ",data[x]);
        const result = db.AddUserEmail(validEmails);
        result.then((response) => {
            console.log("unique emails: ", response);
            res.status(200).send({ "success": `${response.length}` + " nye brugere tilføjet" });
        })



    } catch (error) {
        console.log(error);
        res.sendStatus(500).send("ingen forbindelse til databasen");
    }
});

// update user sticky state
router.post('/UpdateSticky', security.VerifyToken, async (req, res) => {

    console.log("reached endpoint");
    try {
        const data = req.body;
        console.log(data);


        let result = await db.UpdateSticky(data.id, data.sticky);
        res.json(result);
        res.status(200);

    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
});

// remove user from whitelist
router.delete('/RemoveUser', security.VerifyToken, async (req, res) => {

    // console.log("reached endpoint delete");
    try {
        const data = req.body;
        console.log(req.body);
        let splittedData = data.email.split('@');
        let username = splittedData[0];


        try {

            let userToBeRemoved = await radius.GetFromRadius(username);

            console.log("deleting from radius: ", userToBeRemoved.length);
            if (userToBeRemoved.length > 0) {

                let radiusResult = await radius.RemoveUser(username);
                console.log("radius deleted: ", radiusResult);
            }

        } catch (error) {

           // res.sendStatus(500).send(error);
        }


        let result = await db.DeleteUser(data.id);
        console.log("deleting user: ", result);
        if (result.affectedRows > 0) {
            res.status(200).send({ status: 'OK' });
        };

        res.status(200);

    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
});

// verify token expiration date
router.get('/admin/VerifyExpiration', security.VerifyToken, (req, res) => {

    res.set('Access-Control-Allow-Origin', corsConfig.allowedOrigin);
    const token = req.signedCookies['token'];
    const result = security.VerifyExpiration(token);

    res.json({ "verified": result });


})

// check user login
router.get('/admin/', async (req, res) => {

    // cors allowed ip address
    res.set('Access-Control-Allow-Origin', corsConfig.allowedOrigin);

    const data = req.query;
    console.log("login attempts: ", loginAttempts);
    let loginResult = [];

    //check if user has attempted too many times
    const userAttempts = loginAttempts.filter(x => new Date(x.Time).getTime() + (1000 * 60 * 5) > new Date().getTime()).filter(x => x.Username == data.userName);

    // The same username tried to login more than 3 times within a timespan of 5 minutes
    if (userAttempts.length >= 3) {
        userAttempts.forEach(el => {
            loginAttempts[loginAttempts.findIndex(x => x == el)].Time = new Date();
        });

        loginResult = [];
        res.json(loginResult);
        res.status(403);
        return;
    }

    // Authorize
    if (checkresult = await CheckLogin(data.userName, data.passWord)) {


        const token = security.GenerateToken(data.userName);
        res.cookie('token',
            token,
            {
                expires: new Date(Date.now() + (process.env.EXPIRE_TIME * 1000)),
                secure: true,
                httpOnly: true,
                sameSite: 'none',
                signed:true
            });

        res.status(200).send({ "token": token });

    }
    else {

        // Add to failed login attempts array
        console.log("wrong user");
        loginAttempts.push({
            "Username": data.userName,
            "Time": new Date()
        });

        // Remove old elements (if any)
        let newArray = loginAttempts.filter(x => new Date(x.Time).getTime() + (1000 * 60 * 5) < new Date().getTime());

        if (newArray.length >= 1) {
            newArray.forEach(el => {
                loginAttempts.splice(loginAttempts.findIndex(x => x == el), 1);
            });
        }


        res.json({});
        res.status(403);
        return;
    }



    async function CheckLogin(username, password) {


        let validation;
        let results;
        try {


            results = await db.checkAdminLogin(username, password);
            if (results.length > 0) {
                const hashedPassword = results[0].passWord;
                validation = await security.passwordCompare(data.passWord, hashedPassword);

            }
            else {
                return false;
            }

            //console.log("hashed password: ", validation);

        } catch (error) {
            console.log("catch error: ", error);
            res.sendStatus(500);
            return false;

        }


        if (validation) {
            loginResult = results;
            //  res.json(results);
            console.log("true: ", loginResult.length);
            //res.status(200, results);
            return true;
        }
        else {
            results = [];
            loginResult = results;
            console.log("false: ", results.length);
            // res.json(results);
            //res.status(500, results);
            return false;
        }







    }

});

// update admin password
router.patch('/admin/update', security.VerifyToken, async (req, res) => {

    const data = req.body;
    console.log("update password: " + `username: ${data.userName} password: ${data.passWord}`);

    try {

        const hashedPassword = await security.Encrypt(data.passWord);
        let results = await db.UpdateAdminLogin(data.userName, hashedPassword);
        if (results.affectedRows > 0) {
            res.status(200).send({ "success": "password opdateret" });
        }
        else {
            res.status(500).send("ups, forkert bruger");
        }


    } catch (error) {
        console.log(error);
        res.sendStatus(500).send("hovsa forbindelsen røg");
    }
});

// admin log out
router.post('/admin/LogOut', security.VerifyToken, (req, res) => {

    const token = req.cookies || '';
    console.log("clearing token: ", token);
    res.clearCookie('token',{path: '/'});
    res.end();
})

module.exports = router;