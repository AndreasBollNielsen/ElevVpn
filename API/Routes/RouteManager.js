const { json } = require('express');
const express = require('express');
const router = express.Router();
const db = require('../DB/DBManager');
const radius = require('../DB/RadiusDB');
const query = require('querystring');


router.get('/test', async (req, res, next) => {

    try {
        const data = req.body;
        console.log(data);
        let results = await radius.GetFromRadius(data.userName);

        console.log(results);
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
        console.log(results);
        res.json(results);

    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
});


router.post('/AddUsers', async (req, res) => {


    try {
        const data = req.body;
        console.log(data);
        var results = [];
        Object.keys(data).forEach(async x => {

            const result = await db.AddUserEmail(data[x]);
            results.push(result);
            console.log(results[results.length - 1]);
        })



        res.json(results);
        res.status(200);

    } catch (error) {
        console.log(error);
        res.sendStatus(500);
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

    console.log("reached endpoint delete");
    try {
        const data = req.body;
        console.log(req.body);
        let splittedData = data.email.split('@');
        let username = splittedData[0];
        console.log("user name: ", username);
        let userToBeRemoved = await radius.GetFromRadius(username);
        console.log(userToBeRemoved[0].length);
        if (userToBeRemoved[0].length > 0) {
            let radiusResult = await radius.RemoveUser(username);
            console.log(radiusResult);
        }
       
        let result = await db.DeleteUser(data.id);
        console.log(result);
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
    console.log("body: ", data.userName);
    console.log("body: ", data.passWord);
    try {


        let results = await db.checkAdminLogin(data.userName, data.passWord);

        res.json(results);
        res.status(200, results);

    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
});

module.exports = router;