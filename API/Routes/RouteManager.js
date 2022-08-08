const { json } = require('express');
const express = require('express');
const router = express.Router();
const db = require('../DB/DBManager');
const query = require('querystring');

router.get('/Getusers', async (req, res, next) => {
    try {

        let results = await db.getUsers();
        console.log( results);
        res.json(results);

    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
});


router.post('/AddUsers', async (req, res) => {


    try {
        const data = req.body[0];
        console.log(data);

        Object.keys(data).forEach(x =>{
           // console.log('Key : ' + x + ', Value : ' + data[x]);
           let element = data[x];
           console.log(element);
            let result =  db.AddUserEmail(data[x]);
            res.json(result);
        })

        // for (let index = 0; index < data.length; index++) {
        //     const el = data[index];
        //     console.log("element: ",el);
        //     let result = await db.AddUserEmail(el);
        //    // res.json(result);

        // }


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
        
       
        let result = await db.UpdateSticky(data.id,data.sticky);
        res.json(result);
        res.status(200);

    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
});

router.get('/admin/:data', async (req, res) => {

   const data = req.query;
    console.log("body: ",data.userName);
    console.log("body: ",data.password);
    try {

        let results = await db.checkAdminLogin(data.userName, data.passWord);

        res.json(results);
        res.status(200,results);

    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
});

module.exports = router;