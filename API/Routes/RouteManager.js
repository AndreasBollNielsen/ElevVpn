const { json } = require('express');
const express = require('express');
const router = express.Router();
const db = require('../DB/DBManager');
const radius = require('../DB/RadiusDB');
const query = require('querystring');
const security = require('../Auth/SecurityManager');

router.get('/test', async (req, res, next) => {

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


router.get('/testElev', async (req, res, next) => {

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


router.get('/Getusers', async (req, res, next) => {
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


router.post('/AddUsers', async (req, res) => {


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

router.post('/UpdateSticky', async (req, res) => {

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

router.delete('/RemoveUser', async (req, res) => {

   // console.log("reached endpoint delete");
    try {
        const data = req.body;
        console.log(req.body);
        let splittedData = data.email.split('@');
        let username = splittedData[0];

        // console.log("user name: ", username);
        let userToBeRemoved = await radius.GetFromRadius(username);

        console.log("deleting from radius: ", userToBeRemoved.length);
        if (userToBeRemoved.length > 0) {

            let radiusResult = await radius.RemoveUser(username);
            console.log("radius deleted: ", radiusResult);
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

router.get('/admin/', async (req, res) => {

    const data = req.query;
    //  console.log("body: ", data.userName);
    //  console.log("body: ", data.passWord);
    try {


        let results = await db.checkAdminLogin(data.userName, data.passWord);
        console.log(results);
        const hashedPassword = results[0].passWord;
        const validation = await security.passwordCompare(data.passWord, hashedPassword)
        console.log("hashed password: ", validation);

        if (validation) {
            res.json(results);
            console.log("true: ", results.length);
            res.status(200, results);
        }
        else {
            results = [];
            console.log("false: ", results.length);
            res.json(results);
            res.status(500, results);
        }



    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
});

router.patch('/admin/update', async (req, res) => {

    const data = req.body;
    console.log("update password: " + `username: ${data.userName} password: ${data.passWord}`);

    try {

        const hashedPassword = await security.Encrypt(data.passWord);
        let results = await db.UpdateAdminLogin(data.userName, hashedPassword);
        if (results.affectedRows > 0) {
            res.status(200).send({ "success": "password opdateret" });
        }
        else {
            res.status(500).send("ups, brugeren forkert bruger");
        }


    } catch (error) {
        console.log(error);
        res.sendStatus(500).send("hovsa forbindelsen røg");
    }
});

module.exports = router;