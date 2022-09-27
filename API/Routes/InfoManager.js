const { json } = require('express');
const express = require('express');
const router = express.Router();
const db = require('../DB/DBManager');
const security = require("../Auth/SecurityManager");

// get info text for email
router.get('/GetInfo',security.VerifyToken, async (req, res, next) => {
    try {

        let results = await db.GetInfo();
        console.log(results);
        res.json(results[0]);

    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
});

// update info text
router.post('/UpdateInfo',security.VerifyToken, async (req, res) => {


    try {
        const data = req.body;
       // console.log(data);
        if(data.textInfo == '')
        {
            res.sendStatus(500);
            return;
        }
        const result = await db.UpdateInfo(data.textInfo);
        
        res.json(result);
        res.status(200);

    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
});

module.exports = router;