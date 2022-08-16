const { json } = require('express');
const express = require('express');
const router = express.Router();
const db = require('../DB/DBManager');
const query = require('querystring');


router.get('/test',(req,res) =>{
    // console.log(res);
 // let result =  db.testcon();
 // console.log(result);
 res.json(result);
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


        let result = await db.DeleteUser(data.id);
        
        if (result.affectedRows > 0) {
            res.status(200).send({ status: 'OK' });
        }
        res.status(200);

    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
});

router.get('/admin/:data', async (req, res) => {

    const data = req.query;
    console.log("body: ", data.userName);
    console.log("body: ", data.password);
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